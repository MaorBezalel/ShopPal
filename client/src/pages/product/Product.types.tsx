import type { GetReviewRequestParams } from '@/shared/services/review.service';
import type { Review } from '@/shared/types';

type unPrefixedReviewQueryParams = Omit<GetReviewRequestParams, 'product_id'>;
export type ReviewQueryParams = {
    [K in keyof unPrefixedReviewQueryParams as `reviews_${K}`]: unPrefixedReviewQueryParams[K];
};
export type SortReviewOptions = keyof Pick<Review, 'rating' | 'date'>;
export type OrderReviewOptions = 'asc' | 'desc';
