import React from 'react';
import LoadingAnimationSvg from '@/assets/animations/loading-animation.svg';

const LoadingAnimation: React.FC = () => {
    return (
        <div className="flex justify-center items-center w-full">
          <img src={LoadingAnimationSvg} alt="Loading animation" className="w-20 h-20 animate-spin"/>
        </div>
      )
};

export default LoadingAnimation;