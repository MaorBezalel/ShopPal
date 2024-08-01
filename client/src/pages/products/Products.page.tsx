import ListViewBar from '../../shared/components/ListViewBar';
import SortByOptions from '@/shared/components/SortByOptions';
import { useCallback, useState } from 'react';
import { useProducts } from './hooks/useProducts.hook';
import ProductFilter from './components/ProductFilter';
import { ProductList } from './components/ProductList';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll.hook';

import type { ListView, ProductShape, SortProductOptions, OrderProductOptions, ProductOptions } from './Products.types';
import { ProductListSkeleton } from './components/ProductListSkeleton';

export const ProductsPage = () => {
    const [productsShape, setProductsShape] = useState<ProductShape>('column');
    const {
        products,
        sortOptions,
        productsOptions,
        updateProducts,
        goToNextPage,
        isLoadingNextProductsPage,
        isLoadingFirstProductsPage,
        isErrorLoadingFirstProductsPage,
        conditionsToFetchNewPage,
    } = useProducts();

    useInfiniteScroll({
        fetchNextPage: goToNextPage,
        threshold: 50,
        conditionsToFetchNewPage: conditionsToFetchNewPage,
    });

    const onListViewChange = useCallback((listView: ListView) => {
        setProductsShape(listView === 'grid' ? 'column' : 'row');
    }, []);

    const onFilterChange = useCallback((updatedFilterOptions: Partial<ProductOptions>) => {
        updateProducts(updatedFilterOptions);
    }, []);

    const onSortByChange = useCallback((sortBy: SortProductOptions) => {
        onFilterChange({ sortBy: sortBy });
    }, []);

    const onOrderByChange = useCallback((orderBy: OrderProductOptions) => {
        onFilterChange({ order: orderBy });
    }, []);

    return (
        <div className="container flex max-w-screen-2xl flex-row gap-2 max-2xl:max-w-screen-xl max-xl:max-w-screen-lg max-xl:flex-col max-lg:max-w-screen-md max-md:max-w-screen-sm max-sm:p-2">
            <div className="mt-2 w-1/5 max-xl:w-full">
                <ProductFilter
                    onFilterChange={onFilterChange}
                    initialFilterOptions={productsOptions}
                    disable={isLoadingNextProductsPage || isLoadingFirstProductsPage}
                />
            </div>
            <div className="relative flex w-4/5 flex-col gap-2 max-xl:w-full">
                <div className="flex flex-row items-center justify-between max-sm:flex-col max-sm:gap-2">
                    <h1 className="text-3xl font-semibold">Products List: </h1>
                    <div className="flex flex-row items-center gap-4">
                        <SortByOptions
                            sortOptions={sortOptions}
                            defaultSelectedOrderOption={productsOptions.order}
                            defaultSelectedSortOption={productsOptions.sortBy}
                            onSortOptionChange={onSortByChange}
                            onOrderOptionChange={onOrderByChange}
                        />
                        <ListViewBar
                            defaultListView={'grid'}
                            onListViewChange={onListViewChange}
                        />
                    </div>
                </div>
                {isLoadingFirstProductsPage ? (
                    <ProductListSkeleton
                        skeletonNumber={12}
                        productShape={productsShape}
                    />
                ) : isErrorLoadingFirstProductsPage ? (
                    <p className="text-center text-2xl text-red-800">An error occurred while retrieving products</p>
                ) : (
                    <ProductList
                        products={products}
                        productsShape={productsShape}
                        isLoadingProducts={isLoadingNextProductsPage}
                    />
                )}
            </div>
        </div>
    );
};
