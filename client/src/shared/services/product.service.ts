import type { ResponseError } from '@/shared/types/api.types';
import type { Product } from '@/shared/types/entities.types';
import type { Category } from '@/shared/types/enum.types';
import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

export type GetProductsRequestParams = {
    offset: number;
    limit: number;
    categories?: Category[];
    title?: string;
    sortBy: keyof Pick<Product, 'title' | 'price' | 'rating' | 'stock' | 'brand'>;
    order: 'asc' | 'desc';
    brand?: string;
    minPrice: number;
    maxPrice?: number;
    minRating: number;
    inStock?: boolean;
};

type GetProductsResponse = {
    products: Product[];
};

type GetProductResponse = {
    product: Product;
};

type useUserServiceProps = {
    PUBLIC_API: AxiosInstance;
};

export const useProductService = ({ PUBLIC_API }: useUserServiceProps) => {
    const getProducts = useCallback(
        async (getProductRequestParams: GetProductsRequestParams): Promise<GetProductsResponse | ResponseError> => {
            const commaSepratedCategories = getProductRequestParams.categories
                ? getProductRequestParams.categories.join(',')
                : undefined;

            const params = commaSepratedCategories
                ? { ...getProductRequestParams, categories: commaSepratedCategories }
                : getProductRequestParams;
            const response = await PUBLIC_API.get('/product/', {
                params: params,
            });
            return response.data;
        },
        [PUBLIC_API]
    );

    const getProduct = useCallback(
        async (product_id: string): Promise<GetProductResponse | ResponseError> => {
            const response = await PUBLIC_API.get(`/product/${product_id}`);
            return response.data;
        },
        [PUBLIC_API]
    );

    return { getProducts, getProduct };
};
