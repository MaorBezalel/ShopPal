import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import logoSVG from '@/assets/svgs/logo.svg';
import { IconGithub, IconLogin, IconLogout, IconSignup, IconTheme } from '@/shared/components/icons';
import { useApi } from '@/shared/hooks';

export function Header() {
    const { auth, setAuth } = useAuth();
    const { userApi } = useApi();
    const navigate = useNavigate();

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
            <div className="container-highlight container mx-auto flex flex-row items-center justify-between px-1 py-4">
                {/* Logo */}
                <nav>
                    <Link
                        to="/"
                        className=""
                    >
                        <img
                            src={logoSVG}
                            alt="logo"
                            className="h-16 w-56"
                        />
                    </Link>
                </nav>

                {/* Navigation */}
                <nav>
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
                <aside>
                    <menu className="flex flex-row items-center gap-4 font-medium">
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
                                        className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1"
                                    >
                                        <IconLogin className="size-6" />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/auth/signup"
                                        className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1"
                                    >
                                        <IconSignup className="size-6" />
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Theme */}
                        <li>
                            <button className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1">
                                <IconTheme
                                    theme="light"
                                    className="size-6"
                                />
                            </button>
                        </li>

                        {/* Github */}
                        <li>
                            <Link to="https://github.com/MaorBezalel/e-commerce-app">
                                <div className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1">
                                    <IconGithub className="size-6" />
                                </div>
                            </Link>
                        </li>
                    </menu>
                </aside>
            </div>
        </header>
    );
}
