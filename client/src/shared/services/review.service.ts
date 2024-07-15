import { API } from '.';
import type { Review } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';

type GetReviewRequestParams = {
    product_id: string;
    limit?: number;
    offset?: number;
    sortBy?: keyof Pick<Review, 'rating' | 'date'>;
    order?: 'ASC' | 'DESC';
};

type GetReviewRequestResponse = {
    reviews: Review[];
};

type CreateReviewRequestResponse = {
    review: Review;
};

export const getReviews = async (
    reviewRequestParams: GetReviewRequestParams
): Promise<GetReviewRequestResponse | ResponseError> => {
    const response = await API.get(`/review/${reviewRequestParams.product_id}`, { params: reviewRequestParams });
    return response.data;
};

export const addReview = async (review: Review): Promise<CreateReviewRequestResponse | ResponseError> => {
    const response = await API.post(`/review/${review.product_id}`, review);
    return response.data;
};

export const updateReivew = async (updatedReview: Partial<Review>): Promise<void | ResponseError> => {
    const response = await API.patch(`/review/${updatedReview.product_id}`, updatedReview);
    return response.data;
};

export const deleteReview = async (productId: string, userId: string): Promise<void | ResponseError> => {
    const response = await API.delete(`/review/${productId}/${userId}`);
    return response.data;
};
