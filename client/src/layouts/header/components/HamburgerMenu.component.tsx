import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/hooks';
import { IconGithub, IconTheme } from '@/shared/components/icons';
import { useEffect } from 'react';

type HamburgerMenuProps = {
    isMenuOpen: boolean;
    onLinkClick: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HamburgerMenu({ isMenuOpen, onLinkClick }: HamburgerMenuProps) {
    const { auth } = useAuth();

    // disable body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    return (
        isMenuOpen && (
            <div
                className={`fixed left-0 top-0 z-10 h-[100vh] w-[100vw] bg-black bg-opacity-50`}
                onClick={() => onLinkClick(false)}
            >
                <div className="relative z-20 h-full w-full">
                    <nav
                        className={`absolute left-1/2 top-24 hidden h-fit w-2/3 -translate-x-1/2 border-2 border-text-950 bg-background-50 p-10 ${isMenuOpen ? 'pc-sm:block' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="flex h-full flex-col items-center justify-center gap-4">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => onLinkClick((prev) => !prev)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    onClick={() => onLinkClick((prev) => !prev)}
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cart"
                                    onClick={() => onLinkClick((prev) => !prev)}
                                >
                                    Cart
                                </Link>
                            </li>
                            {auth?.user && (
                                <li>
                                    <Link
                                        to={`/profile/${auth?.user.user_id}`}
                                        onClick={() => onLinkClick((prev) => !prev)}
                                    >
                                        Profile
                                    </Link>
                                </li>
                            )}
                            <hr className="border-1 w-full border-solid border-text-950" />
                            <li className="flex w-full flex-row items-center justify-center gap-20">
                                <Link
                                    to="https://github.com/MaorBezalel/e-commerce-app"
                                    className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1"
                                    onClick={() => onLinkClick((prev) => !prev)}
                                >
                                    <IconGithub className="size-6" />
                                </Link>
                                <button
                                    className="flex flex-row items-center gap-2 rounded-md border border-solid border-text-950 p-1"
                                    onClick={() => onLinkClick((prev) => !prev)}
                                >
                                    <IconTheme
                                        theme="light"
                                        className="size-6"
                                    />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    );
}
