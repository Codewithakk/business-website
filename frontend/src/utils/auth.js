// utils/auth.js
const API_URL = 'http://localhost:3000/api';

export const refreshAccessToken = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include', // Important for cookies
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to refresh token');
        }

        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        // Clear tokens and redirect to login if refresh fails
        localStorage.removeItem('accessToken');
        window.location.href = '/admin/login';
        return null;
    }
};

export const authFetch = async (url, options = {}) => {
    // Set up default headers
    options.headers = options.headers || {};
    options.credentials = 'include'; // For cookies

    // Get access token
    let accessToken = localStorage.getItem('accessToken');

    // Add authorization header if token exists
    if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Make initial request
    let response = await fetch(url, options);

    // If unauthorized, try to refresh token
    if (response.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
            // Update authorization header with new token
            options.headers['Authorization'] = `Bearer ${newToken}`;
            // Retry the original request
            response = await fetch(url, options);
        }
    }

    return response;
};

export const logout = async () => {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Clear client-side tokens
        localStorage.removeItem('accessToken');
        // Redirect to login
        window.location.href = '/admin/login';
    }
};