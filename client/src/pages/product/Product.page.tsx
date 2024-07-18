import { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { useProduct } from "./hooks/useProduct.hook";

type ProductPageParams = {
    id: string;
}

export const ProductPage = () => {
    const params = useParams<ProductPageParams>();
    const location = useLocation();
    if (!params.id) {
        throw new Error('Product ID is missing');
    }
    const { currentProduct, isLoading, isError, error } = useProduct({ product_id: params.id, product: location.state?.product });


    return (
        <div>
            <h1>Product Page {currentProduct?.title}</h1>
        </div>
    );
}

