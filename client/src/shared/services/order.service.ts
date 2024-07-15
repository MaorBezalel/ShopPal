import { API } from '.';
import type { ResponseError } from '../types/api.types';
import type { Order, Product } from '@/shared/types/entities.types';

type GetOrdersResponseProps = {
    order_details: Order;
    order_products: Partial<Product> & { quantity: number }[];
};

type AddOrderRequestProps = {
    product_ids: string[];
    quantities: number[];
    billing_info: string;
    delivery_address: string;
};

type AddOrderResponse = Order;

export const getUserOrders = async (userId: string): Promise<GetOrdersResponseProps | ResponseError> => {
    const response = await API.get(`/orders/${userId}`);
    return response.data;
};

export const addGuestOrder = async (orderDetails: AddOrderRequestProps): Promise<AddOrderResponse | ResponseError> => {
    const response = await API.post('/orders/', orderDetails);
    return response.data;
};

export const addUserOrder = async (
    userId: string,
    orderDetails: AddOrderRequestProps
): Promise<AddOrderResponse | ResponseError> => {
    const response = await API.post(`/orders/${userId}`, orderDetails);
    return response.data;
};
