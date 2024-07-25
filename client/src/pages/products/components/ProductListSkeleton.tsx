import { ProductCardColumnSkeleton } from './ProductCardColumnSkeleton';
import { ProductCardRowSkeleton } from './ProductCardRowSkeleton';

type ProductListSkeletonProps = {
    skeletonNumber: number;
    productShape: 'column' | 'row';
};

export const ProductListSkeleton = ({ skeletonNumber, productShape }: ProductListSkeletonProps) => {
    return (
        <div
            className={`grid grid-flow-row gap-5 ${productShape === 'column' ? 'grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1' : ''}`}
        >
            {Array.from({ length: skeletonNumber || 12 }).map((_, index) => {
                return productShape === 'row' ? (
                    <ProductCardRowSkeleton key={index} />
                ) : (
                    <ProductCardColumnSkeleton key={index} />
                );
            })}
        </div>
    );
};
