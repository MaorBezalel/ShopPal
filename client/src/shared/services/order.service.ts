import type { ResponseError } from '../types/api.types';
import type { Address } from '../types';
import type { Order, Product } from '@/shared/types/entities.types';
import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

export type GetOrdersResponseProps = (Pick<
    Order,
    'order_id' | 'issued_time' | 'order_status' | 'delivery_address' | 'billing_info'
> & {
    products: Partial<Product & { quantity: number }>[];
})[];

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

type updateStocksProps = {
    product_ids: string[];
    new_stocks: number[];
};

export const useOrderService = ({ PRIVATE_API, PUBLIC_API }: useOrderServiceProps) => {
    const getUserOrders = useCallback(
        async (userId: string, limit?: number, offset?: number): Promise<GetOrdersResponseProps | ResponseError> => {
            const response = await PRIVATE_API.get(`/order/${userId}`, { params: { limit, offset } });
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

    const updateStocks = useCallback(
        async (updateby: updateStocksProps): Promise<void | ResponseError> => {
            const response = await PUBLIC_API.patch('/order/', updateby);
            return response.data;
        },
        [PUBLIC_API]
    );

    return { getUserOrders, addGuestOrder, addUserOrder, updateStocks };
};
