import { API } from '.';
import type { Review } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';

type getReviewRequestResponse = {
    reviews: Review[];
};

type createReviewRequestResponse = {
    review: Review;
};
