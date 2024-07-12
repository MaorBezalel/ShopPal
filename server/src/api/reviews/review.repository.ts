import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { Review } from '@/shared/models/entities';
import {
    GetReviewsRequestProps,
    CreateReviewRequestProps,
    UpdateReviewRequestProps,
    DeleteReviewRequestProps,
} from '@/api/reviews/review.types';

export const ReviewRepository = AppDataSource.getRepository(Review).extend({
    async getReviews({ product_id, limit, offset, sortBy, order }: GetReviewsRequestProps): Promise<Review[]> {
        const query = this.createQueryBuilder('review')
            .where('review.product_id = :product_id', { product_id })
            .take(limit)
            .skip(offset)
            .orderBy(`review.${sortBy}`, order);

        return await query.getMany();
    },

    async insertReview(review: Review): Promise<InsertResult> {
        return await this.createQueryBuilder('review').insert().values(review).execute();
    },

    async updateReview(updatedReviewDetails: UpdateReviewRequestProps): Promise<UpdateResult> {
        const { product_id, user_id } = updatedReviewDetails;
        const updatedReviewDetailsWithCurrentDate = { ...updatedReviewDetails, date: new Date() } as Partial<Review>;

        return await this.createQueryBuilder()
            .update(Review)
            .set(updatedReviewDetailsWithCurrentDate)
            .where('product_id = :product_id', { product_id })
            .andWhere('user_id = :user_id', { user_id })
            .execute();
    },

    async deleteReview({ product_id, user_id }: DeleteReviewRequestProps): Promise<DeleteResult> {
        return await this.createQueryBuilder()
            .delete()
            .from(Review)
            .where('product_id = :product_id', { product_id })
            .andWhere('user_id = :user_id', { user_id })
            .execute();
    },

    async isReviewAlreadyExists({ product_id, user_id }: Pick<Review, 'product_id' | 'user_id'>): Promise<boolean> {
        const query = this.createQueryBuilder('review')
            .where('review.product_id = :product_id', { product_id })
            .andWhere('review.user_id = :user_id', { user_id });

        return (await query.getCount()) > 0;
    },
});
