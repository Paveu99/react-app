import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    element: ReactNode
}

export const ProtectedRoute = ({ element }: Props) => {
    const token = sessionStorage.getItem('token');
    return token ? element : <Navigate to="/user/login" />;
};
