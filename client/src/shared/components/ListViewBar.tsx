import React, { memo } from 'react';
import listViewImage from '@/assets/photos/list-view.png';
import gridViewImage from '@/assets/photos/grid-view.png';
import { useState } from 'react';

import type { ListView } from '../../pages/products/Products.types';

interface ListViewBarProps {
    onListViewChange: (listView: ListView) => void;
    defaultListView: ListView; 
}

const ListViewBar: React.FC<ListViewBarProps> = ({ onListViewChange, defaultListView} : ListViewBarProps) => {

    const [listView, setListView] = useState<ListView>(defaultListView);

    const handleListViewChange = (updatedListView: ListView) => {
        if (updatedListView !== listView)
        {
            setListView(updatedListView);
            onListViewChange(updatedListView);
        }
    }

    const views = [
        { type: 'list', image: listViewImage },
        { type: 'grid', image: gridViewImage }
    ];
    

    return (
        <div className='flex flex-row gap-1'>
            {views.map(view => (
                <div key={view.type} className='p-2 border border-primary-100 rounded-lg' onClick={() => handleListViewChange(view.type as ListView)}> 
                    <img
                        src={view.image}
                        className={`w-4 h-4 ${listView !== view.type ? 'opacity-20' : ''}`}
                    />
                </div>
            ))}
        </div>
    );
};


export default memo(ListViewBar);