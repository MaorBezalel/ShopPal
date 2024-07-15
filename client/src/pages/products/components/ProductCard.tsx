import React from 'react';
import type { Product } from '@/shared/types/entities.types';
import { ProductCardColumn } from './ProductCardColumn';
import { ProductCardRow } from './ProductCardRow';

interface ProductCardProps {
    cardShape: 'column' | 'row';
    product: Product;
    key: string;
}

const ProductCard: React.FC<ProductCardProps> = ({cardShape, product} : ProductCardProps) => {

    return (
        <>
            {cardShape === 'column' ? <ProductCardColumn product={product} /> : <ProductCardRow product={product}/>}
        </>
    )
};

export default ProductCard;