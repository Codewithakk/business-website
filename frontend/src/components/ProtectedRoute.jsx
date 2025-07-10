import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const isValid = !!token;

    return isValid ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
