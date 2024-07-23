import type { Product } from '@/shared/types';
import { ProductList } from '@/pages/products/components/ProductList';
import { useProductSimilarResults } from '../hooks/useProductSimilarResults.hook';

type ProductSimilarResults = {
    product: Product;
};

export const ProductSimilarResults = ({ product }: ProductSimilarResults) => {
    const { similarProducts, isLoading, isError } = useProductSimilarResults({ product });

    return (
        <div className="mt-4 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">You Might Also Like: </h1>
            {isError ? (
                <p className="text-center text-lg font-semibold text-red-800">Error Retreving Similar Results</p>
            ) : (
                <ProductList products={similarProducts} productsShape="column" isLoadingProducts={isLoading} />
            )}
        </div>
    );
};

ProductSimilarResults;
