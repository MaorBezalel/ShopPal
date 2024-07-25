import GuestCart from './GuestCart';
import UserCart from './UserCart';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useState } from 'react';

// CartPage component to display either UserCart or GuestCart based on authentication status
export const CartPage = () => {
    const { auth } = useAuth(); // Use the custom hook to access authentication status
    const [totalPrice, setTotalPrice] = useState(0); // State to keep track of the total price of items in the cart
    const [checkoutTrigger, setCheckoutTrigger] = useState(false); // State to manage checkout process trigger
    const [clearTrigger, setClearTrigger] = useState(false); // State to manage cart clearing trigger

    // Function to update the total price of items in the cart
    const handleTotalPriceUpdate = (price: number) => {
        setTotalPrice(price);
    };

    // Function to toggle the clear cart trigger
    const handleClearCart = () => {
        setClearTrigger((prev) => !prev);
    };

    // Function to toggle the checkout trigger
    const handleCheckout = () => {
        setCheckoutTrigger((prev) => !prev);
    };

    return (
        <main
            className="container-highlight container flex flex-1 justify-center
            tablet-md:flex-col"
        >
            <div className="mx-5 w-1/2 tablet-md:w-full tablet-sm:w-full mobile-lg:w-full mobile-md:w-full">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 mobile-md:grid-cols-[2fr_1fr]  mobile-sm:hidden">
                    <h2 className="ml-5">Product</h2>
                    <h2 className="ml-5">Price</h2>
                    <h2 className="mobile-md:hidden">Quantity</h2>
                    <h2 className="mx-5 mobile-md:hidden">Total</h2>
                </div>
                <div className="w-full">
                    {auth?.user ? (
                        <UserCart
                            onTotalPriceUpdate={handleTotalPriceUpdate}
                            onClearCart={handleClearCart}
                            clearTrigger={clearTrigger}
                            onCheckout={handleCheckout}
                            checkoutTrigger={checkoutTrigger}
                        />
                    ) : (
                        <GuestCart
                            onTotalPriceUpdate={handleTotalPriceUpdate}
                            onClearCart={handleClearCart}
                            clearTrigger={clearTrigger}
                            onCheckout={handleCheckout}
                            checkoutTrigger={checkoutTrigger}
                        />
                    )}
                </div>
            </div>
            <div className="my-6 flex-none">
                <h1 className="text-lg font-bold">Order summary</h1>
                <div
                    className="flex items-center justify-between 
        tablet-md:justify-start
        tablet-sm:justify-start
        mobile-lg:justify-start
        mobile-md:justify-start
        mobile-sm:justify-start"
                >
                    <h2 className="tablet-md:pr-5 tablet-sm:pr-5 mobile-lg:pr-5 mobile-md:pr-5 mobile-sm:pr-5">
                        Total
                    </h2>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="my-2 rounded-md bg-secondary-300 px-4 py-1 text-white hover:bg-primary-500"
                >
                    CHECKOUT
                </button>
                <br />
                <button
                    onClick={handleClearCart}
                    className="my-2 rounded-md bg-accent-400 px-4 py-1 text-white hover:bg-accent-600"
                >
                    Clear cart
                </button>
            </div>
        </main>
    );
};

//CartPage;
