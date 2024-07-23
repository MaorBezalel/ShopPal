import { useTypedSearchParams } from '@/shared/hooks/useTypedSearchParams.hook';
import type { ProductOptions } from '../Products.types';
import { useEffect, useMemo } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import type { SortProductOptions } from '../Products.types';
import { convertURLParamsRepresentationToProductOptions } from '../utils/ProductUtils';
import { useCallback } from 'react';
import type { ProductQueryParams } from '../Products.types';
import { useInfinitePaginatedQuery } from '@/shared/hooks/useInfinitePaginatedQuery.hook';
import { useMessages } from '@/shared/hooks/useMessages.hook';

export const useProducts = () => {
    const { displayMessage } = useMessages();
    const { productApi } = useApi();
    const sortOptions: SortProductOptions[] = useMemo(() => ['title', 'price', 'rating', 'stock', 'brand'], []);
    const [productsOptions, setProductsOptions] = useTypedSearchParams<ProductQueryParams>(
        {
            sortBy: 'title',
            order: 'asc',
            minPrice: 0,
            minRating: 0,
            categories: [],
        },
        convertURLParamsRepresentationToProductOptions
    );

    const fetchProducts = useCallback(
        async (productsOptions: ProductOptions) => {
            try {
                const response = await productApi.getProducts(productsOptions);
                if ('message' in response) {
                    throw new Error(response.message);
                }
                return response.products;
            } catch (error) {
                throw new Error('Failed to fetch products');
            }
        },
        [productApi]
    );

    const updateProductFilter = useCallback((updatedOptions: Partial<ProductQueryParams>) => {
        setProductsOptions(updatedOptions);
    }, []);

    const {
        data: data,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        isFetchNextPageError,
        error,
        fetchNextPage,
    } = useInfinitePaginatedQuery('products', fetchProducts, productsOptions, 20);

    const conditionsToFetchNewPage = useCallback(
        () => !isFetchingNextPage && hasNextPage,
        [isFetchingNextPage, hasNextPage]
    );

    useEffect(() => {
        if (!isFetchingNextPage && isFetchNextPageError) {
            displayMessage({ message: 'Failed to load more products', type: 'error' });
        }
    }, [isFetchingNextPage, isFetchNextPageError]);

    return {
        products: data || [],
        sortOptions,
        hasNextPage,
        updateProducts: updateProductFilter,
        goToNextPage: fetchNextPage,
        productsOptions,
        isLoadingNextProductsPage: isFetchingNextPage,
        isLoadingFirstProductsPage: isLoading,
        isErrorLoadingFirstProductsPage: isError && !isFetchNextPageError,
        isErrorLoadingNextProductsPage: isFetchNextPageError,
        errorLoadingProductsMessage: isError ? (error as Error).message : null,
        conditionsToFetchNewPage,
    };
};
