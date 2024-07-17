import Lottie from 'lottie-react';
import home_banner_lottie from '@/assets/lottie/home-banner.json';
import { useNavigate } from 'react-router';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useApi } from '@/shared/hooks/useApi.hook';

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
        <>
            <Lottie animationData={home_banner_lottie} loop={true} className="h-[40rem] w-[40rem]" />
            <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/auth')}>Auth</button>
                <button onClick={() => navigate('/cart')}>Cart</button>
                <button onClick={() => navigate('/order/123')}>Order</button>
                <button onClick={() => navigate('/product/123')}>Product</button>
                <button onClick={() => navigate('/products')}>Products</button>
                <button onClick={() => navigate('/profile/123')}>Profile</button>
                {auth && <button onClick={handleLogout}>Logout</button>}
            </div>
        </>
    );
}
