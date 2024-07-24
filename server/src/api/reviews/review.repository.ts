import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { Order, Review } from '@/shared/models/entities';
import { Nullable } from '@/shared/types/utils.types';
import type { GetReviewsResponse } from '@/api/reviews/review.types';
import {
    GetReviewsRequestProps,
    CreateReviewRequestProps,
    UpdateReviewRequestProps,
    DeleteReviewRequestProps,
    GetReviewOfUserProps,
    GetReviewOfUserResponse,
} from '@/api/reviews/review.types';
import { OrderProductLink, OrderUserLink } from '@/shared/models/relationships';

export const ReviewRepository = AppDataSource.getRepository(Review).extend({
    async getReviews({
        product_id,
        limit,
        offset,
        sortBy,
        order,
    }: GetReviewsRequestProps): Promise<GetReviewsResponse> {
        return this.createQueryBuilder('review')
            .select([
                'review.product_id',
                'review.user_id',
                'review.rating',
                'review.comment',
                'review.date',
                'userLink.username',
                'userLink.avatar',
            ])
            .where('review.product_id = :product_id', { product_id })
            .innerJoin('review.user', 'userLink')
            .offset(offset)
            .limit(limit)
            .orderBy(`review.${sortBy}`, order)
            .getRawMany()
            .then((reviews) => {
                return reviews.map((review) => ({
                    product_id: review.review_product_id,
                    rating: review.review_rating,
                    comment: review.review_comment,
                    date: review.review_date,
                    author: {
                        user_id: review.review_user_id,
                        username: review.userLink_username,
                        avatar: review.userLink_avatar,
                    },
                }));
            }) as Promise<GetReviewsResponse>;
    },

    async getReviewOfUser({ user_id, product_id }: GetReviewOfUserProps): Promise<GetReviewOfUserResponse> {
        return await AppDataSource.createQueryBuilder()
            .select(['opl.product_id', 'r'])
            .from(Order, 'o')
            .innerJoin(OrderProductLink, 'opl', 'o.order_id = opl.order_id')
            .innerJoin(OrderUserLink, 'oul', 'o.order_id = oul.order_id')
            .leftJoin(Review, 'r', 'r.product_id = opl.product_id AND r.user_id = oul.user_id')
            .where('oul.user_id = :user_id', { user_id })
            .andWhere('opl.product_id = :product_id', { product_id })
            .getRawOne()
            .then((review) => {
                if (!review) return { status: 'no_order' } as GetReviewOfUserResponse;
                if (!review.r_date) return { status: 'no_review' } as GetReviewOfUserResponse;
                return {
                    status: 'review_found',
                    review: {
                        product_id: review.r_product_id,
                        user_id: review.r_user_id,
                        rating: review.r_rating,
                        comment: review.r_comment,
                        date: review.r_date,
                    },
                } as GetReviewOfUserResponse;
            });
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
