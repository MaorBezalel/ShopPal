import React from 'react';
import { Product } from '@/shared/types/entities.types';
import { RatingBar } from '@/shared/components/RatingBar';
import ProductEmptyImage from '@/assets/photos/product-empty-image.png';
import { AsyncImage } from 'loadable-image';

import { formatCategoryName } from '../utils/ProductUtils';

interface ProductCardProps {
    product: Product;
}

export const ProductCardColumn: React.FC<ProductCardProps> = ({ product } : ProductCardProps) => {

    const formattedCategory = formatCategoryName(product.category);
    
    return (
        <div className='flex flex-col gap-2 relative border border-primary-100 rounded-lg shadow-lg p-4 bg-slate-100 hover:shadow-xl transition-shadow duration-300 justify-between'>
            <div>
                <AsyncImage 
                    src={product.thumbnail ? product.thumbnail : ProductEmptyImage} 
                    alt={product.title} 
                    className='w-24 h-24 object-contain rounded-lg mx-auto'
                    loader={<div style={{ background: '#888' }} />}
                />
                <h2 className='text-lg font-semibold mt-2'>{product.title}</h2>
                <p className='text-md line-clamp-3'>{product.description}</p>
                <RatingBar rating={product.rating}/>
            </div>
            <div className='flex flex-row justify-between'>
                <p className='text-md font-semibold'>${product.price}</p>
                <div className='bg-primary-200 p-0.5 px-3 rounded-lg'>
                    <p className='text-md font-semibold'>{formattedCategory}</p>
                </div>
            </div>
        </div>
    );
};
