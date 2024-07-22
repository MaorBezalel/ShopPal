import { useState, useCallback } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import type { Product } from '@/shared/types';
import type { ReviewsWithAuthor } from '@/shared/types/entities.types';
import { useQuery } from '@tanstack/react-query';

type useProductProps = {
    initialProduct?: Product;
    product_id: string;
};

export const useProduct = ({ product_id, initialProduct }: useProductProps) => {
    const [currentProduct, setCurrentProduct] = useState<Product | undefined>(initialProduct);
    const { productApi } = useApi();

    const queryProduct = useCallback(async () => {
        try {
            const response = await productApi.getProduct(product_id);
            if ('message' in response) {
                throw new Error(response.message);
            }
            setCurrentProduct(response.product);
            return response.product;
        } catch (error) {
            throw new Error('Failed to fetch product');
        }
    }, [productApi, product_id]);

    const {
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
        error: errorProduct,
        isSuccess: isSuccessProduct,
        isFetching: isFetchingProduct,
    } = useQuery({
        queryKey: ['product', product_id],
        queryFn: queryProduct,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        currentProduct,
        fetchProductState: {
            isLoading: isLoadingProduct,
            isError: isErrorProduct,
            error: errorProduct,
            isSuccess: isSuccessProduct,
            isFetching: isFetchingProduct,
        },
    };
};
