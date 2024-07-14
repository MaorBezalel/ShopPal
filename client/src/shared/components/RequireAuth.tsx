import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "@/shared/hooks/useAuth.hook";

export const RequireAuth = () => {
    const location = useLocation();
    const { auth } = useAuth();

    return (
        auth?.user ? 
            <Outlet /> : 
            <Navigate to="/auth" state={{ from: location.pathname }} />
    )
};
