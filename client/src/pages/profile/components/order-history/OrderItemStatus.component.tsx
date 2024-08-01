import { OrderStatus } from '@/shared/types';

interface OrderItemStatusProps {
    orderStatus: OrderStatus;
}

export function OrderItemStatus({ orderStatus }: OrderItemStatusProps) {
    return (
        <p
            itemProp="orderStatus"
            className="font-medium text-accent-500"
        >
            Status: <br className="hidden tablet-lg:block" />
            <span className="font-medium text-primary-500">{orderStatus}</span>
        </p>
    );
}
