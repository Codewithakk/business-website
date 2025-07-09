import axios from 'axios'
// import { store } from '../redux/store'
console.log('API URL:', import.meta.env.VITE_API_URL)
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

API.interceptors.request.use((config) => {
    const token = store.getState().auth.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const response = await API.post('/api/auth/refresh-token')
                store.dispatch(setToken(response.data.accessToken))
                return API(originalRequest)
            } catch (err) {
                store.dispatch(logout())
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

export default API