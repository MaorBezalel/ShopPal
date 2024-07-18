import { useState, useEffect } from 'react';
import { useApi } from '@/shared/hooks/useApi.hook';
import type { Product } from '@/shared/types';

type useProductProps = {
    product?: Product;
    product_id: string;
}

export const useProduct = ({ product_id, product } : useProductProps) => {

    const [currentProduct, setCurrentProduct] = useState<Product | undefined>(product);
    const { productApi } = useApi();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const response = await productApi.getProduct(product_id);
                if ('message' in response) {
                    throw new Error(response.message);
                }
                setCurrentProduct(response.product);
            }
            catch (error) {
                setIsError(true);
                setError((error as Error).message || 'Failed to fetch product');
            }
            finally {
                setIsLoading(false);
            }
        }
        if (product) 
        {
            setCurrentProduct(product);
        }
        else
        {
            fetchProduct();
        }
    }, []);

    return { currentProduct, isLoading, isError, error };
};

