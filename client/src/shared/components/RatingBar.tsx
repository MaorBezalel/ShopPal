import React from 'react';
import RatingStar from '@/assets/photos/star.png';

interface RatingBarProps {
    rating: number;
    className?: string;
}

export const RatingBar: React.FC<RatingBarProps> = ({ className, rating }: RatingBarProps) => {

    if (rating < 0 || rating > 5) {
        throw new Error('Rating must be between 0 and 5');
    }

    return (
        <div className={`flex flex-row gap-1 items-center ${className}`}>
            {Array.from({ length: Number(rating) }).map((_, index) => (
                <img 
                className='w-4 h-4'
                key={index} src={RatingStar} alt='rating star'/>
            ))}
            <p className='text-sm'>{`(${rating})`}</p>
        </div>
    );
};

