// ProductDisplay.tsx
interface ProductDisplayProps {
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
    onRemoveProduct: () => void;
}

export const ProductDisplayInCart = ({ title, price, quantity, thumbnail, onRemoveProduct }: ProductDisplayProps) => {

    return (
        <div className="container mx-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="grid gap-4 border-t border-b border-gray-200 grid-cols-[2fr_1fr_1fr_1fr] mobile-md:grid-cols-[2fr_1fr] mobile-sm:grid-cols-[2fr_1fr]">
                        {thumbnail && (
                            <td className="col-span-1">
                                {/* Flex container for image, title, and button */}
                                <div className="flex items-center space-x-4"> {/* Adjusted for flex row layout */}
                                    <img src={thumbnail} alt={title} className="w-24 h-24 object-cover" />
                                    <div>
                                        <div className="font-bold mobile-lg:text-sm mobile-md:text-sm mobile-sm:text-sm">{title}</div>
                                        <div className="mobile-sm:block hidden mt-2">
                                            <span>$</span> {price.toFixed(0)}
                                            <br />
                                            <span>Qty:</span> {quantity}
                                        </div>
                                        <button onClick={onRemoveProduct} className="mt-2 text-gray-500 underline">Remove</button>
                                    </div>
                                </div>
                            </td>
                        )}
                        <td className="col-span-1 px-6 py-4 whitespace-nowrap text-sm mobile-sm:hidden">
                            ${price.toFixed(2)}
                            <div className="mobile-md:block hidden mt-2">
                                <span className="font-semibold">Qty:</span> {quantity}
                            </div>
                        </td>
                        <td className="col-span-1 px-6 py-4 whitespace-nowrap text-sm mobile-md:hidden mobile-sm:hidden">
                            {quantity}
                        </td>
                        <td className="col-span-1 px-6 py-4 whitespace-nowrap text-sm  mobile-md:hidden mobile-sm:hidden">
                            ${(price * quantity).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};