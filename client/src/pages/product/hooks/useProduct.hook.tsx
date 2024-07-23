import { useCallback } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import type { Product } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

type useProductProps = {
    initialProduct?: Product;
    product_id: string;
};

export const useProduct = ({ product_id, initialProduct }: useProductProps) => {
    const { productApi } = useApi();

    const queryProduct = useCallback(async () => {
        try {
            const response = await productApi.getProduct(product_id);
            if ('message' in response) {
                throw new Error(response.message);
            }
            return response.product;
        } catch (error) {
            throw new Error('Failed to fetch product');
        }
    }, [productApi, product_id]);

    const {
        data,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
        error: errorProduct,
        isSuccess: isSuccessProduct,
        isFetching: isFetchingProduct,
    } = useQuery({
        queryKey: ['product', product_id],
        queryFn: queryProduct,
        enabled: !initialProduct, // If initialProduct is provided, don't fetch the product
        refetchOnWindowFocus: false,
    });

    return {
        currentProduct: data || initialProduct,
        fetchProductState: {
            isLoading: isLoadingProduct,
            isError: isErrorProduct,
            error: errorProduct,
            isSuccess: isSuccessProduct,
            isFetching: isFetchingProduct,
        },
    };
};
