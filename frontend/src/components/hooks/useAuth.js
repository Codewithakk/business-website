import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
    const { user, token, status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthenticated = !!token
    const isLoading = status === 'loading'

    const handleLogout = () => {
        dispatch(logout())
        navigate('/admin/login')
    }

    return { user, isAuthenticated, isLoading, logout: handleLogout }
}