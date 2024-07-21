import React from 'react';
import LeftArrow from '@/assets/photos/left-arrow.png';
import RightArrow from '@/assets/photos/right-arrow.png';
import { useState } from 'react';
import EmptyImage from '@/assets/photos/product-empty-image.png';
import { memo } from 'react';

interface ImageSliderProps {
    images?: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = memo(({ images }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const activeImage = images?.[activeImageIndex] || EmptyImage;

    const handlePrevImage = () => {
        setActiveImageIndex(prev => (prev - 1 + images!.length) % images!.length);
    }

    const handleNextImage = () => {
        setActiveImageIndex(prev => (prev + 1) % images!.length);
    }


    return (
        <div>
                <div className="relative">
                        <img src={activeImage} alt="Product image" className="w-full h-full object-cover rounded-xl" />
                        {images && 
                        <>
                            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2" onClick={handlePrevImage}>
                            <img src={LeftArrow} className="h-8 w-8"/>
                        </button>
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2" onClick={handleNextImage}>
                            <img src={RightArrow} className="h-8 w-8"/>
                        </button>
                        </>}
                    </div>
                    <div className="flex flex-row justify-center gap-2 overflow-x-auto">
                        {images?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt="Product thumbnail"
                                className={`w-24 h-24 rounded-md cursor-pointer ${index === activeImageIndex ? 'border-2 border-primary-200 ' : ''}`}
                                onClick={() => setActiveImageIndex(index)}
                            />
                        ))}
                </div>
        </div>
    );
});
