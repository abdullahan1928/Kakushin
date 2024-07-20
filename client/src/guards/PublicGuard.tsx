import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export const PublicGuard = (): any => {
    const context = useAuth();

    if (!context.isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to='/dashboard' replace={true} />;
};

export default PublicGuard;
