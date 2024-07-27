interface OrderItemIDProps {
    orderID: string;
}

export function OrderItemID({ orderID }: OrderItemIDProps) {
    return (
        <h3
            itemProp="orderNumber"
            className="text-2xl font-semibold text-secondary-400
            tablet-md:text-xl
            tablet-sm:text-lg
            mobile-lg:text-sm
            mobile-md:self-center mobile-md:text-center mobile-md:text-xs"
        >
            Order ID: <br className="hidden mobile-md:block" />
            <span className="text-primary-500">{orderID}</span>
        </h3>
    );
}
