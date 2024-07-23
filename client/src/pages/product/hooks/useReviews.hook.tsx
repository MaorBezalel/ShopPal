import { useState, useCallback, useMemo, useEffect } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import { useMessages } from '@/shared/hooks/useMessages.hook';
import type { ReviewsWithAuthor } from '@/shared/types';
import { useTypedSearchParams } from '@/shared/hooks/useTypedSearchParams.hook';
import type { ReviewQueryParams } from '../Product.types';
import { convertURLParamsRepresentationToProductOptions } from '../utils/ProductUtils';

import type { SortReviewOptions } from '../Product.types';
import { useInfinitePaginatedQuery } from '@/shared/hooks/useInfinitePaginatedQuery.hook';

type useReviewsProps = {
    product_id: string;
};

export const useReviews = ({ product_id }: useReviewsProps) => {
    const { displayMessage } = useMessages();
    const { reviewApi } = useApi();
    const reviewSortOptions: SortReviewOptions[] = useMemo(() => ['rating', 'date'], []);
    const [reviewOptions, setReviewOptions] = useTypedSearchParams<ReviewQueryParams>(
        {
            reviews_sortBy: 'date',
            reviews_order: 'desc',
        },
        convertURLParamsRepresentationToProductOptions
    );

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
                return response.reviews;
            } catch (error) {
                throw new Error('Failed to fetch reviews');
            }
        },
        [reviewApi, product_id]
    );

    const updateProductFilter = useCallback((updatedOptions: Partial<ReviewQueryParams>) => {
        setReviewOptions(updatedOptions);
    }, []);

    const {
        data,
        isLoading,
        isError,
        error,
        isSuccess,
        hasNextPage,
        isFetchingNextPage,
        isFetchNextPageError,
        fetchNextPage,
    } = useInfinitePaginatedQuery('reviews', queryReviews, { product_id, ...reviewOptions }, 5);

    const conditionsToFetchNewPage = useCallback(
        () => !isFetchingNextPage && hasNextPage,
        [isFetchingNextPage, hasNextPage]
    );

    useEffect(() => {
        if (!isFetchingNextPage && isFetchNextPageError) {
            displayMessage({ message: 'Failed to load more reviews', type: 'error' });
        }
    }, [isFetchingNextPage, isFetchNextPageError]);

    return {
        reviews: (data || []) as ReviewsWithAuthor,
        isLoadingNextReviewPage: isFetchingNextPage,
        isErrorLoadingNextReviewPage: isFetchNextPageError,
        isErrorLoadingFirstReviewPage: isError && !isFetchNextPageError,
        error: error,
        isSuccess: isSuccess,
        isLoadingFirstReviewPage: isLoading,
        reviewSortOptions,
        updateProductFilter,
        updateProductPage: fetchNextPage,
        reviewOptions,
        conditionsToFetchNewPage,
    };
};
