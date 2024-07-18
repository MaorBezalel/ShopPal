import GuestCart from "./GuestCart";
import UserCart from "./UserCart";
import { useAuth } from "@/shared/hooks/useAuth.hook";
import { useState } from "react";



export const CartPage = () => {
    const { auth } = useAuth();
    const [totalPrice, setTotalPrice] = useState(0);
    const [clearTrigger, setClearTrigger] = useState(false); // Add a state to trigger cart clearing



    const handleTotalPriceUpdate = (price: number) => {
        setTotalPrice(price);
    };

    const handleClearCart = () => {
        setClearTrigger(prev => !prev); // Toggle the trigger to clear the cart

    };

    
    return (
        <div className="flex justify-center"> {/* Add justify-center to center the children */}
            <div className="flex-1" style={{ maxWidth: '75%' }}> {/* Limit maxWidth to prevent taking extra space */}
                <h1>Shopping cart</h1>
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
                    <h2 className="ml-40">Product</h2>
                    <h2 className="ml-10">Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                </div>
                <div style={{ maxWidth: '100%', margin: '0 auto' }}> {/* Adjust maxWidth to 100% of the parent */}
                    {auth ? 
                    <UserCart onTotalPriceUpdate={handleTotalPriceUpdate} 
                    onClearCart={handleClearCart}
                    clearTrigger={clearTrigger}/> : 
                    <GuestCart onTotalPriceUpdate={handleTotalPriceUpdate} 
                    onClearCart={handleClearCart}
                    clearTrigger={clearTrigger}/>}
                </div>
            </div>
            <div className="flex-none">
                <h1>Order summary</h1>
                <div className="flex justify-between items-center">
                    <h2>Total</h2>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button>CHECKOUT</button>
                <br />
                <button onClick={handleClearCart}>Clear cart</button>
            </div>
        </div>
    );
}

CartPage;