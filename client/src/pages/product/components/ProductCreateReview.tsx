import { SubmitHandler, useForm } from 'react-hook-form';
import star from '@/assets/photos/star.png';
import { ratingToString } from '@/shared/utils';

export type CreateReviewFormFields = {
    rating: number;
    comment: string;
};

type ProductCreateReviewProps = {
    submitReview: (data: CreateReviewFormFields) => Promise<void>;
    isCreatingReview: boolean;
};

export const ProductCreateReview = ({ submitReview, isCreatingReview }: ProductCreateReviewProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateReviewFormFields>();

    const commentLength = watch('comment')?.length || 0;
    const rating = watch('rating') || 0;

    const onSubmit: SubmitHandler<CreateReviewFormFields> = async (data) => {
        submitReview(data);
    };

    return (
        <div className="mt-4">
            <h1 className="text-xl font-semibold">Add Your Own Review</h1>
            <h2 className="text-md font-semibold">Since you recently bought this product, tell us about it!</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-2 flex flex-col gap-8 rounded-lg border border-primary-200 bg-slate-100 p-4"
            >
                <div className="flex flex-row flex-wrap items-center gap-1">
                    <label
                        htmlFor="rating"
                        className="text-md mr-8 font-semibold"
                    >
                        Rating
                    </label>
                    {[1, 2, 3, 4, 5].map((ratingValue) => (
                        <div
                            key={ratingValue}
                            className="flex flex-row items-center justify-center"
                        >
                            <img
                                src={star}
                                className={`h-6 w-6 ${ratingValue <= rating ? '' : 'opacity-50'}`}
                            />
                            <input
                                className="absolute h-6 w-6 opacity-0"
                                {...register('rating', {
                                    required: 'Rating is required',
                                })}
                                type="radio"
                                value={ratingValue}
                                id={`rating-${ratingValue}`}
                                name="rating"
                            />
                        </div>
                    ))}
                    <div className="ml-3">{rating !== 0 && ratingToString(rating)}</div>
                </div>
                <div className="relative flex w-3/5 flex-row gap-1 max-md:w-5/6">
                    <label
                        htmlFor="comment"
                        className="text-md mr-3 font-semibold"
                    >
                        Comment
                    </label>
                    <textarea
                        className="w-full resize-none rounded-md border border-primary-200 bg-white p-2 outline-none"
                        {...register('comment', {
                            required: 'Comment is required',
                            maxLength: {
                                value: 100,
                                message: 'Comment cannot exceed 100 characters',
                            },
                        })}
                        id="comment"
                    />
                    <span
                        className={`${commentLength >= 100 ? 'font-bold text-red-800' : ''} absolute bottom-0 right-0`}
                        style={{ transform: 'translateX(calc(100% + .5rem))' }}
                    >
                        {`${commentLength}/100`}
                    </span>
                </div>
                {errors.rating && <span className="font-semibold text-red-800">{errors.rating.message}</span>}
                {errors.comment && <span className="font-semibold text-red-800">{errors.comment.message}</span>}
                {errors.root && <span className="font-semibold text-red-800">{errors.root.message}</span>}
                <button
                    type="submit"
                    disabled={isCreatingReview}
                    className="mx-auto w-32 rounded-lg bg-primary-200 p-0.5 font-semibold"
                >
                    {isCreatingReview ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ProductCreateReview;
