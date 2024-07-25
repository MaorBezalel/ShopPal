import { useState, useEffect, useMemo, useCallback } from 'react';
import { Category } from '@/shared/types';
import type { ProductOptions } from '../Products.types';

type useProductFilterProps = {
    onFilterChange: (updatedProductOptions: Partial<ProductOptions>) => void;
    initialFilterOptions?: Partial<ProductOptions>;
};

export const useProductFilter = ({ initialFilterOptions, onFilterChange }: useProductFilterProps) => {
    const resetCategoriesCheckState = useMemo(() => {
        const initialCategoriesState = new Map<Category, boolean>();
        Object.values(Category).forEach((category) => {
            initialCategoriesState.set(category, false);
        });
        return initialCategoriesState;
    }, []);
    const [categoriesCheckState, setCategoriesCheckState] = useState<Map<Category, boolean>>(resetCategoriesCheckState);
    const [minimumRating, setMinimumRating] = useState<number>(0);
    const [minimumPrice, setMinimumPrice] = useState<number>(0);
    const [maximumPrice, setMaximumPrice] = useState<number>(Infinity);
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [brand, setBrand] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const initializeCategoriesCheckState = () => {
            const initialCategoriesState = new Map<Category, boolean>();
            Object.values(Category).forEach((category) => {
                const isCategoryChecked = initialFilterOptions?.categories?.includes(category) ?? false;
                initialCategoriesState.set(category, isCategoryChecked);
            });
            return initialCategoriesState;
        };

        setCategoriesCheckState(initializeCategoriesCheckState);
        setMinimumRating(initialFilterOptions?.minRating ?? 0);
        setMinimumPrice(initialFilterOptions?.minPrice ?? 0);
        setMaximumPrice(initialFilterOptions?.maxPrice ?? Infinity);
        setTitle(initialFilterOptions?.title ?? undefined);
        setBrand(initialFilterOptions?.brand ?? undefined);
    }, []);

    const handleConfirmFilter = useCallback(() => {
        if (minimumPrice > maximumPrice) {
            setError('Minimum price cannot be greater than maximum price');
            return;
        }

        const updatedProductOptions: Partial<ProductOptions> = {
            categories: Object.values(Category).filter((category) => categoriesCheckState.get(category)),
            minRating: minimumRating,
            minPrice: minimumPrice,
            maxPrice: maximumPrice !== Infinity ? maximumPrice : undefined,
            title: title?.trim() !== '' ? title?.trim() : undefined,
            brand: brand?.trim() !== '' ? brand?.trim() : undefined,
        };

        if (updatedProductOptions.categories?.length === 0) {
            updatedProductOptions.categories = undefined;
        }

        setError(undefined);
        onFilterChange(updatedProductOptions);
    }, [minimumPrice, maximumPrice, minimumRating, title, brand, categoriesCheckState]);

    const handleResetFilter = useCallback(() => {
        setCategoriesCheckState(resetCategoriesCheckState);
        setMinimumRating(0);
        setMinimumPrice(0);
        setMaximumPrice(Infinity);
        setTitle(undefined);
        setBrand(undefined);
        setError(undefined);

        onFilterChange({
            categories: undefined,
            minRating: 0,
            minPrice: 0,
            maxPrice: undefined,
            title: undefined,
            brand: undefined,
        });
    }, []);

    const handleCategoryChange = useCallback((category: Category) => {
        setCategoriesCheckState((prev) => {
            const updatedCategoriesCheckState = new Map(prev);
            updatedCategoriesCheckState.set(category, !prev.get(category));
            return updatedCategoriesCheckState;
        });
    }, []);

    return {
        categoriesCheckState,
        minimumRating,
        minimumPrice,
        maximumPrice,
        title,
        brand,
        error,
        handleConfirmFilter,
        handleResetFilter,
        setMinimumRating,
        setCategoriesCheckState: handleCategoryChange,
        setMinimumPrice,
        setMaximumPrice,
        setTitle,
        setBrand,
    };
};
