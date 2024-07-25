import GuestCart from "./GuestCart";
import UserCart from "./UserCart";
import { useAuth } from "@/shared/hooks/useAuth.hook";
import { useState } from "react";

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
        setClearTrigger(prev => !prev);
    };

    // Function to toggle the checkout trigger
    const handleCheckout = () => {
        setCheckoutTrigger(prev => !prev);
    };

    return (
        <div className="flex justify-center container mx-auto 
tablet-md:flex-col 
tablet-sm:flex-col
mobile-lg:flex-col
mobile-md:flex-col
mobile-sm:flex-col">
            <div className="w-1/2 mx-5 tablet-md:w-full tablet-sm:w-full mobile-lg:w-full mobile-md:w-full">
                <div className="grid gap-4 grid-cols-[2fr_1fr_1fr_1fr] mobile-md:grid-cols-[2fr_1fr]  mobile-sm:hidden">
                    <h2 className="ml-5">Product</h2>
                    <h2 className="ml-5">Price</h2>
                    <h2 className="mobile-md:hidden">Quantity</h2>
                    <h2 className="mx-5 mobile-md:hidden">Total</h2>
                </div>
                <div className="w-full">
                    {auth ?
                        <UserCart onTotalPriceUpdate={handleTotalPriceUpdate}
                            onClearCart={handleClearCart}
                            clearTrigger={clearTrigger}
                            onCheckout={handleCheckout}
                            checkoutTrigger={checkoutTrigger} /> :
                        <GuestCart onTotalPriceUpdate={handleTotalPriceUpdate}
                            onClearCart={handleClearCart}
                            clearTrigger={clearTrigger}
                            onCheckout={handleCheckout}
                            checkoutTrigger={checkoutTrigger} />}
                </div>
            </div>
            <div className="flex-none my-6 tablet-md:mx-auto tablet-sm:mx-auto mobile-lg:mx-auto mobile-md:mx-auto mobile-sm:mx-auto">
                <h1 className="text-lg font-bold">Order summary</h1>
                <div className="flex justify-between items-center 
        tablet-md:justify-start
        tablet-sm:justify-start
        mobile-lg:justify-start
        mobile-md:justify-start
        mobile-sm:justify-start">
                    <h2 className="tablet-md:pr-5 tablet-sm:pr-5 mobile-lg:pr-5 mobile-md:pr-5 mobile-sm:pr-5">Total</h2>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="bg-secondary-300 hover:bg-primary-500 px-4 py-1 rounded-md my-2 text-white">CHECKOUT</button>
                <br />
                <button onClick={handleClearCart} className="bg-accent-400 hover:bg-accent-600 px-4 py-1 rounded-md my-2 text-white">Clear cart</button>
            </div>
        </div>
    );
}

CartPage;