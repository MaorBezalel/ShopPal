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
            className="container flex w-full flex-1 justify-center
            gap-14 pc-sm:gap-0 tablet-lg:flex-col
            tablet-lg:justify-start"
        >
            {/* Products */}
            <div className="tablet-md:w-full tablet-sm:w-full mobile-lg:w-full mobile-md:w-full">
                <div
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 tablet-lg:grid-cols-[3fr_1fr_1fr_1fr]  tablet-sm:hidden
                    tablet-sm:grid-cols-[2fr_1fr]"
                >
                    <h2 className="ml-5">Product</h2>
                    <h2 className="ml-5">Price</h2>
                    <h2 className="tablet-sm:hidden">Quantity</h2>
                    <h2 className="mx-5 tablet-sm:hidden">Total</h2>
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

            {/* Order summary */}
            <section
                className="my-6 flex w-60 flex-col gap-2
                tablet-lg:w-80 tablet-lg:gap-4 tablet-lg:pl-5"
            >
                <h1 className="text-lg font-bold tablet-lg:text-[2rem]">Order summary</h1>
                {/* total price */}
                <section
                    className="flex items-center justify-between 
                    tablet-lg:gap-5 tablet-lg:pr-6"
                >
                    <h2
                        className="tablet-lg:text-2xl
                        tablet-md:pr-5 tablet-sm:pr-5 mobile-lg:pr-5 mobile-md:pr-5 mobile-sm:pr-5"
                    >
                        Total:
                    </h2>
                    <span className="tablet-lg:text-2xl">${totalPrice.toFixed(2)}</span>
                </section>
                <menu
                    className="flex flex-row items-center gap-2
                pc-md:flex-col
                tablet-lg:flex-row"
                >
                    <li>
                        <button
                            onClick={handleCheckout}
                            className="rounded-md bg-secondary-300 px-4 py-1 text-white hover:bg-primary-500
                            tablet-lg:px-6 tablet-lg:py-2 tablet-lg:text-lg"
                        >
                            CHECKOUT
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleClearCart}
                            className="rounded-md bg-accent-400 px-4 py-1 text-white hover:bg-accent-600
                            tablet-lg:px-6 tablet-lg:py-2 tablet-lg:text-lg"
                        >
                            Clear cart
                        </button>
                    </li>
                </menu>
            </section>
        </main>
    );
};

//CartPage;
