import React from 'react';

import { useState } from 'react';

import minusSvg from '@/assets/svgs/minus.svg';
import plusSvg from '@/assets/svgs/plus.svg';

type AccordionProps = {
    title: string;
    children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className='py-2'>
            <button onClick={() => setIsOpen((prev) => !prev)} className='flex justify-between w-full items-center'>
                <span>{title}</span>
                <span><img className='w-3 h-3' src={isOpen ? minusSvg : plusSvg}/></span>
            </button>

            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen 
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0' 
            }`}>

                <div className='overflow-hidden'>{children}</div>
            </div>
        </div>
    );
};

export default Accordion;