import { useTypedSearchParams } from '@/shared/hooks/useTypedSearchParams.hook';
import type { ProductOptions } from '../Products.types';
import { useMemo } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import type { SortProductOptions } from '../Products.types';
import { convertURLParamsRepresentationToProductOptions } from '../utils/ProductUtils';
import { useCallback, useState } from 'react';
import type { ProductQueryParams } from '../Products.types';
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery.hook';


export const useProducts = () => {
  const { productApi } = useApi();
  const sortOptions: SortProductOptions[] = useMemo(() => ['title', 'price', 'rating', 'stock', 'brand'], []);
  const [productsOptions, setProductsOptions] = useTypedSearchParams<ProductQueryParams>(
    {
    sortBy: 'title',
    order: 'asc',
    minPrice: 0,
    minRating: 0,
    categories: []
  }, convertURLParamsRepresentationToProductOptions
);

const [hasMore, setHasMore] = useState<boolean>(true);


  const fetchProducts = useCallback(async (productsOptions: ProductOptions) => {
        try {
            const response = await productApi.getProducts(productsOptions);
            if ('message' in response) {
                throw new Error(response.message);
            
            }

            if (response.products.length < productsOptions.limit) {
                setHasMore(false);
            }
            return response.products;
        }
         catch (error) {
            throw new Error('Failed to fetch products');
        }
  }, [productApi]);

  const updateProductFilter = useCallback((updatedOptions: Partial<ProductQueryParams>) => {
      setProductsOptions(updatedOptions);
      resetPage();
      setSaveResults(false);
      setHasMore(true);
  }, []);

  const updateProductPage = useCallback(() => {
      goToNextPage();
      setSaveResults(true);
  }, []);

  const {data: data, 
    isInitialLoading,
    isLoading,
    isError,
    error,
    goToNextPage,
    resetPage,
    setSaveResults
  } = usePaginatedQuery('products', fetchProducts, productsOptions);


  return {
    products: data || [],
    sortOptions,
    hasMore,
    updateProducts: updateProductFilter,
    goToNextPage: updateProductPage,
    setHasMore,
    productsOptions,
    isLoadingProducts: isLoading,
    isLoadingFirstProductsPage: isInitialLoading,
    isErrorLoadingProducts: isError,
    errorLoadingProductsMessage: isError ? (error as Error).message : null,
};
};