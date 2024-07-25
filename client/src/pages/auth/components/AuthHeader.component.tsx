import { Link } from 'react-router-dom';

type AuthHeaderProps = {
    type: 'login' | 'signup';
};

export function AuthHeader({ type }: AuthHeaderProps) {
    return (
        <header
            className="flex w-full flex-col justify-start gap-3 
            pc-sm:items-center pc-sm:gap-2"
        >
            <h1
                className="text-6xl font-bold 
                tablet-lg:text-5xl
                tablet-md:text-4xl
                mobile-lg:text-[2rem]"
            >
                {type === 'login' ? 'Welcome back!' : 'Create an account!'}
            </h1>

            {type === 'signup' ? (
                <p
                    className="text-md text-pretty 
                    tablet-lg:text-sm
                    tablet-md:text-center tablet-md:text-sm
                    mobile-lg:px-2 mobile-lg:text-[0.8rem]
                    mobile-md:px-1"
                >
                    Sign up to create an account and enjoy a seamless shopping experience. Already have an account?{' '}
                    <Link
                        to="/auth/login"
                        replace
                        className="font-medium text-secondary-300 hover:text-secondary-400 active:text-secondary-500"
                    >
                        Login
                    </Link>
                    .
                </p>
            ) : (
                <p
                    className="text-md text-pretty 
                    tablet-lg:text-sm 
                    tablet-sm:text-center tablet-sm:text-[0.9rem]
                    mobile-md:text-[0.8rem]"
                >
                    Log in to your account to enjoy a seamless shopping experience. Don't have an account yet?{' '}
                    <Link
                        to="/auth/signup"
                        replace
                        className="font-medium text-secondary-300 hover:text-secondary-400 active:text-secondary-500"
                    >
                        Sign up
                    </Link>
                    .
                </p>
            )}
        </header>
    );
}
