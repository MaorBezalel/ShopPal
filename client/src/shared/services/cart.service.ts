import type { Cart, Product } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';
import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

type GetGuestCartRequest = {
    product_ids: string[];
};

type GetGuestCartResponse = {
    products: Product[];
};

type GetUserCartResponse = {
    userCart: Cart;
};

type AddProductToCartResponse = {
    message: string;
};

type DeleteProductFromCartResponse = {
    message: string;
};

type DeleteCartResponse = {
    message: string;
};

type useCartServiceProps = {
    PRIVATE_API: AxiosInstance;
    PUBLIC_API: AxiosInstance;
};

export const useCartService = ({ PRIVATE_API, PUBLIC_API }: useCartServiceProps) => {
    
    const getGuestCart = useCallback(
        async (productDetails: GetGuestCartRequest): Promise<GetGuestCartResponse | ResponseError> => {
            const response = await PUBLIC_API.post('/cart/', productDetails);

            return response.data;
        },
        [PUBLIC_API]
    );

    const getUserCart = useCallback(
        async (userId: string): Promise<GetUserCartResponse | ResponseError> => {
            const response = await PRIVATE_API.get(`/cart/${userId}`);

            return response.data;
        },
        [PRIVATE_API]
    );

    const addProductToCart = useCallback(
        async (
            productId: string,
            quantity: number,
            userId: string
        ): Promise<AddProductToCartResponse | ResponseError> => {
            const response = await PRIVATE_API.post(`/cart/${userId}`, { productId, quantity });

            return response.data;
        },
        [PRIVATE_API]
    );

    const removeProductFromCart = useCallback(
        async (productId: string, userId: string): Promise<DeleteProductFromCartResponse | ResponseError> => {
            const response = await PRIVATE_API.delete(`/cart/${userId}/${productId}`);

            return response.data;
        },
        [PRIVATE_API]
    );

    const removeCart = useCallback(
        async (userId: string): Promise<DeleteCartResponse | ResponseError> => {
            const response = await PRIVATE_API.delete(`/cart/${userId}`);

            return response.data;
        },
        [PRIVATE_API]
    );

    return { getGuestCart, getUserCart, addProductToCart, removeProductFromCart, removeCart };
};
