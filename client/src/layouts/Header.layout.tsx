import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import logoSVG from '@/assets/svgs/logo.svg';
import { IconGithub } from '@/shared/components/icons';
import { IconTheme } from '@/shared/components/icons/IconTheme.icon';

export function Header() {
    const { auth } = useAuth();

    return (
        <header className="relative w-full">
            <div className="container-highlight container mx-auto flex flex-row items-center justify-between py-4">
                <nav>
                    <Link to="/">
                        <img src={logoSVG} alt="logo" className="h-16 w-56" />
                    </Link>
                </nav>
                <nav>
                    <ul className="flex flex-row gap-4">
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
                <aside>
                    <menu className="flex flex-row items-center gap-4">
                        {auth?.user ? (
                            <li>
                                <Link to="/auth" className="btn">
                                    Logout
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/auth" className="btn">
                                    Login
                                </Link>
                            </li>
                        )}
                        <li>
                            <button className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1">
                                <IconTheme theme="light" className="size-6" />
                            </button>
                        </li>
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
