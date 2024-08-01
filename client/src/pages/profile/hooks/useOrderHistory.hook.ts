import { useEffect, useCallback } from 'react';
import { useAuth, useInfinitePaginatedQuery, useMessages, useApi } from '@/shared/hooks';

export function useOrderHistory() {
    const { displayMessage } = useMessages();
    const { orderApi } = useApi();
    const { auth } = useAuth();

    const fetchOrders = useCallback(
        async ({ offset, limit }: { offset: number; limit: number }) => {
            try {
                const response = await orderApi.getUserOrders(auth!.user.user_id, limit, offset);
                if ('message' in response) {
                    throw new Error(response.message);
                }
                return response;
            } catch (error) {
                throw new Error('Failed to fetch orders');
            }
        },
        [orderApi]
    );

    const {
        data: data,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        isFetchNextPageError,
        error,
        fetchNextPage,
    } = useInfinitePaginatedQuery('orders', fetchOrders, { userId: auth?.user.user_id }, 10);

    const conditionsToFetchNewPage = useCallback(
        () => !isFetchingNextPage && hasNextPage,
        [isFetchingNextPage, hasNextPage]
    );

    useEffect(() => {
        if (!isFetchingNextPage && isFetchNextPageError) {
            displayMessage({ message: 'Failed to load more orders', type: 'error' });
        }
    }, [isFetchingNextPage, isFetchNextPageError]);

    return {
        orders: data,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        isFetchNextPageError,
        error,
        fetchNextPage,
        conditionsToFetchNewPage,
    };
}
