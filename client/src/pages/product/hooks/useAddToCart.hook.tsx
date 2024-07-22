import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useApi } from '@/shared/hooks/useApi.hook';
import useLocalStorage from '@/shared/hooks/useLocalStorage.hook';
import type { GuestCart } from '@/shared/types';

type UseAddToCartProps = {
    product_id: string;
};

export const useAddToCart = ({ product_id }: UseAddToCartProps) => {
    const [isTriedToAddProduct, setIsTriedToAddProduct] = useState<boolean>(false);
    const [currentProductSelectedQuantity, setCurrentProductSelectedQuantity] = useState(1);
    const { cartApi } = useApi();
    const { auth } = useAuth();
    const [guestCart, setGuestCart] = useLocalStorage<GuestCart>('cart', { product_ids: [], quantities: [] });

    const increaseProductSelectedQuantity = useCallback(() => {
        setCurrentProductSelectedQuantity((prev) => prev + 1);
    }, []);

    const decreaseProductSelectedQuantity = useCallback(() => {
        setCurrentProductSelectedQuantity((prev) => Math.max(prev - 1, 1));
    }, []);

    const queryAddToCart = useCallback(async () => {
        setIsTriedToAddProduct(true);
        if (auth) {
            try {
                const response = await cartApi.addProductToCart(
                    product_id,
                    currentProductSelectedQuantity,
                    auth.user.user_id
                );
                return response;
            } catch (error) {
                throw new Error('Failed to add product to cart');
            }
        } else {
            if (guestCart.product_ids.includes(product_id)) {
                setGuestCart({
                    product_ids: guestCart.product_ids,
                    quantities: guestCart.quantities.map((quantity, index) =>
                        index === guestCart.product_ids.indexOf(product_id)
                            ? quantity + currentProductSelectedQuantity
                            : quantity
                    ),
                });
            } else {
                setGuestCart({
                    product_ids: [...guestCart.product_ids, product_id],
                    quantities: [...guestCart.quantities, currentProductSelectedQuantity],
                });
            }
            return 'Added to guest cart';
        }
    }, [auth, cartApi, currentProductSelectedQuantity, product_id, guestCart]);

    const {
        isLoading: isLoadingAddToCart,
        isFetching: isFetchingAddToCart,
        isError: isErrorAddToCart,
        error: errorAddToCart,
        isSuccess: isSuccessAddToCart,
        refetch: addToCart,
    } = useQuery({
        queryKey: ['addToCart', product_id],
        queryFn: queryAddToCart,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: false,
    });

    return {
        currentProductSelectedQuantity,
        increaseProductSelectedQuantity,
        decreaseProductSelectedQuantity,
        isLoadingAddToCart,
        isErrorAddToCart,
        errorAddToCart,
        isSuccessAddToCart,
        isFetchingAddToCart,
        addToCart,
    };
};
