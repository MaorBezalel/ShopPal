// ProductDisplay.tsx
interface ProductDisplayProps {
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
    onRemoveProduct: () => void;
}

// ProductDisplay.tsx
export const ProductDisplayInCart = ({ title, price, quantity, thumbnail, onRemoveProduct }: ProductDisplayProps) => {



    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-t border-b border-gray-200">
                        {thumbnail && (
                            <td className="col-span-1">
                                {/* Flex container for image, title, and button */}
                                <div className="flex items-center space-x-4"> {/* Adjusted for flex row layout */}
                                    <img src={thumbnail} alt={title} className="w-24 h-24 object-cover" />
                                    <div>
                                        <div>{title}</div>
                                        <button onClick={onRemoveProduct} className="mt-2">Remove</button> {/* Adjust margin as needed */}
                                    </div>
                                </div>
                            </td>
                        )}
                        <td className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${price.toFixed(2)}
                        </td>
                        <td className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {quantity}
                        </td>
                        <td className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${(price * quantity).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};