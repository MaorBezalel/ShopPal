import { API } from '.';
import type { Cart, Product } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';

type GetGuestCartRequest = {
    product_ids: string[];
};

type GetGuestCartResponse = {
    products: Product[];
};

type GetUserCartResponse = {
    userCart: Cart[];
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

export const GetGuestCart = async (
    productDetails: GetGuestCartRequest
): Promise<GetGuestCartResponse | ResponseError> => {
    const response = await API.post('/cart/', productDetails);

    return response.data;
};

export const GetUserCart = async (userId: string): Promise<GetUserCartResponse | ResponseError> => {
    const response = await API.get(`/cart/${userId}`);

    return response.data;
};

export const AddProductToCart = async (
    productId: string,
    quantity: number,
    userId: string
): Promise<AddProductToCartResponse | ResponseError> => {
    const response = await API.post(`/cart/${userId}`, { productId, quantity });

    return response.data;
};

export const RemoveProductFromCart = async (
    productId: string,
    userId: string
): Promise<DeleteProductFromCartResponse | ResponseError> => {
    const response = await API.delete(`/cart/${userId}/${productId}`);

    return response.data;
};

export const RemoveCart = async (userId: string): Promise<DeleteCartResponse | ResponseError> => {
    const response = await API.delete(`/cart/${userId}`);

    return response.data;
};
