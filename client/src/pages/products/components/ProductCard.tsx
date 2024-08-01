import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/shared/types/entities.types';
import { ProductCardColumn } from './ProductCardColumn';
import { ProductCardRow } from './ProductCardRow';
import { memo } from 'react';

interface ProductCardProps {
    cardShape: 'column' | 'row';
    product: Product;
    key: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ cardShape, product }: ProductCardProps) => {
    return (
        <Link
            to={`/product/${product.product_id}?reviews_sortBy=date&reviews_order=desc`}
            state={product}
        >
            {cardShape === 'column' ? <ProductCardColumn product={product} /> : <ProductCardRow product={product} />}
        </Link>
    );
});

export default ProductCard;
