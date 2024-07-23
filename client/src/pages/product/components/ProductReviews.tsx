import { useReviews } from '../hooks/useReviews.hook';
import LoadingAnimation from '@/shared/components/LoadingAnimation';
import { ReviewCard } from '@/shared/components/ReviewCard';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll.hook';
import SortByOptions from '@/shared/components/SortByOptions';
import ReviewCardSkeleton from '@/shared/components/ReviewCardSkeleton';
import ProductCreateReview from './ProductCreateReview';
import type { SortReviewOptions, OrderReviewOptions } from '../Product.types';

type ProductReviewsProps = {
    product_id: string;
};

export const ProductReviews = ({ product_id }: ProductReviewsProps) => {
    const {
        reviews,
        isLoadingFirstReviewPage,
        isLoadingNextReviewPage,
        isLoadingUserReview,
        isErrorLoadingFirstReviewPage,
        isUserReviewNotFound,
        isUserReviewAdded,
        isErrorLoadingUserReview,
        isPendingAddingReview,
        reviewSortOptions,
        updateProductFilter,
        updateProductPage,
        reviewOptions,
        conditionsToFetchNewPage,
        createReview,
        isUserLogged,
    } = useReviews({
        product_id,
    });

    useInfiniteScroll({
        fetchNextPage: updateProductPage,
        threshold: 300,
        conditionsToFetchNewPage: conditionsToFetchNewPage,
    });

    const handleSortByChange = (sortBy: SortReviewOptions) => {
        updateProductFilter({ reviews_sortBy: sortBy });
    };

    const handleOrderChange = (order: OrderReviewOptions) => {
        updateProductFilter({ reviews_order: order });
    };

    const shouldShowCreateUserReviewForm =
        isUserLogged && !isLoadingUserReview && isUserReviewNotFound && !isUserReviewAdded;
    const shouldShowErrorLoadingUserReview =
        isUserLogged && !isLoadingUserReview && !isUserReviewNotFound && isErrorLoadingUserReview;

    return (
        <>
            {shouldShowCreateUserReviewForm && (
                <ProductCreateReview submitReview={createReview} isCreatingReview={isPendingAddingReview} />
            )}
            {shouldShowErrorLoadingUserReview && (
                <p className="text-center text-lg font-semibold text-red-800">Error Loading User Review</p>
            )}
            <div className="mt-4 flex min-h-[vh] flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-xl font-semibold">Reviews</h1>
                    <SortByOptions
                        sortOptions={reviewSortOptions}
                        defaultSelectedSortOption={reviewOptions.reviews_sortBy}
                        defaultSelectedOrderOption={reviewOptions.reviews_order}
                        onOrderOptionChange={handleOrderChange}
                        onSortOptionChange={handleSortByChange}
                    />
                </div>
                {isLoadingFirstReviewPage ? (
                    <div className="grid gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <ReviewCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isErrorLoadingFirstReviewPage ? (
                    <p className="text-center text-lg font-semibold text-red-800">Error Retreving Reviews</p>
                ) : (
                    <>
                        <div className="grid gap-4">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <ReviewCard
                                        key={index}
                                        comment={review.comment}
                                        rating={review.rating}
                                        authorName={review.author.username}
                                        authorAvatar={review.author.avatar}
                                        date={new Date(review.date)}
                                    />
                                ))
                            ) : (
                                <p className="text-lg font-semibold">No reviews yet</p>
                            )}
                        </div>
                        {isLoadingNextReviewPage && <LoadingAnimation />}
                    </>
                )}
            </div>
        </>
    );
};
