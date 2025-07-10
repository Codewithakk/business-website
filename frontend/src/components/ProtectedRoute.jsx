import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // ✅ Read token directly from localStorage
    const token = localStorage.getItem('token');

    // ✅ You may also add validation logic here if you wish
    const isValid = !!token; // Or decode + check expiry if using JWT

    return isValid ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
