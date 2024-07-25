import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { IconShoppingBag, IconLogin } from '@/shared/components/icons';

export function HeaderSection() {
    const { auth } = useAuth();

    return (
        <section
            className="flex flex-col justify-start gap-4
            tablet-lg:items-center tablet-lg:justify-center tablet-lg:text-center
            tablet-sm:gap-2"
        >
            <h1
                className="text-8xl font-bold
                pc-lg:text-7xl
                pc-md:text-6xl
                pc-sm:text-[3.5rem]
                tablet-lg:text-5xl
                tablet-sm:text-4xl
                mobile-md:text-3xl"
            >
                Shop Smarter, Shop ShopPal!
            </h1>
            <p
                className="mt-4 text-pretty pr-20 text-xl
                pc-md:text-lg
                pc-sm:text-base
                tablet-lg:px-10
                tablet-sm:mt-0
                tablet-sm:px-6 tablet-sm:text-[0.9rem]
                mobile-lg:px-4 mobile-lg:text-[0.8rem]
                mobile-md:px-2"
            >
                Discover ShopPal, your go-to for online shopping! From the newest gadgets to daily needs, enjoy great
                deals, quick checkout, and fast delivery. Upgrade your lifestyle with ease. Start your ShopPal journey
                now!
            </p>
            <nav
                className="mt-10 flex flex-row gap-10 
                tablet-lg:mt-6 tablet-lg:w-full
                tablet-lg:justify-center
                tablet-sm:mt-6"
            >
                <Link
                    to="/products"
                    className="flex flex-row items-center gap-3 rounded-md bg-primary-500 px-8 py-4 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-primary-600 hover:brightness-100 active:scale-95 active:bg-primary-700
                    tablet-lg:justify-center tablet-lg:gap-2 tablet-lg:px-8 tablet-lg:py-4 tablet-lg:text-xl
                    tablet-sm:px-6 tablet-sm:py-3
                    mobile-md:px-4 mobile-md:py-2 mobile-md:text-lg"
                >
                    <span>Shop Now</span>
                    <IconShoppingBag />
                </Link>
                {!auth?.user && (
                    <Link
                        to="/auth/login"
                        className="flex flex-row items-center gap-3 rounded-md bg-secondary-300 px-8 py-4 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-secondary-400 hover:brightness-100 active:scale-95 active:bg-secondary-500
                        tablet-lg:justify-center tablet-lg:gap-2 tablet-lg:px-8 tablet-lg:py-4 tablet-lg:text-xl
                        tablet-sm:px-6 tablet-sm:py-3
                        mobile-md:px-4 mobile-md:py-2 mobile-md:text-lg"
                    >
                        <span>Login</span>
                        <IconLogin />
                    </Link>
                )}
            </nav>
        </section>
    );
}
