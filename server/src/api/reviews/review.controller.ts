import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '@/api/reviews/review.service';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';
import {
    GetReviewsRequestProps,
    CreateReviewRequestProps,
    UpdateReviewRequestProps,
    DeleteReviewRequestProps,
} from '@/api/reviews/review.types';

export class ReviewController {
    public static async getReviews(req: Request, res: Response, next: NextFunction) {
        const reviewsQuery = req.body as GetReviewsRequestProps;
        const reviews = await ReviewService.getReviews(reviewsQuery);
        res.status(HttpStatusCode.OK).json({ reviews });
    }

    public static async createReview(req: Request, res: Response, next: NextFunction) {
        const newReview = req.body as CreateReviewRequestProps;
        const createdReview = await ReviewService.createReview(newReview);
        res.status(HttpStatusCode.CREATED).json({ review: createdReview });
    }

    public static async updateReview(req: Request, res: Response, next: NextFunction) {
        const updatedReviewDetails = req.body as UpdateReviewRequestProps;
        await ReviewService.updateReview(updatedReviewDetails);
        res.status(HttpStatusCode.NO_CONTENT).json();
    }

    public static async deleteReview(req: Request, res: Response, next: NextFunction) {
        const deleteReviewDetails = req.body as DeleteReviewRequestProps;
        await ReviewService.deleteReview(deleteReviewDetails);
        res.status(HttpStatusCode.NO_CONTENT).json();
    }
}
