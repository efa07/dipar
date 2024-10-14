import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContex';

interface PrivateRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
    const { user } = useAuth();

    // Check if the user is authenticated and has the required role
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" />; // Redirect to a different page or show an error
    }

    return children;
};

export default PrivateRoute;
