import React from 'react';
import { Product } from '@/shared/types/entities.types';
import { RatingBar } from '@/shared/components/RatingBar';
import ProductEmptyImage from '@/assets/photos/product-empty-image.png';
import { AsyncImage } from 'loadable-image';

interface ProductCardProps {
    product: Product;
}

export const ProductCardRow: React.FC<ProductCardProps> = ({ product } : ProductCardProps) => {

    const formattedCategory = product.category.toLowerCase().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    
    return (
        <div className='flex gap-4 items-center border border-primary-100 rounded-lg shadow-lg p-4 bg-slate-100 hover:shadow-xl transition-shadow duration-300'>
            <AsyncImage 
                src={product.thumbnail ? product.thumbnail : ProductEmptyImage} 
                alt={product.title} 
                className='w-24 h-24 object-contain rounded-lg'
                loader={<div style={{ background: '#888' }} />}
            />
            <div className='flex-1 flex sm:flex-row flex-col'>
                <div className='flex-1'>
                    <h2 className='text-lg font-semibold'>{product.title}</h2>
                    <p className='text-md line-clamp-3'>{product.description}</p>
                    <RatingBar rating={product.rating}/>
                </div>
                <div className='flex flex-col items-end max-sm:items-start'>
                    <p className='text-md font-semibold mb-2'>${product.price}</p>
                    <div className='bg-primary-200 p-1 px-3 rounded-lg'>
                        <p className='text-md font-semibold'>{formattedCategory}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
