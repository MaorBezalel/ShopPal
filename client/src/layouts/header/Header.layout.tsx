import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import logoSVG from '@/assets/svgs/logo.svg';
import { IconGithub, IconLogin, IconLogout, IconSignup, IconTheme } from '@/shared/components/icons';
import { useApi } from '@/shared/hooks';
import Hamburger from 'hamburger-react';

export function Header() {
    const { auth, setAuth } = useAuth();
    const { userApi } = useApi();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const message = await userApi.logout();
            setAuth(null);
            console.log(message);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="relative w-full">
            <div
                className="container-highlight container relative mx-auto flex flex-row items-center justify-between px-1 py-4
                mobile-lg:flex-row-reverse
                "
            >
                {/* Hamburger */}
                <div
                    className="hidden
                    pc-sm:block pc-sm:rounded-full pc-sm:border pc-sm:border-solid pc-sm:border-primary-950 pc-sm:p-1
                    tablet-md:p-0.5"
                >
                    <Hamburger
                        color="#EB7AA5"
                        direction="right"
                        size={24}
                        easing="ease-in"
                        duration={0.21}
                        label="Show menu"
                        toggled={isMenuOpen}
                        toggle={setIsMenuOpen}
                    />
                </div>

                {/* Menu */}
                <nav
                    className={`absolute left-1/2 top-24 z-10 hidden h-fit w-2/3 -translate-x-1/2 border-2 border-text-950 bg-background-50 p-10 ${
                        isMenuOpen ? 'pc-sm:block' : ''
                    }`}
                >
                    <ul className="flex h-full flex-col items-center justify-center gap-4">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                        {auth?.user && (
                            <li>
                                <Link to={`/profile`}>Profile</Link>
                            </li>
                        )}
                        <hr className="border-1 w-full border-solid border-text-950" />
                        <li className="flex w-full flex-row items-center justify-center gap-20">
                            <Link
                                to="https://github.com/MaorBezalel/e-commerce-app"
                                className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1"
                            >
                                <IconGithub className="size-6" />
                            </Link>
                            <button className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1">
                                <IconTheme
                                    theme="light"
                                    className="size-6"
                                />
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Logo */}
                <nav>
                    <Link to="/">
                        <img
                            src={logoSVG}
                            alt="logo"
                            className="h-16 w-56
                            mobile-lg:h-16 mobile-lg:w-44
                            "
                        />
                    </Link>
                </nav>

                {/* Navigation */}
                <nav className="pc-sm:hidden">
                    <ul className="flex flex-row gap-20 rounded-full border border-text-950 px-20 py-3 text-xl">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                        {auth?.user && (
                            <li>
                                <Link to={`/profile`}>Profile</Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Aside (Auth, Theme, Github) */}
                <aside className="mobile-lg:hidden">
                    <menu
                        className="flex flex-row items-center gap-4 font-medium
                        pc-sm:items-start pc-sm:justify-center
                        tablet-md:gap-2 
                        tablet-sm:flex-col tablet-sm:items-center tablet-sm:justify-center tablet-sm:gap-4"
                    >
                        {/* Auth */}
                        {auth?.user ? (
                            <li>
                                <button
                                    className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1"
                                    onClick={handleLogout}
                                >
                                    <IconLogout className="size-6" />
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/auth"
                                        className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1
                                        tablet-md:text-sm
                                        tablet-sm:px-3
                                        "
                                    >
                                        <IconLogin className="size-6 tablet-md:size-5" />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/auth/signup"
                                        className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1
                                        tablet-md:text-sm"
                                    >
                                        <IconSignup className="size-6 tablet-md:size-5" />
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Theme */}
                        <li className="pc-sm:hidden">
                            <button className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1">
                                <IconTheme
                                    theme="light"
                                    className="size-6"
                                />
                            </button>
                        </li>

                        {/* Github */}
                        <li className="pc-sm:hidden">
                            <Link
                                to="https://github.com/MaorBezalel/e-commerce-app"
                                className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1"
                            >
                                <IconGithub className="size-6" />
                            </Link>
                        </li>
                    </menu>
                </aside>
            </div>
        </header>
    );
}
