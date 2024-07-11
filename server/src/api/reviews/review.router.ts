import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { ReviewController } from '@/api/reviews/review.controller';
import { validationMiddleware, authorizationMiddleware, tryCatchMiddleware } from '@/middlewares';
import {
    getReviewsSchema,
    createReviewSchema,
    updateReviewSchema,
    deleteReviewSchema,
} from '@/api/reviews/review.validator';

const router = Router();

router.get(
    '/:product_id',
    checkSchema(getReviewsSchema),
    validationMiddleware,
    tryCatchMiddleware(ReviewController.getReviews)
);

router.post(
    '/:product_id',
    authorizationMiddleware,
    checkSchema(createReviewSchema),
    validationMiddleware,
    tryCatchMiddleware(ReviewController.createReview)
);

router.patch(
    '/:product_id',
    authorizationMiddleware,
    checkSchema(updateReviewSchema),
    validationMiddleware,
    tryCatchMiddleware(ReviewController.updateReview)
);

router.delete(
    '/:product_id',
    authorizationMiddleware,
    checkSchema(deleteReviewSchema),
    validationMiddleware,
    tryCatchMiddleware(ReviewController.deleteReview)
);

export default router;
