import type { Review } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';
import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

type GetReviewRequestParams = {
    product_id: string;
    limit?: number;
    offset?: number;
    sortBy?: keyof Pick<Review, 'rating' | 'date'>;
    order?: 'asc' | 'desc';
};

type GetReviewRequestResponse = {
    reviews: Review[];
};

type CreateReviewRequestResponse = {
    review: Review;
};

type useReviewServiceProps = {
    PRIVATE_API: AxiosInstance;
    PUBLIC_API: AxiosInstance;
};

export const useReviewService = ({ PRIVATE_API, PUBLIC_API }: useReviewServiceProps) => {
    const getReviews = useCallback(
        async (reviewRequestParams: GetReviewRequestParams): Promise<GetReviewRequestResponse | ResponseError> => {
            const response = await PUBLIC_API.get(`/review/${reviewRequestParams.product_id}`, {
                params: reviewRequestParams,
            });
            return response.data;
        },
        [PUBLIC_API]
    );

    const addReview = useCallback(
        async (review: Review): Promise<CreateReviewRequestResponse | ResponseError> => {
            const response = await PRIVATE_API.post(`/review/${review.product_id}`, review);
            return response.data;
        },
        [PRIVATE_API]
    );

    const updateReivew = useCallback(
        async (updatedReview: Partial<Review>): Promise<void | ResponseError> => {
            const response = await PRIVATE_API.patch(`/review/${updatedReview.product_id}`, updatedReview);
            return response.data;
        },
        [PRIVATE_API]
    );

    const deleteReview = useCallback(
        async (productId: string, userId: string): Promise<void | ResponseError> => {
            const response = await PRIVATE_API.delete(`/review/${productId}/${userId}`);
            return response.data;
        },
        [PRIVATE_API]
    );

    return { getReviews, addReview, updateReivew, deleteReview };
};
