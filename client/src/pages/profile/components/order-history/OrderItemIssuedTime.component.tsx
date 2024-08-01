interface OrderItemIssuedTimeProps {
    issuedTime: Date;
}

export function OrderItemIssuedTime({ issuedTime }: OrderItemIssuedTimeProps) {
    return (
        <time
            itemProp="orderDate"
            dateTime={new Date(issuedTime).toISOString()}
            className="font-medium text-accent-500"
        >
            Issued On: <br className="hidden tablet-lg:block" />
            <span className="font-medium text-primary-500">
                {new Date(issuedTime).toLocaleDateString().split('T')[0]}
            </span>
        </time>
    );
}
