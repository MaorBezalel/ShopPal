import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
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
    const navigator = useNavigate();

    const handleProductCardClick = useCallback(() => {
        navigator(`/product/${product.product_id}?reviews_sortBy=date&reviews_order=desc`, { state: { product } });
    }, []);

    return (
        <div onClick={handleProductCardClick}>
            {cardShape === 'column' ? <ProductCardColumn product={product} /> : <ProductCardRow product={product} />}
        </div>
    );
});

export default ProductCard;
