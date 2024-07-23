import React from 'react';
import { Product } from '@/shared/types/entities.types';
import { RatingBar } from '@/shared/components/RatingBar';
import ProductEmptyImage from '@/assets/photos/product-empty-image.png';
import { AsyncImage } from 'loadable-image';

import { formatCategoryName } from '../utils/ProductUtils';

interface ProductCardProps {
    product: Product;
}

export const ProductCardColumn: React.FC<ProductCardProps> = ({ product }: ProductCardProps) => {
    const formattedCategory = formatCategoryName(product.category);

    return (
        <div className="relative flex flex-col justify-between gap-2 rounded-lg border border-primary-100 bg-slate-100 p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div>
                <AsyncImage
                    src={product.thumbnail ? product.thumbnail : ProductEmptyImage}
                    alt={product.title}
                    className="mx-auto h-24 w-24 rounded-lg object-contain"
                    loader={<div style={{ background: '#888' }} />}
                />
                <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
                <p className="text-md line-clamp-3">{product.description}</p>
                <RatingBar rating={product.rating} className="mt-2" />
            </div>
            <div className="flex flex-row justify-between">
                <p className="text-md font-semibold">${product.price}</p>
                <div className="rounded-lg bg-primary-200 p-0.5 px-3">
                    <p className="text-md font-semibold">{formattedCategory}</p>
                </div>
            </div>
        </div>
    );
};
