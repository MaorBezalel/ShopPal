import { API } from '.';
import type { ResponseError } from '@/shared/types/api.types';
import type { Product } from '@/shared/types/entities.types';
import type { Category } from '@/shared/types/enum.types';

type GetProductsRequestParams = {
    offset: number;
    limit: number;
    categories?: Category[];
    title?: string;
    sortBy: keyof Pick<Product, 'title' | 'price' | 'rating' | 'stock' | 'brand'>;
    order: 'ASC' | 'DESC';
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

export const getProducts = async (
    getProductRequestParams: GetProductsRequestParams
): Promise<GetProductsResponse | ResponseError> => {
    const response = await API.get('/products', { params: getProductRequestParams });
    return response.data;
};

export const getProduct = async (product_id: string): Promise<GetProductResponse | ResponseError> => {
    const response = await API.get(`/products/${product_id}`);
    return response.data;
};
