import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContex';

interface PrivateRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
    const { user } = useAuth();
    // Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to="/login" />;
    }
    // Redirect to home page if user's role doesn't match the required role
    // if (requiredRole && user?.role !== requiredRole) {
    //     return <Navigate to="/" />;
    // }

    return <>{children}</>;
};

export default PrivateRoute;
