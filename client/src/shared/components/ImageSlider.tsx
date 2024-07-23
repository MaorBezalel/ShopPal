import React from 'react';
import LeftArrow from '@/assets/photos/left-arrow.png';
import RightArrow from '@/assets/photos/right-arrow.png';
import { useState } from 'react';
import EmptyImage from '@/assets/photos/product-empty-image.png';
import { AsyncImage } from 'loadable-image';
import { memo } from 'react';

interface ImageSliderProps {
    images?: string[];
    className?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = memo(({ images, className }: ImageSliderProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const activeImage = images?.[activeImageIndex] || EmptyImage;

    const handlePrevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + images!.length) % images!.length);
    };

    const handleNextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % images!.length);
    };

    return (
        <div>
            <div className={`relative ${className}`}>
                <AsyncImage src={activeImage} alt="Product image" className="h-full w-full rounded-xl object-cover" />
                {images && (
                    <>
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2"
                            onClick={handlePrevImage}
                        >
                            <img src={LeftArrow} className="h-8 w-8" />
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2"
                            onClick={handleNextImage}
                        >
                            <img src={RightArrow} className="h-8 w-8" />
                        </button>
                    </>
                )}
            </div>
            <div className="mt-2 flex flex-row justify-center gap-4 overflow-auto">
                {images?.map((image, index) => (
                    <div className="flex h-24 w-24" key={index}>
                        <AsyncImage
                            src={image}
                            alt="Product thumbnail"
                            className={`h-full w-full cursor-pointer rounded-md ${index === activeImageIndex ? 'border-2 border-primary-200' : ''}`}
                            onClick={() => setActiveImageIndex(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});
