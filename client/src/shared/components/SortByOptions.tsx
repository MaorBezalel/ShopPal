import React, { memo, MouseEventHandler, useEffect, useState } from 'react';
import AscOrderImage from '@/assets/photos/asc-order.png';
import DescOrderImage from '@/assets/photos/desc-order.png';

type OrderOptions = 'asc' | 'desc';

interface SortByOptionsProps<T> {
    sortOptions: T[];
    defaultSelectedSortOption?: T;
    defaultSelectedOrderOption?: OrderOptions;
    onSortOptionChange: (sortOption: T) => void;
    onOrderOptionChange: (orderOption: OrderOptions) => void;
}

const SortByOptions = <T extends string>({
    sortOptions,
    defaultSelectedSortOption,
    defaultSelectedOrderOption = 'asc',
    onSortOptionChange,
    onOrderOptionChange,
}: SortByOptionsProps<T>) => {
    const [selectedOrderOption, setSelectedOrderOption] = useState<OrderOptions>(defaultSelectedOrderOption);
    const [selectedSortOption, setSelectedSortOption] = useState<T>(defaultSelectedSortOption || sortOptions[0]);
    useEffect(() => {
        setSelectedOrderOption(defaultSelectedOrderOption);
        setSelectedSortOption(defaultSelectedSortOption || sortOptions[0]);
    }, [defaultSelectedOrderOption, defaultSelectedSortOption, sortOptions]);

    const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortOption(event.target.value as T);
        onSortOptionChange(event.target.value as T);
    };
    const handleOrderOptionChange: MouseEventHandler<HTMLImageElement> = () => {
        const newOrderOption = selectedOrderOption === 'asc' ? 'desc' : 'asc';
        setSelectedOrderOption(newOrderOption);
        onOrderOptionChange(newOrderOption);
    };

    if (sortOptions.length === 0) throw new Error('Sort options cannot be empty');

    return (
        <div className="flex flex-row items-center gap-2">
            <p className="text-md">Sort By: </p>
            <select
                className="rounded-lg border border-primary-100 p-1"
                value={selectedSortOption}
                onChange={handleSortOptionChange}
            >
                {sortOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <img
                className="h-8 w-8 rounded-lg border border-primary-100 p-1"
                src={selectedOrderOption === 'asc' ? DescOrderImage : AscOrderImage}
                onClick={handleOrderOptionChange}
            />
        </div>
    );
};

export default memo(SortByOptions) as <T extends string>(props: SortByOptionsProps<T>) => JSX.Element;
