import React, { useMemo, memo, useEffect } from 'react';
import { useState } from 'react';

import type { ProductOptions } from '../Products.types';
import { Category } from '@/shared/types';
import Accordion from '@/shared/components/Accordion';
import { formatCategoryName } from '../utils/ProductUtils';

type ProductFilterProps = {
    onFilterChange: (updatedProductOptions: Partial<ProductOptions>) => void;
    initialFilterOptions?: Partial<ProductOptions>;
    disable: boolean;
    className?: string;
}


const ProductFilter: React.FC<ProductFilterProps> = memo(({ onFilterChange, initialFilterOptions, disable = false, className }: ProductFilterProps) => {
    const resetCategoriesCheckState = useMemo(() => {
        const initialCategoriesState = new Map<Category, boolean>();
        Object.values(Category).forEach((category) => {
            initialCategoriesState.set(category, false);
        });
        return initialCategoriesState
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
        }

        setCategoriesCheckState(initializeCategoriesCheckState);
        setMinimumRating(initialFilterOptions?.minRating ?? 0);
        setMinimumPrice(initialFilterOptions?.minPrice ?? 0);
        setMaximumPrice(initialFilterOptions?.maxPrice ?? Infinity);
        setTitle(initialFilterOptions?.title ?? undefined);
        setBrand(initialFilterOptions?.brand ?? undefined);
    }, []);

    const handleConfirmFilter = () => {

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
            brand: brand?.trim() !== '' ? brand?.trim() : undefined
        }

        if (updatedProductOptions.categories?.length === 0) {
            updatedProductOptions.categories = undefined;
        }

        setError(undefined);
        onFilterChange(updatedProductOptions);
    }

    const handleResetFilter = () => {
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
            brand: undefined
        });
    }

    const handleMinimumRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rating = 5 - parseInt(event.target.value);

        setMinimumRating(rating);
    }

    const handleSelectedCategoriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const category = event.target.value as Category;

        setCategoriesCheckState((prev) => {
            const updatedCategoriesCheckState = new Map(prev);
            updatedCategoriesCheckState.set(category, !prev.get(category));
            return updatedCategoriesCheckState;
        });
    };

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseInt(event.target.value);
        setMinimumPrice(price);
    }

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseInt(event.target.value);
        setMaximumPrice(price);
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(event.target.value);
    }


    return (
        <div className={`flex flex-col gap-2 bg-secondary-50 border border-primary-100 rounded-lg shadow-lg p-4 ${className}`}>
            <h2 className='text-lg font-semibold text-center border-b-secondary-200 pb-1 border-b-[1px]'>Search By</h2>

            <Accordion title={'Title'}>
                <input type='text' name='Title' placeholder='Airpods...' className='bg-transparent border border-secondary-200 w-full p-1 mt-2 placeholder-black px-2 text-sm outline-none' onChange={handleTitleChange} value={title === undefined ? '' : title}/>
            </Accordion>

            <Accordion title={'Brand'}>
                <input type='text' name='Brand' placeholder='Apple...' className='bg-transparent border border-secondary-200 w-full p-1 mt-2 placeholder-black px-2 text-sm outline-none' onChange={handleBranchChange} value={brand === undefined ? '' : brand}/>
            </Accordion>

            <h2 className='text-lg font-semibold text-center border-b-secondary-200 pb-1 border-b-[1px]'>Filter By</h2>
            <Accordion title={'Category'}>
                <div className='max-h-64 overflow-y-scroll flex flex-col gap-2 mt-2' style={{scrollbarWidth: 'thin', scrollbarColor: '#f2a6c3 #fce9f0'}}>
                    {Object.values(Category).map((category) => (
                        <div className='flex flex-row gap-2 items-center' key={category}> 
                            <input type='checkbox' name='Category' value={category} onChange={handleSelectedCategoriesChange} checked={categoriesCheckState.get(category)} className='peer relative appearance-none w-3 h-3 
                          border border-secondary-200 rounded-md
                          cursor-pointer
                          checked:bg-secondary-200'/>
                            <label>{formatCategoryName(category)}</label>
                        </div>
                    ))}
                </div>
            </Accordion>

            <Accordion title={'Range'}>
                <div className='mt-2'>
                    <label>Between</label>
                    <input type='number' className='
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    bg-transparent border border-secondary-200 w-full p-1 my-2 placeholder-black px-2 text-sm outline-none' placeholder={"0"} onChange={handleMinPriceChange} value={minimumPrice}/>
                    <label>And</label>
                    <input type='number' className='
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    bg-transparent border border-secondary-200 w-full p-1 mt-2 placeholder-black px-2 text-sm outline-none' placeholder={"Infinity"} onChange={handleMaxPriceChange} value={maximumPrice === Infinity ? '' : maximumPrice}/>
                </div>
            </Accordion>


            <Accordion title={'Rating'}>
                <div className='mt-2'>
                    <label>{minimumRating}-5</label><br/>
                    <input type='range' min='0' max='5' step='1' value={5 - minimumRating} className='mt-2 w-full transform rotate-180 appearance-none bg-secondary-200 h-2 rounded-md' onChange={handleMinimumRatingChange}/>
                </div>
            </Accordion>


            <div className='flex flex-row justify-between'>
                <button className='bg-secondary-200 px-2 py-1 rounded-md text-sm font-semibold' onClick={handleConfirmFilter} disabled={disable}>Confirm</button>
                <button className='bg-secondary-200 px-3 py-1 rounded-md text-sm font-semibold' onClick={handleResetFilter} disabled={disable}>Reset</button>
            </div>

            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    );
});

export default ProductFilter;