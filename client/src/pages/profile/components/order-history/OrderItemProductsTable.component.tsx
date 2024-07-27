import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AsyncImage } from 'loadable-image';
import { IconExternalLink } from '@/shared/components/icons';
import { GetOrdersResponseProps } from '@/shared/services/order.service';
import productEmptyImage from '@/assets/photos/product-empty-image.png';

interface OrderItemProductsTableProps {
    products: GetOrdersResponseProps['products'];
}

export function OrderItemProductsTable({ products }: OrderItemProductsTableProps) {
    const totalQuantity = useMemo(() => {
        return products.reduce((acc, product) => acc + product.quantity, 0);
    }, [products]);

    const totalPrice = useMemo(() => {
        return products.reduce((acc, product) => acc + product.price! * product.quantity!, 0);
    }, [products]);

    return (
        <table
            className="mt-4 w-full table-fixed border-collapse border-spacing-y-4 border-2 border-gray-500 
        tablet-sm:text-sm
        mobile-lg:text-xs"
        >
            <thead className="bg-background-400">
                <tr>
                    <th
                        id="link"
                        scope="col"
                        className="w-[5%] border border-gray-500 text-center font-semibold text-background-100
                    tablet-lg:w-[10%]"
                    >
                        <span className="sr-only">View Product</span>
                    </th>
                    <th
                        id="product"
                        scope="col"
                        className="w-[65%] border border-gray-500 px-6 py-3 font-semibold text-background-100
                    tablet-lg:w-[50%]
                    tablet-md:w-[45%]"
                    >
                        Product
                    </th>
                    <th
                        id="quantity"
                        scope="col"
                        className="w-[10%] border border-gray-500 text-center font-semibold text-background-100
                    tablet-md:w-[15%]
                    mobile-lg:w-[10%]"
                    >
                        <span className="mobile-lg:hidden">Quantity</span>
                        <span className="hidden mobile-lg:block">Qty</span>
                    </th>
                    <th
                        id="price"
                        scope="col"
                        className="w-[10%] border border-gray-500 text-center font-semibold text-background-100
                    tablet-lg:w-[17.5%]"
                    >
                        Price <br className="hidden pc-sm:block" />
                        (per unit)
                    </th>
                    <th
                        id="total"
                        scope="col"
                        className="w-[10%] border border-gray-500 text-center font-semibold text-background-100
                    tablet-lg:w-[17.5%]"
                    >
                        Total Price
                    </th>
                </tr>
            </thead>
            <tbody className="bg-background-100">
                {products.map((product) => (
                    <tr key={product.product_id}>
                        {/* --- Link */}
                        <td className="border border-gray-500 text-center">
                            <Link
                                to={`/product/${product.product_id}`}
                                className="flex items-center justify-center font-medium text-secondary-400 hover:text-secondary-500 active:text-secondary-600"
                            >
                                <IconExternalLink
                                    className="size-6
                                tablet-sm:size-5
                                mobile-lg:size-4"
                                />
                            </Link>
                        </td>

                        {/* --- Product Thumbnail + Title */}
                        <th
                            scope="row"
                            className="border border-gray-500 px-6 py-4 text-center font-medium text-text-950
                        tablet-md:px-2"
                        >
                            <div
                                className="flex flex-row items-center gap-4
                            tablet-md:gap-2"
                            >
                                <AsyncImage
                                    src={product.thumbnail || productEmptyImage}
                                    alt={product.title}
                                    className="size-16 object-cover"
                                    loader={<div className="bg-[#888]" />}
                                />
                                <span className="text-start">{product.title}</span>
                            </div>
                        </th>

                        {/* --- Quantity */}
                        <td className="border border-gray-500 py-4 text-center text-text-950">{product.quantity}</td>

                        {/* --- Price */}
                        <td
                            colSpan={product.quantity === 1 ? 2 : 1}
                            className="border border-gray-500 py-4 text-center text-text-950"
                        >
                            {`$${product.price}`}
                        </td>

                        {/* --- Total Price */}
                        <td
                            colSpan={product.quantity === 1 ? 0 : 1}
                            className="border border-gray-500 py-4 text-center text-text-950"
                        >
                            {`$${product.price * product.quantity}`}
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot className="bg-background-400">
                <tr
                    className="border-t border-dashed border-gray-500 text-xl
                tablet-sm:text-lg
                mobile-lg:text-base"
                >
                    <th
                        scope="row"
                        colSpan={2}
                        className="border-r border-gray-500 px-2 py-4 text-end font-semibold text-background-100"
                    >
                        Total
                    </th>
                    <td
                        colSpan={1}
                        className="border-r border-gray-500 px-2 py-4 text-center font-semibold text-background-100"
                    >
                        {totalQuantity}
                    </td>
                    <td
                        colSpan={2}
                        className="text-center font-medium text-background-100"
                    >
                        {`$${totalPrice}`}
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}
