import { useCallback, useEffect } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import type { Product } from '@/shared/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMessages } from '@/shared/hooks/useMessages.hook';
import { useNavigate } from 'react-router';

type useProductProps = {
    initialProduct?: Product;
    product_id: string;
};

export const useProduct = ({ product_id, initialProduct }: useProductProps) => {
    const { productApi } = useApi();
    const { displayMessage } = useMessages();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
        enabled: !initialProduct,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isErrorProduct) {
            displayMessage({ message: 'Failed to fetch product', type: 'error' });

            setTimeout(() => {
                navigate(-1);
            }, 500);
        }
    }, [isErrorProduct]);

    useEffect(() => {
        if (initialProduct) {
            queryClient.setQueryData(['product', product_id], initialProduct);
        }
    }, [initialProduct, product_id, queryClient]);

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
