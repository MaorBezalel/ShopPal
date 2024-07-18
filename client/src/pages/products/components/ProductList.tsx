import React from 'react';
import { useCallback } from 'react';
import ProductCard from '../components/ProductCard';

import type { ProductShape } from '../Products.types';
import type { Product } from '@/shared/types';

import { useNavigate } from 'react-router';

import LoadingAnimation from '@/shared/components/LoadingAnimation';


type ProductListProps = {
    products: Product[];
    productsShape: ProductShape;
    isLoadingProducts: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ products, productsShape, isLoadingProducts } : ProductListProps) => {
    return (
        <>
            <div className={`grid gap-5 ${productsShape === 'column' ? 'grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1' : ''}`}>
                {products.length > 0 && products.map((product) => (
                        <ProductCard key={product.product_id} cardShape={productsShape} product={product} />
                ))}
            </div>
                {isLoadingProducts && <div className='my-4'><LoadingAnimation /></div>}
                {products.length === 0 && !isLoadingProducts && <p className='text-2xl text-center'>No products found</p>}
        </>
    );
};
