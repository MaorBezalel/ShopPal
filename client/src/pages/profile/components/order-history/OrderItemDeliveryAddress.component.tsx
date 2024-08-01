import { Address } from '@/shared/types';

interface OrderItemDeliveryAddressProps {
    deliveryAddress: Address;
}

export function OrderItemDeliveryAddress({ deliveryAddress }: OrderItemDeliveryAddressProps) {
    return (
        <address
            itemProp="orderDelivery"
            className="font-medium not-italic text-accent-500"
        >
            Delivery Address: <br className="hidden tablet-lg:block" />
            <span className="font-medium text-primary-500">{Object.values(deliveryAddress).join(', ')}</span>
        </address>
    );
}
