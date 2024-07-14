import Lottie from 'lottie-react';
import home_banner_lottie from '@/assets/lottie/home-banner.json';
import products_banner_svg from '@/assets/svgs/products-banner.svg';

export function HomePage() {
    return <Lottie animationData={home_banner_lottie} loop={true} className="h-[40rem] w-[40rem]" />;
}
