// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/authSlice';

const ProtectedRoute = () => {
    const token = useSelector(selectCurrentToken);

    return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;