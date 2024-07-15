import { Order, Product } from '@/shared/models/entities';
import { OrderProductLink } from '@/shared/models/relationships';
import { Address } from '@/shared/models/composites';
import { OrderStatus } from '@/shared/types/enums/db.types';

export type GetOrdersRequestProps = {
    user_id: string;
    limit?: number;
    offset?: number;
};

export type CreateOrderForGuestUserProps = {
    product_ids: string[];
    quantities: number[];
    billing_info: string;
    delivery_address: Address;
};

export type CreateOrderForAuthenticatedUserProps = {
    user_id: string;
} & CreateOrderForGuestUserProps;

export type UpdateOrderProps = {
    order_id: string;
    user_id: string;
    order_status: OrderStatus;
    delivery_address: Address;
};

export type DeleteOrderProps = {
    order_id: string;
    user_id: string;
};

export type GetOrdersResponseProps = {
    order_details: Order;
    order_products: Partial<Product> & Pick<OrderProductLink, 'quantity'>[];
};
