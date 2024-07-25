
import { useEffect } from 'react';

type useInfiniteScrollProps = {
    fetchNextPage: () => void;
    threshold: number;
    conditionsToFetchNewPage: () => boolean;
    };

export const useInfiniteScroll = ({
    fetchNextPage,
    threshold, 
    conditionsToFetchNewPage}: useInfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold && conditionsToFetchNewPage()) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, threshold, conditionsToFetchNewPage]);
};

