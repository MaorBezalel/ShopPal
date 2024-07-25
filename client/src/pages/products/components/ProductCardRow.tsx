import React from 'react';
import { Product } from '@/shared/types/entities.types';
import { RatingBar } from '@/shared/components/RatingBar';
import ProductEmptyImage from '@/assets/photos/product-empty-image.png';
import { AsyncImage } from 'loadable-image';

interface ProductCardProps {
    product: Product;
}

export const ProductCardRow: React.FC<ProductCardProps> = ({ product }: ProductCardProps) => {
    const formattedCategory = product.category
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="flex items-center gap-4 rounded-lg border border-primary-100 bg-slate-100 p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <AsyncImage
                src={product.thumbnail ? product.thumbnail : ProductEmptyImage}
                alt={product.title}
                className="h-24 w-24 rounded-lg object-contain"
                loader={<div style={{ background: '#888' }} />}
            />
            <div className="flex flex-1 flex-col sm:flex-row">
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-md line-clamp-3 w-5/6">{product.description}</p>
                    <RatingBar
                        rating={product.rating}
                        className="mt-2"
                    />
                </div>
                <div className="flex flex-col items-end max-sm:items-start">
                    <p className="text-md mb-2 font-semibold">${product.price}</p>
                    <div className="rounded-lg bg-primary-200 p-1 px-3">
                        <p className="text-md font-semibold">{formattedCategory}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
