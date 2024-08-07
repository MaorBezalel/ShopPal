import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCardRowSkeleton = () => {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-primary-100 bg-slate-100 p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="mx-auto h-24 w-24 rounded-lg">
                <Skeleton height={96} />
            </div>
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                        <Skeleton
                            width={200}
                            height={24}
                        />
                    </h2>
                    <p className="text-md line-clamp-3">
                        <Skeleton count={3} />
                    </p>
                    <Skeleton
                        width={100}
                        height={20}
                    />
                </div>
                <div className="flex flex-col items-end max-sm:items-start">
                    <p className="text-md mb-2 font-semibold">
                        <Skeleton
                            width={60}
                            height={24}
                        />
                    </p>
                    <div className="rounded-lg bg-primary-200 p-1 px-3">
                        <p className="text-md font-semibold">
                            <Skeleton
                                width={80}
                                height={24}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
