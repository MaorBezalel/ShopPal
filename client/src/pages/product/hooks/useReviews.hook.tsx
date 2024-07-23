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
    const { reviewApi } = useApi();
    const reviewSortOptions: SortReviewOptions[] = useMemo(() => ['rating', 'date'], []);
    const [reviewOptions, setReviewOptions] = useTypedSearchParams<ReviewQueryParams>(
        {
            reviews_sortBy: 'date',
            reviews_order: 'desc',
        },
        convertURLParamsRepresentationToProductOptions
    );
    const [hasMore, setHasMore] = useState<boolean>(true);

    const queryReviews = useCallback(
        async (reviewOptions: any) => {
            try {
                const response = await reviewApi.getReviews({
                    product_id,
                    limit: reviewOptions.limit,
                    offset: reviewOptions.offset,
                    sortBy: reviewOptions.reviews_sortBy,
                    order: reviewOptions.reviews_order,
                });
                if ('message' in response) {
                    throw new Error(response.message);
                }
                if (response.reviews.length < reviewOptions.limit) {
                    setHasMore(false);
                }
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
        data,
        isLoading: isLoadingReviews,
        isError: isErrorReviews,
        error: errorReviews,
        isSuccess: isSuccessReviews,
        isFetching: isFetchingReviews,
        isInitialLoading: isInitialLoadingReviews,
        goToNextPage,
        resetPage,
        setSaveResults,
    } = usePaginatedQuery('reviews', queryReviews, reviewOptions, 5);

    return {
        reviews: (data || []) as ReviewsWithAuthor,
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
