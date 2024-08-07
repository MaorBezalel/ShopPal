import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/shared/hooks/useApi.hook';
import { useMemo } from 'react';
import type { Product } from '@/shared/types';

type useProductSimilarResultsProps = {
    product: Product;
};

export const useProductSimilarResults = ({ product }: useProductSimilarResultsProps) => {
    const { productApi } = useApi();

    const querySimilarProducts = useCallback(async () => {
        try {
            const response = await productApi.getProducts({
                categories: [product.category],
                limit: 4,
                offset: 0,
                sortBy: 'title',
                order: 'asc',
                minPrice: 0,
                minRating: 0,
            });
            if ('message' in response) {
                throw new Error(response.message);
            }

            return response.products;
        } catch (error) {
            throw new Error('Failed to fetch similar products');
        }
    }, []);

    const {
        data,
        isLoading: isLoadingSimilarProducts,
        isError: isErrorSimilarProducts,
        error: errorSimilarProducts,
        isSuccess: isSuccessSimilarProducts,
        isFetching: isFetchingSimilarProducts,
    } = useQuery({
        queryKey: ['similarProducts', product.product_id],
        queryFn: querySimilarProducts,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const similarProducts = useMemo(() => data?.filter((data) => data.product_id !== product.product_id) || [], [data]);

    return {
        similarProducts: similarProducts,
        isLoading: isLoadingSimilarProducts,
        isError: isErrorSimilarProducts,
        isFetching: isFetchingSimilarProducts,
        error: errorSimilarProducts,
        isSuccess: isSuccessSimilarProducts,
    };
};
