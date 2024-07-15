import type { ResponseError } from '../types/api.types';
import type { Address } from '../types';
import type { Order, Product } from '@/shared/types/entities.types';
import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

type GetOrdersResponseProps = {
    order_details: Order;
    order_products: Partial<Product> & { quantity: number }[];
};

type AddOrderRequestProps = {
    product_ids: string[];
    quantities: number[];
    billing_info: string;
    delivery_address: Address;
};

type AddOrderResponse = Order;

type useOrderServiceProps = {
    PRIVATE_API: AxiosInstance;
    PUBLIC_API: AxiosInstance;
};

export const useOrderService = ({ PRIVATE_API, PUBLIC_API }: useOrderServiceProps) => {
    const getUserOrders = useCallback(
        async (userId: string): Promise<GetOrdersResponseProps | ResponseError> => {
            const response = await PRIVATE_API.get(`/order/${userId}`);
            return response.data;
        },
        [PRIVATE_API]
    );

    const addGuestOrder = useCallback(
        async (orderDetails: AddOrderRequestProps): Promise<AddOrderResponse | ResponseError> => {
            const response = await PUBLIC_API.post('/order/', orderDetails);
            return response.data;
        },
        [PUBLIC_API]
    );

    const addUserOrder = useCallback(
        async (userId: string, orderDetails: AddOrderRequestProps): Promise<AddOrderResponse | ResponseError> => {
            const response = await PRIVATE_API.post(`/order/${userId}`, orderDetails);
            return response.data;
        },
        [PRIVATE_API]
    );

    return { getUserOrders, addGuestOrder, addUserOrder };
};
