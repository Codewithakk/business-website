import API from './api'

export default {
    login: (email, password) => API.post('/api/auth/login', { email, password }, { withCredentials: true }),
    refreshToken: () => API.post('/api/auth/refresh-token'),
    logout: () => API.post('/api/auth/logout')
}