import React from 'react';
import LoadingAnimationSvg from '@/assets/animations/loading-animation.svg';

type LoadingAnimationProps = {
    className?: string;
};

const LoadingAnimation  = ({ className } : LoadingAnimationProps) => {
    return (
        <div className={`flex justify-center items-center w-full ${className}`}>
          <img src={LoadingAnimationSvg} alt="Loading animation" className="w-20 h-20 animate-spin"/>
        </div>
      )
};

export default LoadingAnimation;