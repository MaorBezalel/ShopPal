import { Router } from 'express';
import { UserRepository } from '../users/user.repository';
// import {
//     getReviewsSchema, // no needing for auth
//     createReviewSchema, // need auth
//     updateReviewSchema, // need auth
//     deleteReviewSchema, // need auth
// } from '@/api/reviews/review.validator';

const router = Router();

// all reviews (for single product) routes
// get query params:
// - limit: number of reviews to return
// - offset: number of reviews to skip
// - sortBy: sort reviews by field (by: 'rating', 'created_at')
// - order: order of sorting (asc, desc)
router.get('/:product_id');
router.post('/:product_id');
router.put('/:product_id');
router.delete('/:product_id');

export default router;
