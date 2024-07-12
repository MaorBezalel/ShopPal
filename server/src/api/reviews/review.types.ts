import { Review } from '@/shared/models/entities';
import { Keys } from '@/shared/types/utils.types';

export type GetReviewsRequestProps = {
    product_id: string;
    limit?: number;
    offset?: number;
    sortBy?: Keys<Pick<Review, 'rating' | 'date'>>;
    order?: 'ASC' | 'DESC';
};

export type CreateReviewRequestProps = Omit<Review, 'date'>;

export type UpdateReviewRequestProps = Omit<Review, 'date'>;

export type DeleteReviewRequestProps = Pick<Review, 'product_id' | 'user_id'>;
