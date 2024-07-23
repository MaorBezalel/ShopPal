import UUID from 'crypto';
import { ReviewRepository } from '@/api/reviews/review.repository';
import { Review } from '@/shared/models/entities';
import AppError from '@/shared/exceptions/app-error';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';
import {
    GetReviewsRequestProps,
    CreateReviewRequestProps,
    UpdateReviewRequestProps,
    DeleteReviewRequestProps,
    GetReviewOfUserProps,
    GetReviewsResponse,
} from '@/api/reviews/review.types';

export class ReviewService {
    public static async getReviews({
        product_id,
        limit,
        offset,
        sortBy,
        order,
    }: GetReviewsRequestProps): Promise<GetReviewsResponse> {
        return await ReviewRepository.getReviews({ product_id, limit, offset, sortBy, order });
    }

    public static async getReviewOfUser({ user_id, product_id }: GetReviewOfUserProps): Promise<Review> {
        const reviewOfUser = await ReviewRepository.getReviewOfUser({ user_id, product_id });

        if (!reviewOfUser) {
            throw new AppError('Review not found', HttpStatusCode.NOT_FOUND, 'getReviewOfUser');
        }

        return reviewOfUser;
    }

    public static async createReview(reviewToCreate: CreateReviewRequestProps): Promise<Review> {
        const isReviewExist = await ReviewRepository.isReviewAlreadyExists(reviewToCreate);

        if (isReviewExist) {
            throw new AppError('User has already reviewed this product!', HttpStatusCode.CONFLICT, 'createReview');
        }

        const reviewWithCurrentDate = { ...reviewToCreate, date: new Date() } as Review;
        await ReviewRepository.insertReview(reviewWithCurrentDate);

        return reviewWithCurrentDate;
    }

    public static async updateReview(updatedReviewDetails: UpdateReviewRequestProps): Promise<void> {
        const result = await ReviewRepository.updateReview(updatedReviewDetails);

        if (result.affected === 0) {
            throw new AppError('Could not update review, review not found', HttpStatusCode.NOT_FOUND, 'updateReview');
        }
    }

    public static async deleteReview(deleteReviewDetails: DeleteReviewRequestProps): Promise<void> {
        const result = await ReviewRepository.deleteReview(deleteReviewDetails);

        if (result.affected === 0) {
            throw new AppError('Could not delete review, review not found', HttpStatusCode.NOT_FOUND, 'deleteReview');
        }
    }
}
