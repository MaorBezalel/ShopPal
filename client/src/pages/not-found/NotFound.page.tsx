import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <main className="container flex flex-1 flex-col items-center justify-start gap-10">
            <hgroup className="flex flex-col items-center gap-2">
                <h1
                    className="inline-block bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400 bg-clip-text text-center text-[15rem] font-bold text-transparent
                    mobile-lg:text-[13rem]
                    mobile-md:text-[11rem]
                    "
                >
                    404
                </h1>
                <h2
                    className="text-center text-6xl font-semibold text-primary-400
                    pc-lg:text-5xl
                    tablet-sm:text-4xl
                    mobile-lg:text-3xl
                    mobile-md:text-2xl
                    "
                >
                    OOPS! PAGE NOT FOUND
                </h2>
            </hgroup>
            <p
                className="px-96 text-center text-2xl text-text-950
                pc-lg:px-80
                pc-md:px-60
                pc-sm:px-40
                tablet-lg:px-20
                tablet-md:px-5
                tablet-sm:px-2 tablet-sm:text-lg
                mobile-md:text-base
                "
            >
                Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
            </p>
            <nav
                className="mt-10 flex flex-row gap-20
                mobile-lg:gap-4
                mobile-md:mt-20
                "
            >
                <Link
                    to="/"
                    className="flex flex-row items-center gap-3 rounded-md bg-primary-500 px-8 py-4 text-3xl text-background-50 outline outline-2 outline-text-950 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-primary-600 hover:brightness-100 active:scale-95 active:bg-primary-700
                    tablet-lg:justify-center tablet-lg:gap-2 tablet-lg:px-8 tablet-lg:py-4 tablet-lg:text-xl
                    tablet-sm:px-6 tablet-sm:py-3
                    mobile-lg:text-lg 
                    mobile-md:px-4 mobile-md:py-2"
                >
                    Return Home
                </Link>

                {/* 'Report Problem' isn't implemented as of now... */}
                <Link
                    to="/"
                    className="flex flex-row items-center gap-3 rounded-md bg-secondary-300 px-8 py-4 text-3xl text-background-50 outline outline-2 outline-text-950 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-secondary-400 hover:brightness-100 active:scale-95 active:bg-secondary-500 
                    tablet-lg:justify-center tablet-lg:gap-2 tablet-lg:px-8 tablet-lg:py-4 tablet-lg:text-xl 
                    tablet-sm:px-6 tablet-sm:py-3 
                    mobile-lg:text-lg 
                    mobile-md:px-4 mobile-md:py-2"
                >
                    Report Problem
                </Link>
            </nav>
        </main>
    );
}
