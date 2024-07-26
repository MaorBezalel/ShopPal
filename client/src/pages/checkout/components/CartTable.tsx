import React from 'react';
import { ProductDetails } from '../types/ProductDetails';

type CartTableProps = {
    itemsInCart: ProductDetails[];
    totalQuantity: number;
    totalPrice: string;
}

const CartTable: React.FC<CartTableProps> = ({ itemsInCart, totalQuantity, totalPrice }) => {
    return (
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
                <tr>
                    <td className="px-4 font-bold">Total:</td>
                    <td className="pl-4"> {totalQuantity} items</td>
                    <td className="pl-10">${totalPrice}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default CartTable;