import { useState, useCallback } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import type { Product, GuestCart } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import useLocalStorage from '@/shared/hooks/useLocalStorage.hook';

type useProductProps = {
    initialProduct?: Product;
    product_id: string;
}

export const useProduct = ({ product_id, initialProduct }: useProductProps) => {
    const [isTriedToAddProduct, setIsTriedToAddProduct] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | undefined>(initialProduct);
    const [currentProductSelectedQuantity, setCurrentProductSelectedQuantity] = useState<number>(1);
    const { productApi, cartApi } = useApi();
    const { auth } = useAuth();
    const [ guestCart, setGuestCart] = useLocalStorage<GuestCart>('cart', {product_ids: [], quantities: []});

    const queryProduct = useCallback(async () => {
        try 
        {
            const response = await productApi.getProduct(product_id);
            if ('message' in response) {
                throw new Error(response.message);
            }
            setCurrentProduct(response.product);
            return response.product;
        }
        catch (error) {
            throw new Error('Failed to fetch product');
        }
    }, [productApi, product_id]);

    const queryAddToCart = useCallback(async () => {
        setIsTriedToAddProduct(true);
            if (auth) {
                try {
                    const response = await cartApi.addProductToCart(product_id, currentProductSelectedQuantity, auth.user.user_id);
                    return response;
                }
                catch (error) {
                    throw new Error('Failed to add product to cart');
                }
            }
            else {
                if (guestCart.product_ids.includes(product_id)) 
                {
                    setGuestCart({product_ids: guestCart.product_ids, quantities: guestCart.quantities.map((quantity, index) => index === guestCart.product_ids.indexOf(product_id) ? quantity + currentProductSelectedQuantity : quantity)});
                }
                else 
                {
                    setGuestCart({product_ids: [...guestCart.product_ids, product_id], quantities: [...guestCart.quantities, currentProductSelectedQuantity]});
                }
                return 'Added to guest cart';
            }

    }, [auth, currentProductSelectedQuantity, cartApi, product_id, guestCart]);

    const increaseProductSelectedQuantity = useCallback(() => {
        setCurrentProductSelectedQuantity(prev => prev + 1);
    }, [])

    const decreaseProductSelectedQuantity = useCallback(() => {
        setCurrentProductSelectedQuantity(prev => Math.max(1, prev - 1));
    }, []);
    
    const {isLoading: isLoadingProduct, isError: isErrorProduct, error: errorProduct, isSuccess: isSuccessProduct} = useQuery({
        queryKey: ['product', product_id], 
        queryFn: queryProduct,
        refetchOnWindowFocus: false,
        retry: false
    });

    const {isLoading: isLoadingAddToCart, isError: isErrorAddToCart, error: errorAddToCart, refetch: addProductToCart, isSuccess: isSuccessAddToCart} = useQuery({
        queryKey: ['cart', product_id],
        queryFn: queryAddToCart,
        refetchOnWindowFocus: false,
        enabled: false,
        retry: false
    });


    return { currentProduct, currentProductSelectedQuantity, increaseProductSelectedQuantity, decreaseProductSelectedQuantity, 
        fetchProductState: {isLoading: isLoadingProduct, isError: isErrorProduct, error: errorProduct, isSuccess: isSuccessProduct},
        addToCartState: {isLoading: isLoadingAddToCart, isError: isErrorAddToCart && isTriedToAddProduct, error: errorAddToCart, isSuccess: isSuccessAddToCart}, 
        addProductToCart};
};
