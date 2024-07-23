import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

export const usePaginatedQuery = (
    stringKey: string,
    queryFn: (config: any) => Promise<any>,
    filters: object,
    itemsPerPageInit?: number
) => {
    const [data, setData] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageInit || 20);
    const [saveResults, setSaveResults] = useState(false);
    const offset = useMemo(() => (page - 1) * itemsPerPage, [itemsPerPage, page]);

    const runQuery = useCallback(async () => {
        const res = await queryFn({ offset, limit: itemsPerPage, ...filters });
        if (saveResults) {
            setData((prev: any) => (prev ? [...prev, ...res] : res));
        } else {
            setData(res);
        }
        return res;
    }, [itemsPerPage, saveResults, page, filters, offset]);

    const { isLoading, isError, error, isFetching, isSuccess } = useQuery({
        queryKey: [stringKey, page, itemsPerPage, filters],
        queryFn: runQuery,
        refetchOnWindowFocus: false,
    });

    const goToNextPage = useCallback(() => setPage((prevPage) => prevPage + 1), []);
    const goToPreviousPage = useCallback(() => setPage((prevPage) => Math.max(prevPage - 1, 1)), []);
    const resetPage = useCallback(() => setPage(1), []);
    const setPageSize = useCallback((size: number) => setItemsPerPage(size), []);

    return {
        data,
        page,
        itemsPerPage,
        isInitialLoading: isFetching && page === 1,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
        goToNextPage,
        goToPreviousPage,
        setPageSize,
        resetPage,
        setSaveResults,
    };
};
