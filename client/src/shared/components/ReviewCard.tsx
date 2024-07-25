import React from 'react';
import { memo } from 'react';
import { AsyncImage } from 'loadable-image';
import { ratingToString } from '../utils';
import UserEmptyAvatar from '@/assets/photos/user-empty-avatar.png';

type ReviewCardProps = {
    comment: string;
    rating: number;
    authorName: string;
    authorAvatar?: string;
    date: Date;
};

export const ReviewCard: React.FC<ReviewCardProps> = memo(({ comment, rating, authorName, authorAvatar, date }) => {
    return (
        <div className="flex flex-col gap-2 rounded-lg border border-primary-200 bg-slate-100 p-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2">
                    <AsyncImage
                        src={authorAvatar || UserEmptyAvatar}
                        alt={authorName}
                        className="h-8 w-8 rounded-full"
                        loader={<div style={{ background: '#888' }} />}
                    />
                    <p className="font-semibold">{authorName}</p>
                </div>
                <p>{date.toDateString()}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold">{`${ratingToString(rating)} (${rating}/5)`}</h2>
                <p>{comment}</p>
            </div>
        </div>
    );
});
