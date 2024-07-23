import type { Review } from '@/shared/types';
import type { ReviewQueryParams } from '../Product.types';

export const convertURLParamsRepresentationToProductOptions = (params: Record<string, string>): ReviewQueryParams => {
    const typedParams: ReviewQueryParams = {
        reviews_sortBy: (params.reviews_sortBy as keyof Pick<Review, 'rating' | 'date'>) || 'rating',
        reviews_order: (params.reviews_order as 'asc' | 'desc') || 'desc',
    };

    return typedParams;
};
