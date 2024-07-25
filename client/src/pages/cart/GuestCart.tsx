// Import necessary hooks and utilities
import { useApi } from '@/shared/hooks/useApi.hook';
import { useEffect, useRef, useState } from 'react';
import useLocalStorage from '@/shared/hooks/useLocalStorage.hook';
// Import components and types
import { ProductDisplayInCart } from './ProductDisplayInCart';
import { Product } from '@/shared/types';
// Import hook for navigation
import { useNavigate } from 'react-router';

// Define the type for the component's props
type UserCartProps = {
    onTotalPriceUpdate: (totalPrice: number) => void;
    onClearCart: () => void;
    clearTrigger: boolean;
    onCheckout: () => void;
    checkoutTrigger: boolean;
};

// Define the GuestCart component
export default function GuestCart({
    onTotalPriceUpdate,
    onClearCart,
    clearTrigger,
    onCheckout,
    checkoutTrigger,
}: UserCartProps) {
    // Hook to interact with the API
    const api = useApi();
    // Ref to track if the component is mounted
    const isMounted = useRef<boolean>(false);
    // State to manage cart items using local storage
    const [cart, setCart] = useLocalStorage<{ product_ids: Array<string>; quantities: Array<number> }>('cart', {
        product_ids: [],
        quantities: [],
    });
    // State to store product details
    const [productDetails, setProductDetails] = useState<Product[]>([]);
    // Loading, error, and empty states
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    // Hook for navigation
    const navigate = useNavigate();

    // Effect to fetch cart data
    useEffect(() => {
        const fetchData = async () => {
            isMounted.current = true;
            setIsLoading(true);
            setIsError(false);
            // Validate cart state before fetching data
            if (cart.product_ids.length) {
                const isValidQuantities =
                    cart.quantities.length === cart.product_ids.length &&
                    cart.quantities.every((q) => typeof q === 'number');

                if (!isValidQuantities) {
                    console.error(
                        'Invalid cart state: Quantities and Product IDs mismatch or Quantities not all numbers'
                    );
                    setIsError(true);
                    setIsLoading(false);
                    setCart({ product_ids: [], quantities: [] });
                    return;
                }
                try {
                    // Fetch product details from API
                    const response = await api.cartApi.getGuestCart({ product_ids: cart.product_ids });
                    if ('products' in response) {
                        setProductDetails(response.products);
                        setIsEmpty(response.products.length === 0);
                    } else {
                        setIsError(true);
                    }
                } catch (error) {
                    console.error('Fetching error:', error);
                    setIsError(true);
                }
            } else {
                setIsEmpty(true);
            }
            setIsLoading(false);
        };

        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [api.cartApi, cart.product_ids]);

    // Calculate total price of items in the cart
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        productDetails.forEach((product, index) => {
            totalPrice += product.price * cart.quantities[index];
        });
        return totalPrice;
    };

    // Update total price whenever product details or quantities change
    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        onTotalPriceUpdate(totalPrice);
    }, [productDetails, cart.quantities]);

    // Remove a product from the cart
    const removeProductFromCart = (productId: string) => {
        const productIndex = cart.product_ids.findIndex((id) => id === productId);
        if (productIndex > -1) {
            const newProductIds = [...cart.product_ids];
            const newQuantities = [...cart.quantities];
            newProductIds.splice(productIndex, 1);
            newQuantities.splice(productIndex, 1);
            setCart({ product_ids: newProductIds, quantities: newQuantities });

            setProductDetails((prevDetails) => prevDetails.filter((product) => product.product_id !== productId));
        }
    };

    // Clear the cart
    const handleClearCart = () => {
        setCart({ product_ids: [], quantities: [] });
        setProductDetails([]);
        onTotalPriceUpdate(0);
        onClearCart();
    };

    // Clear cart when clearTrigger changes
    useEffect(() => {
        if (clearTrigger) {
            handleClearCart();
        }
    }, [clearTrigger]);

    // Handle checkout process
    const handleCheckout = () => {
        const itemsInCart = productDetails.map((product, index) => ({
            product_id: product.product_id,
            thumbnail: product.thumbnail,
            title: product.title,
            price: product.price,
            stock: product.stock,
            quantity: cart.quantities[index],
        }));
        if (itemsInCart.length > 0) {
            navigate('/checkout', { state: { itemsInCart: itemsInCart } });
            onCheckout();
        }
    };

    // Navigate to checkout when checkoutTrigger changes
    useEffect(() => {
        if (checkoutTrigger) {
            handleCheckout();
        }
    }, [checkoutTrigger]);

    // Render the component
    return (
        <div>
            {isLoading ? (
                <p className="m-5">Loading...</p>
            ) : isError ? (
                <p className="m-5">Error loading cart. Please try again later.</p>
            ) : isEmpty ? (
                <p className="m-5">Your cart is empty.</p>
            ) : (
                productDetails.map((product, index) => (
                    <ProductDisplayInCart
                        key={product.product_id}
                        thumbnail={product.thumbnail}
                        title={product.title}
                        price={product.price}
                        quantity={cart.quantities[index]}
                        onRemoveProduct={() => removeProductFromCart(product.product_id)}
                    />
                ))
            )}
        </div>
    );
}
