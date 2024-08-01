import React, { useEffect, useRef, useCallback } from 'react';
import { ProductDetails } from '../types/ProductDetails';

type CartTableProps = {
    itemsInCart: ProductDetails[];
    totalQuantity: number;
    totalPrice: string;
}

const CartTable: React.FC<CartTableProps> = ({ itemsInCart, totalQuantity, totalPrice }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle scroll event to load more items when reaching the bottom
    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                // Placeholder for loading more items logic
            }
        }
    }, []);

    // Attach and detach the scroll event listener
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <div ref={containerRef} className="overflow-y-auto flex tablet-md:max-h-[27rem] overflow-x-hidden -mr-7">
            <table className="ml-3 w-full">
                <tbody>
                    {itemsInCart.map((item, index) => (
                        <tr key={index} className="border-b border-accent-300">
                            <td className="h-20 w-20">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="h-20 w-20 object-cover"
                                />
                            </td>
                            <td className="pc-sm:w-40 pc-sm:text-sm">
                                {item.title} <br /> Qty:{item.quantity}
                            </td>
                            <td className="pl-10">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr className="sticky bottom-0 bg-accent-100">
                        <td className="px-4 font-bold">Total:</td>
                        <td> {totalQuantity} items</td>
                        <td className="pl-10">${totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CartTable;