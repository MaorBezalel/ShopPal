import React from 'react';
import { useProductFilter } from '../hooks/useProductFilter.hook';

import type { ProductOptions } from '../Products.types';
import { Category } from '@/shared/types';
import Accordion from '@/shared/components/Accordion';
import { formatCategoryName } from '../utils/ProductUtils';
import minusSvg from '@/assets/svgs/minus.svg';
import plusSvg from '@/assets/svgs/plus.svg';

type ProductFilterProps = {
    onFilterChange: (updatedProductOptions: Partial<ProductOptions>) => void;
    initialFilterOptions?: Partial<ProductOptions>;
    disable: boolean;
    className?: string;
};

const ProductFilter: React.FC<ProductFilterProps> = ({
    onFilterChange,
    initialFilterOptions,
    disable = false,
    className,
}: ProductFilterProps) => {
    const {
        categoriesCheckState,
        minimumRating,
        minimumPrice,
        maximumPrice,
        title,
        brand,
        error,
        handleConfirmFilter,
        handleResetFilter,
        setCategoriesCheckState,
        setMinimumRating,
        setMinimumPrice,
        setMaximumPrice,
        setTitle,
        setBrand,
    } = useProductFilter({ initialFilterOptions, onFilterChange });

    const handleMinimumRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rating = 5 - parseInt(event.target.value);
        setMinimumRating(rating);
    };

    const handleSelectedCategoriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const category = event.target.value as Category;
        setCategoriesCheckState(category);
    };

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseInt(event.target.value);
        setMinimumPrice(price);
    };

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseInt(event.target.value);
        setMaximumPrice(price);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(event.target.value);
    };

    const accordionButton = (title: string) => (isOpen: boolean) => (
        <button className="flex w-full items-center justify-between">
            <span>{title}</span>
            <span>
                <img
                    className="h-3 w-3"
                    src={isOpen ? minusSvg : plusSvg}
                    alt="Toggle Icon"
                />
            </span>
        </button>
    );

    return (
        <div
            className={`flex flex-col gap-2 rounded-lg border border-primary-100 bg-slate-100 p-4 shadow-lg ${className}`}
        >
            <h2 className="border-b-[1px] border-b-primary-200 pb-1 text-center text-lg font-semibold">Search By</h2>

            <Accordion
                accordionStyles="p-2"
                accordionButton={accordionButton('Title')}
            >
                <input
                    type="text"
                    name="Title"
                    placeholder="Airpods..."
                    className="mt-2 w-full border border-primary-200 bg-transparent p-1 px-2 text-sm placeholder-black outline-none"
                    onChange={handleTitleChange}
                    value={title === undefined ? '' : title}
                />
            </Accordion>

            <Accordion
                accordionStyles="p-2"
                accordionButton={accordionButton('Brand')}
            >
                <input
                    type="text"
                    name="Brand"
                    placeholder="Apple..."
                    className="mt-2 w-full border border-primary-200 bg-transparent p-1 px-2 text-sm placeholder-black outline-none"
                    onChange={handleBranchChange}
                    value={brand === undefined ? '' : brand}
                />
            </Accordion>

            <h2 className="border-b-[1px] border-b-primary-200 pb-1 text-center text-lg font-semibold">Filter By</h2>
            <Accordion
                accordionStyles="p-2"
                accordionButton={accordionButton('Category')}
            >
                <div
                    className="mt-2 flex max-h-64 flex-col gap-2 overflow-y-scroll"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: '#acb6ec #d6daf5' }}
                >
                    {Object.values(Category).map((category) => (
                        <div
                            className="flex flex-row items-center gap-2"
                            key={category}
                        >
                            <input
                                type="checkbox"
                                name="Category"
                                value={category}
                                onChange={handleSelectedCategoriesChange}
                                checked={categoriesCheckState.get(category)}
                                className="peer relative h-3 w-3 cursor-pointer appearance-none rounded-md border border-primary-200 checked:bg-primary-200"
                            />
                            <label>{formatCategoryName(category)}</label>
                        </div>
                    ))}
                </div>
            </Accordion>

            <Accordion
                accordionStyles="p-2"
                accordionButton={accordionButton('Price')}
            >
                <div className="mt-2">
                    <label>Between</label>
                    <input
                        type="number"
                        className="my-2 w-full border border-primary-200 bg-transparent p-1 px-2 text-sm placeholder-black outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder={'0'}
                        onChange={handleMinPriceChange}
                        value={minimumPrice}
                    />
                    <label>And</label>
                    <input
                        type="number"
                        className="mt-2 w-full border border-primary-200 bg-transparent p-1 px-2 text-sm placeholder-black outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder={'Infinity'}
                        onChange={handleMaxPriceChange}
                        value={maximumPrice === Infinity ? '' : maximumPrice}
                    />
                </div>
            </Accordion>

            <Accordion
                accordionStyles="p-2"
                accordionButton={accordionButton('Rating')}
            >
                <div className="mt-2">
                    <label>{minimumRating}-5</label>
                    <br />
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={5 - minimumRating}
                        className="mt-2 h-2 w-full rotate-180 transform appearance-none rounded-md bg-primary-200"
                        onChange={handleMinimumRatingChange}
                    />
                </div>
            </Accordion>

            <div className="flex flex-row justify-between">
                <button
                    className="rounded-md bg-primary-200 px-2 py-1 text-sm font-semibold"
                    onClick={handleConfirmFilter}
                    disabled={disable}
                >
                    Confirm
                </button>
                <button
                    className="rounded-md bg-primary-200 px-3 py-1 text-sm font-semibold"
                    onClick={handleResetFilter}
                    disabled={disable}
                >
                    Reset
                </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
export default ProductFilter;
