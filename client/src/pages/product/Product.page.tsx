import { useParams, useLocation } from "react-router";
import { useProduct } from "./hooks/useProduct.hook";
import { ProductDetails } from "./components/ProductDetails";
import { ImageSlider } from "@/shared/components/ImageSlider";
import LoadingAnimation from "@/shared/components/LoadingAnimation";
import Message from "@/shared/components/Message";

type ProductPageParams = {
    id: string;
}

export const ProductPage = () => {
    const params = useParams<ProductPageParams>();
    const location = useLocation();
    if (!params.id) {
        return (<Message message="Product not found" type="error"/>);
    }
    const { currentProduct, fetchProductState, addToCartState, addProductToCart, currentProductSelectedQuantity, increaseProductSelectedQuantity, decreaseProductSelectedQuantity } = useProduct({ product_id: params.id, initialProduct: location.state?.product });
    
    const handleAddToCartClick = () => {
        addProductToCart();
    }

    if (fetchProductState.isLoading) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <LoadingAnimation />
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center m-4">
                <div className="flex flex-col gap-6 lg:w-2/5">
                    <ImageSlider images={currentProduct?.images}/>
                </div>
                <div className="flex flex-col gap-4 lg:w-3/5">
                    <ProductDetails title={currentProduct?.title} description={currentProduct?.description} price={currentProduct?.price}
                        rating={currentProduct?.rating} category={currentProduct?.category}
                        stock={currentProduct?.stock}/>
                    <div className="flex flex-col gap-12 sm:flex-row sm:items-center">
                        <div className="flex flex-row items-center">
                            <button className="bg-primary-100 py-2 px-5 rounded-lg" onClick={decreaseProductSelectedQuantity} disabled={currentProductSelectedQuantity <= 1}>-</button>
                            <span className="py-4 px-6 rounded-lg">{currentProductSelectedQuantity}</span>
                            <button className="bg-primary-100 py-2 px-4 rounded-lg" onClick={increaseProductSelectedQuantity}>+</button>
                        </div>
                        <button className="bg-primary-100 font-semibold py-3 px-16 rounded-xl h-full flex justify-center items-center" onClick={handleAddToCartClick} disabled={addToCartState.isLoading}>{addToCartState.isLoading ? 'Adding...' : 'Add to Cart'}</button>
                    </div>
                </div>
            </div>
            {addToCartState.isSuccess && <Message message={'Product added to cart successfully'} type="success"/>}
            {addToCartState.isError && <Message message={addToCartState.error?.message} type="error"/>}
        </div>
    );
}