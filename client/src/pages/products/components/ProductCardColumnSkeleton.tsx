import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCardColumnSkeleton = () => {
    return (
        <div className="relative flex h-[22rem] flex-col justify-between gap-2 rounded-lg border border-primary-100 bg-slate-100 p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div>
                <div className="mx-auto h-24 w-24 rounded-lg">
                    <Skeleton height={96} />
                </div>
                <h2 className="mt-4">
                    <Skeleton width={150} />
                </h2>
                <p>
                    <Skeleton count={3} />
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton width={100} />
                <div className="flex flex-row justify-between">
                    <p>
                        <Skeleton width={50} />
                    </p>
                    <div className="rounded-lg bg-primary-200 p-0.5 px-3">
                        <p>
                            <Skeleton width={80} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
