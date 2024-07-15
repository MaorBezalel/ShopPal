import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useAuth } from "@/shared/hooks/useAuth.hook";
import { useRefreshToken } from "@/shared/hooks/useRefeshToken.hook";


export const PersistentLogin = () => {
    const { auth, rememberMe } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const refreshAccessToken = async () => {
            try 
            {
                await refresh();
            }
            catch (error) 
            {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.user ? refreshAccessToken() : setIsLoading(false);
        
    }, []);

    return (
        rememberMe ? 
            isLoading ? 
                <div>Loading...</div> : 
                <Outlet />
            : <Outlet />
    )
}
