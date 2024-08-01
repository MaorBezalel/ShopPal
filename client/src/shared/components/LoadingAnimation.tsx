import LoadingAnimationSvg from '@/assets/animations/loading-animation.svg';

type LoadingAnimationProps = {
    className?: string;
};

const LoadingAnimation = ({ className }: LoadingAnimationProps) => {
    return (
        <div className={`flex w-full items-center justify-center ${className}`}>
            <img
                src={LoadingAnimationSvg}
                alt="Loading animation"
                className="h-20 w-20 animate-spin"
            />
        </div>
    );
};

export default LoadingAnimation;
