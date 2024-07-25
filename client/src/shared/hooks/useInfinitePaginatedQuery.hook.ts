import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useInfinitePaginatedQuery = (
    stringKey: string,
    queryFn: (config: any) => Promise<any>,
    filters: object,
    itemsPerPage: number
) => {
    const runQuery = useCallback(
        async ({ pageParam }: { pageParam: number }) => {
            const offset = (pageParam - 1) * itemsPerPage;
            const res = await queryFn({ offset, limit: itemsPerPage, ...filters });
            return res;
        },
        [itemsPerPage, filters]
    );

    const {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        isFetchNextPageError,
        isError,
        error,
        isSuccess,
    } = useInfiniteQuery({
        queryKey: [stringKey, itemsPerPage, filters],
        queryFn: runQuery,
        refetchOnWindowFocus: false,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < itemsPerPage) {
                return undefined;
            }
            return allPages.length + 1;
        },
        staleTime: Infinity,
    });

    const formattedData = useMemo(() => data?.pages.flat() || [], [data]);

    return {
        data: formattedData,
        isLoading,
        isError,
        isSuccess,
        error,
        isFetchNextPageError,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    };
};
