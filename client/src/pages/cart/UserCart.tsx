import { useApi } from '@/shared/hooks/useApi.hook';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { Cart } from '@/shared/types/entities.types';
import { ProductDisplayInCart } from './ProductDisplayInCart';
import { useNavigate } from 'react-router';

// Define the props for UserCart component
type UserCartProps = {
    onTotalPriceUpdate: (totalPrice: number) => void;
    onClearCart: () => void;
    clearTrigger: boolean;
    onCheckout: () => void;
    checkoutTrigger: boolean;
};

// UserCart component definition
export default function UserCart({
    onTotalPriceUpdate,
    onClearCart,
    clearTrigger,
    onCheckout,
    checkoutTrigger,
}: UserCartProps) {
    // Hooks for API access and user authentication
    const api = useApi();
    const isMounted = useRef<boolean>(false);
    const userId = useAuth().auth?.user.user_id;

    // State management for cart items, loading, error, and empty states
    const [cartItems, setCartItems] = useState<Cart>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const navigate = useNavigate();

    // Fetch user cart data on component mount
    useEffect(() => {
        isMounted.current = true;
        const fetchData = async () => {
            setIsLoading(true);
            if (userId) {
                try {
                    const response = await api.cartApi.getUserCart(userId);
                    if ('userCart' in response) {
                        setCartItems(response.userCart);
                        setIsEmpty(response.userCart.length === 0);
                    } else {
                        setIsError(true);
                    }
                } catch (error) {
                    console.error('Fetching error:', error);
                    setIsError(true);
                }
            }
            setIsLoading(false);
        };

        fetchData();
        return () => {
            isMounted.current = false; // Cleanup function to set isMounted to false when component unmounts
        };
    }, [api.cartApi, userId]);

    // Calculate total price of items in the cart
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems?.forEach((item) => {
            totalPrice += item.__product__.price * item.quantity;
        });
        return totalPrice;
    };

    // Update total price in parent component whenever cartItems changes
    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        onTotalPriceUpdate(totalPrice);
    }, [cartItems]);

    // Handle removal of a product from the cart
    const handleRemoveProductFromCart = async (productId: string) => {
        if (!userId) return;
        try {
            const response = await api.cartApi.removeProductFromCart(productId, userId);
            if (response.message === 'Product removed from cart successfully') {
                setCartItems((currentItems) =>
                    currentItems?.filter((item) => item.__product__.product_id !== productId)
                );
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    // Handle clearing of the cart
    const handleClearCart = async () => {
        if (!userId) return;
        try {
            const response = await api.cartApi.removeCart(userId);
            if (response.message === 'All products removed from cart successfully') {
                setCartItems([]);
                setIsEmpty(true);
                onClearCart(); // Notify parent component that the cart has been cleared
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    // Effect to clear cart when clearTrigger changes
    useEffect(() => {
        if (clearTrigger) {
            handleClearCart();
        }
    }, [clearTrigger]);

    // Handle checkout process
    const handleCheckout = () => {
        if (!cartItems || cartItems.length === 0) return;
        const itemsInCart = cartItems?.map((item) => ({
            product_id: item.__product__.product_id,
            thumbnail: item.__product__.thumbnail,
            title: item.__product__.title,
            price: item.__product__.price,
            stock: item.__product__.stock,
            quantity: item.quantity,
        }));
        navigate('/checkout', { state: { itemsInCart: itemsInCart } });
        onCheckout(); // Notify parent component that checkout has been initiated
    };

    // Effect to handle checkout when checkoutTrigger changes
    useEffect(() => {
        if (checkoutTrigger) {
            handleCheckout();
        }
    }, [checkoutTrigger]);

    // Render the component UI
    return (
        <div>
            {isLoading ? (
                <p className="m-5">Loading...</p>
            ) : isError ? (
                <p className="m-5">Error loading cart.</p>
            ) : isEmpty ? (
                <p className="m-5">Your cart is empty.</p>
            ) : (
                cartItems?.map((item) => (
                    <ProductDisplayInCart
                        key={item.__product__.product_id}
                        thumbnail={item.__product__.thumbnail}
                        title={item.__product__.title}
                        price={item.__product__.price}
                        quantity={item.quantity}
                        onRemoveProduct={() => handleRemoveProductFromCart(item.__product__.product_id)}
                    />
                ))
            )}
        </div>
    );
}
