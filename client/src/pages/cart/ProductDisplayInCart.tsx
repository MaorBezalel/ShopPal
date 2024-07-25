interface ProductDisplayProps {
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
    onRemoveProduct: () => void;
}

export const ProductDisplayInCart = ({ title, price, quantity, thumbnail, onRemoveProduct }: ProductDisplayProps) => {
    return (
        <div className="flex flex-row">
            <div className="grid w-full grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-t border-gray-200 mobile-md:grid-cols-[2fr_1fr] mobile-sm:grid-cols-[2fr_1fr]">
                {thumbnail && (
                    <div className="w-full ">
                        <div className="flex items-center space-x-4">
                            <img
                                src={thumbnail}
                                alt={title}
                                className="h-24 w-24 object-cover"
                            />
                            <div>
                                <div className="font-bold mobile-lg:text-sm mobile-md:text-sm mobile-sm:text-sm">
                                    {title}
                                </div>
                                <div className="mt-2 hidden mobile-sm:block">
                                    <span>$</span> {price.toFixed(0)}
                                    <br />
                                    <span>Qty:</span> {quantity}
                                </div>
                                <button
                                    onClick={onRemoveProduct}
                                    className="mt-2 text-gray-500 underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="col-span-1 whitespace-nowrap px-6 py-4 text-sm mobile-sm:hidden">
                    ${price.toFixed(2)}
                    <div className="mt-2 hidden mobile-md:block">
                        <span className="font-semibold">Qty:</span> {quantity}
                    </div>
                </div>
                <div className="col-span-1 whitespace-nowrap px-6 py-4 text-sm  mobile-md:hidden mobile-sm:hidden">
                    {quantity}
                </div>
                <div className="col-span-1 whitespace-nowrap px-6 py-4 text-sm  mobile-md:hidden mobile-sm:hidden">
                    ${(price * quantity).toFixed(2)}
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="">
    //         <table className="min-w-full divide-y divide-gray-200">
    //             <tbody className="divide-y divide-gray-200 bg-white">
    //                 <tr className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-t border-gray-200 mobile-md:grid-cols-[2fr_1fr] mobile-sm:grid-cols-[2fr_1fr]">
    //                     {thumbnail && (
    //                         <td className="col-span-1">
    //                             <div className="flex items-center space-x-4">
    //                                 <img
    //                                     src={thumbnail}
    //                                     alt={title}
    //                                     className="h-24 w-24 object-cover"
    //                                 />
    //                                 <div>
    //                                     <div className="font-bold mobile-lg:text-sm mobile-md:text-sm mobile-sm:text-sm">
    //                                         {title}
    //                                     </div>
    //                                     <div className="mt-2 hidden mobile-sm:block">
    //                                         <span>$</span> {price.toFixed(0)}
    //                                         <br />
    //                                         <span>Qty:</span> {quantity}
    //                                     </div>
    //                                     <button
    //                                         onClick={onRemoveProduct}
    //                                         className="mt-2 text-gray-500 underline"
    //                                     >
    //                                         Remove
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </td>
    //                     )}
    //                     <td className="col-span-1 whitespace-nowrap px-6 py-4 text-sm mobile-sm:hidden">
    //                         ${price.toFixed(2)}
    //                         <div className="mt-2 hidden mobile-md:block">
    //                             <span className="font-semibold">Qty:</span> {quantity}
    //                         </div>
    //                     </td>
    //                     <td className="col-span-1 whitespace-nowrap px-6 py-4 text-sm mobile-md:hidden mobile-sm:hidden">
    //                         {quantity}
    //                     </td>
    //                     <td className="col-span-1 whitespace-nowrap px-6 py-4 text-sm  mobile-md:hidden mobile-sm:hidden">
    //                         ${(price * quantity).toFixed(2)}
    //                     </td>
    //                 </tr>
    //             </tbody>
    //         </table>
    //     </div>
    // );
};
