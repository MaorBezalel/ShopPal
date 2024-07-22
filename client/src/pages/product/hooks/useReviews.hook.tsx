import { useState, useCallback, useMemo } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import type { ReviewsWithAuthor } from '@/shared/types';
import { useTypedSearchParams } from '@/shared/hooks/useTypedSearchParams.hook';
import type { ReviewQueryParams } from '../Product.types';
import { convertURLParamsRepresentationToProductOptions } from '../utils/ProductUtils';
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery.hook';

import type { SortReviewOptions } from '../Product.types';

type useReviewsProps = {
    product_id: string;
};

export const useReviews = ({ product_id }: useReviewsProps) => {
    const [reviews, setReviews] = useState<ReviewsWithAuthor>([]);
    const { reviewApi } = useApi();
    const reviewSortOptions: SortReviewOptions[] = useMemo(() => ['rating', 'date'], []);
    const [reviewOptions, setReviewOptions] = useTypedSearchParams<ReviewQueryParams>(
        {
            reviews_sortBy: 'date',
            reviews_order: 'desc',
            reviews_limit: 5,
            reviews_offset: 0,
        },
        convertURLParamsRepresentationToProductOptions
    );
    const [hasMore, setHasMore] = useState<boolean>(true);

    const queryReviews = useCallback(
        async (reviewOptions: ReviewQueryParams) => {
            try {
                const response = await reviewApi.getReviews({
                    product_id,
                    limit: reviewOptions.reviews_limit,
                    offset: reviewOptions.reviews_offset,
                    sortBy: reviewOptions.reviews_sortBy,
                    order: reviewOptions.reviews_order,
                });
                if ('message' in response) {
                    throw new Error(response.message);
                }
                if (response.reviews.length < reviewOptions.reviews_limit) {
                    setHasMore(false);
                }
                setReviews(response.reviews);
                return response.reviews;
            } catch (error) {
                throw new Error('Failed to fetch reviews');
            }
        },
        [reviewApi, product_id]
    );

    const updateProductFilter = useCallback((updatedOptions: Partial<ReviewQueryParams>) => {
        setReviewOptions(updatedOptions);
        resetPage();
        setSaveResults(false);
        setHasMore(true);
    }, []);

    const updateProductPage = useCallback(() => {
        goToNextPage();
        setSaveResults(true);
    }, []);

    const {
        isLoading: isLoadingReviews,
        isError: isErrorReviews,
        error: errorReviews,
        isSuccess: isSuccessReviews,
        isFetching: isFetchingReviews,
        isInitialLoading: isInitialLoadingReviews,
        goToNextPage,
        resetPage,
        setSaveResults,
    } = usePaginatedQuery('reviews', queryReviews, reviewOptions);

    return {
        reviews,
        isLoading: isLoadingReviews,
        isFetching: isFetchingReviews,
        isError: isErrorReviews,
        error: errorReviews,
        isSuccess: isSuccessReviews,
        isInitialLoading: isInitialLoadingReviews,
        reviewSortOptions,
        updateProductFilter,
        updateProductPage,
        goToNextPage,
        reviewOptions,
        hasMore,
    };
};
