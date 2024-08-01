import { useState, useCallback, useMemo, useEffect } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import { useMessages } from '@/shared/hooks/useMessages.hook';
import type { Review, ReviewsWithAuthor } from '@/shared/types';
import { useTypedSearchParams } from '@/shared/hooks/useTypedSearchParams.hook';
import type { ReviewQueryParams } from '../Product.types';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { convertURLParamsRepresentationToProductOptions } from '../utils/ProductUtils';

import type { SortReviewOptions } from '../Product.types';
import { useInfinitePaginatedQuery } from '@/shared/hooks/useInfinitePaginatedQuery.hook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ResponseError } from '@/shared/types/api.types';
import type { CreateReviewRequestResponse } from '@/shared/services/review.service';
import type { CreateReviewFormFields } from '../components/ProductCreateReview';

type useReviewsProps = {
    product_id: string;
};

export const useReviews = ({ product_id }: useReviewsProps) => {
    const queryClient = useQueryClient();
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
    const { auth } = useAuth();

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

    const queryReviewOfUser = useCallback(async () => {
        try {
            const response = await reviewApi.getReviewOfUser(product_id, auth?.user.user_id!);
            if ('message' in response) {
                throw new Error(response.message);
            }
            setUserReviewStatus(response.review.status);
            return response.review;
        } catch (error) {
            setUserReviewStatus('error');
            throw new Error('Failed to fetch user review');
        }
    }, [reviewApi, product_id, auth]);

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

    const { data: userReview, isLoading: isLoadingUserReview } = useQuery({
        queryKey: ['reviewOfUser', product_id, auth?.user.user_id!],
        queryFn: queryReviewOfUser,
        enabled: !!auth?.user,
        refetchOnWindowFocus: false,
        staleTime: 0,
        retry: false,
    });

    const {
        mutate: addReviewMutation,
        isError: isErrorAddingReview,
        isPending: isPendingAddingReview,
    } = useMutation({
        mutationFn: (userReview: Review) => reviewApi.addReview(userReview),
        onSuccess: (response: CreateReviewRequestResponse | ResponseError) => {
            if ('message' in response) {
                displayMessage({ message: response.message, type: 'error' });
            } else {
                displayMessage({ message: 'Review added successfully', type: 'success' });
                setIsUserReviewAdded(true);
                queryClient.setQueryData(['reviews', 5, { product_id, ...reviewOptions }], (prev: any) => {
                    const formattedResponse = {
                        comment: response.review.comment,
                        date: response.review.date,
                        rating: response.review.rating,
                        product_id: response.review.product_id,
                        author: {
                            user_id: auth?.user.user_id!,
                            username: auth?.user.username!,
                            avatar: auth?.user.avatar,
                        },
                    };
                    return {
                        pages: [[formattedResponse, ...prev.pages[0]], ...prev.pages.slice(1)],
                        pageParams: prev.pageParams,
                    };
                });
            }
        },
    });

    const conditionsToFetchNewPage = useCallback(
        () => !isFetchingNextPage && hasNextPage,
        [isFetchingNextPage, hasNextPage]
    );

    useEffect(() => {
        if (!isFetchingNextPage && isFetchNextPageError) {
            displayMessage({ message: 'Failed to load more reviews', type: 'error' });
        }
    }, [isFetchingNextPage, isFetchNextPageError]);

    useEffect(() => {
        if (!isPendingAddingReview && isErrorAddingReview) {
            displayMessage({ message: 'Failed to add review', type: 'error' });
        }
    }, [isPendingAddingReview, isErrorAddingReview]);

    const createReview = useCallback(async (reviewProps: CreateReviewFormFields) => {
        addReviewMutation({
            product_id,
            user_id: auth?.user.user_id!,
            rating: reviewProps.rating,
            comment: reviewProps.comment,
            date: new Date(Date.now()),
        });
    }, []);

    const [userReviewStatus, setUserReviewStatus] = useState(
        'no_order' as 'no_order' | 'no_review' | 'review_found' | 'error'
    );
    const [isUserReviewAdded, setIsUserReviewAdded] = useState(false);

    return {
        reviews: (data || []) as ReviewsWithAuthor,
        isLoadingNextReviewPage: isFetchingNextPage,
        isLoadingUserReview: isLoadingUserReview,
        isPendingAddingReview: isPendingAddingReview,
        isErrorAddingReview: isErrorAddingReview,
        userReviewStatus: userReviewStatus,
        isUserReviewAdded: isUserReviewAdded,
        isErrorLoadingNextReviewPage: isFetchNextPageError,
        isErrorLoadingFirstReviewPage: isError && !isFetchNextPageError,
        isUserLogged: !!auth?.user,
        error: error,
        isSuccess: isSuccess,
        isLoadingFirstReviewPage: isLoading,
        reviewSortOptions,
        updateProductFilter,
        updateProductPage: fetchNextPage,
        userReview: userReview,
        reviewOptions,
        conditionsToFetchNewPage,
        createReview,
    };
};
