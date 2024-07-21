import ListViewBar from "../../shared/components/ListViewBar";
import SortByOptions from "@/shared/components/SortByOptions";
import { useCallback, useState } from "react";
import { useProducts } from "./hooks/useProducts.hook";
import ProductFilter from "./components/ProductFilter";
import { ProductList } from "./components/ProductList";
import LoadingAnimation from "@/shared/components/LoadingAnimation";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll.hook";

import type { ListView, ProductShape, SortProductOptions, OrderProductOptions, ProductOptions } from "./Products.types";

import Message from "@/shared/components/Message";

export const ProductsPage = () => {

  const [productsShape, setProductsShape] = useState<ProductShape>('column');
  const { products, sortOptions, productsOptions ,updateProducts, goToNextPage, isLoadingProducts, isLoadingFirstProductsPage, isErrorLoadingProducts, errorLoadingProductsMessage, hasMore } = useProducts();

  const conditionsToFetchNewPage = useCallback(() => !isLoadingProducts && hasMore, [isLoadingProducts, hasMore]);

  useInfiniteScroll({
    fetchNextPage: goToNextPage, 
    threshold: 300, 
    conditionsToFetchNewPage: conditionsToFetchNewPage});

  const onListViewChange = useCallback((listView: ListView) => {
    setProductsShape(listView === 'grid' ? 'column' : 'row');
  }, []);

  const onFilterChange = useCallback((updatedFilterOptions: Partial<ProductOptions>) => {
    updateProducts(updatedFilterOptions);
  }, []);

  const onSortByChange = useCallback((sortBy: SortProductOptions) => {
    onFilterChange({sortBy: sortBy});
  }, []);

  const onOrderByChange = useCallback((orderBy: OrderProductOptions) => {
    onFilterChange({order: orderBy});
  },[]);



    return (
      <div className="mx-auto flex flex-row gap-2
        max-w-screen-2xl
        max-2xl:max-w-screen-xl
        max-xl:flex-col max-xl:max-w-screen-lg
        max-lg:max-w-screen-md
        max-md:max-w-screen-sm
        max-sm:mx-2">
        <div className="w-1/5 mt-2 max-xl:w-full">
          <ProductFilter onFilterChange={onFilterChange} initialFilterOptions={productsOptions} disable={isLoadingProducts}/>
        </div>
        <div className="flex flex-col gap-2 w-4/5 max-xl:w-full relative">
            <div className="flex flex-row justify-between items-center max-sm:flex-col max-sm:gap-2">
                <h1 className="text-3xl font-semibold">Products List: </h1>
                <div className="flex flex-row gap-4 items-center">
                  <SortByOptions sortOptions={sortOptions}  defaultSelectedOrderOption={productsOptions.order} defaultSelectedSortOption={productsOptions.sortBy} onSortOptionChange={onSortByChange} onOrderOptionChange={onOrderByChange} />
                  <ListViewBar defaultListView={'grid'} onListViewChange={onListViewChange}/> 
                </div>
            </div>
            {isErrorLoadingProducts && <Message message={errorLoadingProductsMessage!} type="error"/>}
            {isLoadingFirstProductsPage && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><LoadingAnimation /></div>}
            {!isErrorLoadingProducts && !isLoadingFirstProductsPage && <ProductList products={products} productsShape={productsShape} isLoadingProducts={isLoadingProducts}/>}
        </div>
      </div>
    );
}