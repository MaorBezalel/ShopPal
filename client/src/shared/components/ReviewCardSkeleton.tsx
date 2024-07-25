import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ReviewCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 rounded-lg border border-primary-200 bg-slate-100 p-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <Skeleton circle={true} height={32} width={32} />
                    <Skeleton width={100} />
                </div>
                <Skeleton width={80} />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton width={150} />
                <Skeleton count={3} />
            </div>
        </div>
    );
};

export default ReviewCardSkeleton;
