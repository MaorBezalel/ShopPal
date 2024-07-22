import React from 'react';
import { memo } from 'react';
import { AsyncImage } from 'loadable-image';
import { ratingToString } from '../utils';

type ReviewCardProps = {
    review: string;
    rating: number;
    authorName: string;
    authorAvatar: string;
    date: Date;
}

const ReviewCard: React.FC<ReviewCardProps> = memo(({ review, rating, authorName, authorAvatar, date }) => {
    return (
        <div className='flex flex-col gap-2 p-4 border border-gray-200 rounded-lg'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row gap-2'>
                    <AsyncImage 
                    src={authorAvatar} 
                    alt={authorName} 
                    className='w-8 h-8 rounded-full'
                    loader={<div style={{ background: '#888' }} />} />
                    <p className='font-semibold'>{authorName}</p>
                </div>
                <p>{date.toDateString()}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='font-semibold'>{`${ratingToString(rating)} (${review}/5)`}</h2>
                <p>{review}</p>
            </div>
        </div>
    );
});

export default ReviewCard;