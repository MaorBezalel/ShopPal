import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useApi } from '@/shared/hooks/useApi.hook';
import home_banner_lottie from '@/assets/lottie/home-banner.json';
import { IconShoppingBag, IconLogin } from '@/shared/components/icons';

export function HomePage() {
    const navigate = useNavigate();
    const { userApi } = useApi();
    const { auth, setAuth } = useAuth();

    const handleLogout = async () => {
        try {
            const message = await userApi.logout();
            setAuth(null);
            console.log(message);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <main className="container-highlight container mx-auto flex flex-1 flex-row items-center justify-between gap-4 text-text-950">
            <section className="flex flex-col justify-start gap-4">
                <h1 className="text-8xl font-bold">Shop Smarter, Shop ShopPal!</h1>
                <p className="mt-4 text-pretty pr-20 text-xl">
                    Welcome to ShopPal, your ultimate destination for online shopping! Dive into a world where
                    convenience meets variety, offering everything from the latest electronics to everyday essentials.
                    Enjoy exclusive deals, seamless checkout, and fast delivery on a wide range of products. Whether
                    you're decking out your home, upgrading your tech, or treating yourself to the latest fashion
                    trends, ShopPal makes it easy to shop anytime, anywhere. Experience shopping that's designed with
                    you in mind. Start exploring today!
                </p>
                <nav className="mt-3 flex flex-row gap-10">
                    <Link
                        to="/products"
                        className="flex flex-row items-center gap-3 rounded-md bg-primary-500 px-8 py-4 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-primary-600 hover:brightness-100 active:scale-95 active:bg-primary-700"
                    >
                        <span>Shop Now</span>
                        <IconShoppingBag />
                    </Link>
                    {!auth?.user && (
                        <Link
                            to="/auth"
                            className="flex flex-row items-center gap-3 rounded-md bg-secondary-300 px-8 py-4 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-secondary-400 hover:brightness-100 active:scale-95 active:bg-secondary-500"
                        >
                            <span>Login</span>
                            <IconLogin />
                        </Link>
                    )}
                </nav>
            </section>
            <Lottie animationData={home_banner_lottie} loop={true} className="min-h-[40rem] min-w-[40rem]" />
        </main>
    );
}
