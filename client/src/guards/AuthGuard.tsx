import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/dashbord.layout";

export const AuthGuard = (): any => {
    const context = useAuth();
    const location = useLocation();

    if (context.isAuthenticated === true) {
        return <DashboardLayout />
    } else {
        return <Navigate to='/' state={{ from: location.pathname }} replace={true} />
    }
};

export default AuthGuard;
