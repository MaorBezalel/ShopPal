import { Link } from 'react-router-dom';

const OrderSuccess = ({ orderId }: { orderId: string }) => {
    return (
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <i className="-translate-y-28 scale-[2] text-9xl text-primary-500">🎉</i>
            <h1 className="mt-4 text-6xl font-bold pc-sm:text-5xl tablet-sm:text-4xl">Order placed successfully</h1>
            <p className="mt-2 text-4xl pc-sm:text-2xl tablet-lg:text-xl tablet-sm:text-base">
                Your order ID is: <br className="hidden mobile-lg:block" />{' '}
                <span className="font-bold">{orderId}</span>
            </p>
            <p className="mt-4 text-4xl font-bold pc-sm:text-3xl tablet-sm:text-xl">
                Thank you for shopping with ShopPal!
            </p>
            <Link
                to={'/'}
                className="mt-4 rounded-md bg-secondary-300 px-6 py-4 text-2xl font-bold text-white hover:bg-primary-500
                tablet-sm:px-4 tablet-sm:text-lg"
            >
                Go to Home
            </Link>
        </main>
    );
};

export default OrderSuccess;