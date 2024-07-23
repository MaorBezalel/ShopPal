import { useParams, useLocation } from 'react-router';
import { useProduct } from './hooks/useProduct.hook';
import { ProductDetails } from './components/ProductDetails';
import { ProductReviews } from './components/ProductReviews';
import { ProductSimilarResults } from './components/ProductSimilarResults';
import { ImageSlider } from '@/shared/components/ImageSlider';
import LoadingAnimation from '@/shared/components/LoadingAnimation';
import { useMessages } from '@/shared/hooks/useMessages.hook';
import { useNavigate } from 'react-router';
import Test from './components/Test';

type ProductPageParams = {
    id: string;
};

export const ProductPage = () => {
    const params = useParams<ProductPageParams>();
    const location = useLocation();
    const navigate = useNavigate();
    const { displayMessage } = useMessages();
    if (!params.id) {
        displayMessage({ message: 'id not found', type: 'error' });
        navigate('/404');
        return;
    }
    const { currentProduct, fetchProductState } = useProduct({
        product_id: params.id,
        initialProduct: location.state?.product,
    });

    if (!currentProduct && fetchProductState.isLoading) {
        return (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <LoadingAnimation />
            </div>
        );
    }

    if (fetchProductState.isError) {
        return null;
    }

    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="m-4">
                <div className="flex flex-col justify-between gap-16 lg:flex-row lg:items-center lg:justify-center">
                    <div className="flex flex-col gap-6 lg:w-2/5">
                        <ImageSlider images={currentProduct?.images} className="h-[50vh]" />
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto lg:w-3/5">
                        <ProductDetails product={currentProduct!} />
                    </div>
                </div>
                <ProductSimilarResults product={currentProduct!} />
                <ProductReviews product_id={currentProduct!.product_id} />
            </div>
        </div>
    );
};
