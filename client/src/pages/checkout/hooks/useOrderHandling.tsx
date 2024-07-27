import { useState } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { validateShippingInfo, validatePaymentInfo } from '../validateForm';
import { Address } from '@/shared/types';
import { ProductDetails } from '../types/ProductDetails';

export const useOrderHandlers = (itemsInCart: ProductDetails[], formData: any, setFormErrors: any) => {
    const { auth } = useAuth();
    const api = useApi();
    const [showBillingInfo, setShowBillingInfo] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validatePaymentInfo(formData);
        if (Object.values(errors).some((error) => error !== '')) {
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const productIds = itemsInCart.map((item: ProductDetails) => item.product_id);
        const quantities = itemsInCart.map((item: ProductDetails) => item.quantity);
        const billingInfo = `${formData.cardNumber},${formData.expiryDate},${formData.cvv}`;
        const newStocks = itemsInCart.map((item: ProductDetails) => item.stock - item.quantity);

        const outOfStockItem = itemsInCart.find((item, index) => newStocks[index] < 0);
        if (outOfStockItem) {
            alert(`The item "${outOfStockItem.title}" is out of stock. Please adjust your cart.`);
            setIsLoading(false);
            return;
        }

        const deliveryAddress = {
            country: formData.country,
            city: formData.city,
            street: formData.street,
        };

        let orderDetails = {
            product_ids: productIds as string[],
            quantities: quantities as number[],
            billing_info: billingInfo,
            delivery_address: deliveryAddress as Address,
        };
        let response;

        try {
            if (auth) {
                response = await api.orderApi.addUserOrder(auth.user.user_id, orderDetails);
            } else {
                response = await api.orderApi.addGuestOrder(orderDetails);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while placing the order, please try again later');
        } finally {
            if (response && 'order_id' in response) {
                const updateStocks = { product_ids: productIds, new_stocks: newStocks };
                setOrderSuccess(true);
                setOrderId(response.order_id);
                try {
                    const updateStocksPromise = api.orderApi.updateStocks(updateStocks);
                    const clearCartPromise = auth
                        ? api.cartApi.removeCart(auth.user.user_id)
                        : Promise.resolve(
                            window.localStorage.setItem('cart', JSON.stringify({ product_ids: [], quantities: [] }))
                        );
                    await Promise.all([updateStocksPromise, clearCartPromise]);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const handleContinue = () => {
        const errors = validateShippingInfo(formData);
        if (Object.values(errors).some((error) => error !== '')) {
            setFormErrors(errors);
        } else {
            setShowBillingInfo(true);
        }
    };

    return {
        showBillingInfo,
        orderSuccess,
        orderId,
        isLoading,
        handleOrder,
        handleContinue,
    };
};