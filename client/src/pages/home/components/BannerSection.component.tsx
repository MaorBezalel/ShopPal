import Lottie from 'lottie-react';
import home_banner from '@/assets/lottie/home-banner.json';

export function BannerSection() {
    return (
        <Lottie
            animationData={home_banner}
            loop={true}
            className="min-h-[40rem] min-w-[40rem]
            pc-md:min-h-[30rem] pc-md:min-w-[30rem]
            tablet-sm:h-[25rem] tablet-sm:min-h-min tablet-sm:w-[25rem] tablet-sm:min-w-min
            mobile-lg:h-[22rem] mobile-lg:w-[22rem]
            mobile-md:h-[20rem] mobile-md:w-[20rem]"
        />
    );
}
