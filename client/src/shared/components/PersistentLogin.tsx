import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useRefreshToken } from '@/shared/hooks/useRefeshToken.hook';
import LoadingAnimation from './LoadingAnimation';

export const PersistentLogin = () => {
    const { auth, rememberMe } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.user ? refreshAccessToken() : setIsLoading(false);
    }, []);

    return rememberMe ? (
        isLoading ? (
            <LoadingAnimation className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        ) : (
            <Outlet />
        )
    ) : (
        <Outlet />
    );
};
