import api from './api';

export const userService = {
    login: async (credentials) => {
        const response = await api.post('/v1/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: async () => {
        await api.post('/v1/logout');
        localStorage.removeItem('token');
    },

    register: async (userData) => {
        const response = await api.post('/v1/register', userData);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/v1/user');
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.put('/v1/user/profile', data);
        return response.data;
    },

    // Password reset functionality
    forgotPassword: async (email) => {
        const response = await api.post('/v1/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (token, password) => {
        const response = await api.post('/v1/reset-password', { token, password });
        return response.data;
    },

    // Admin user management
    getAllUsers: async (params = {}) => {
        const response = await api.get('/v1/users', { params });
        return response.data;
    },

    getUserById: async (id) => {
        const response = await api.get(`/v1/users/${id}`);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await api.put(`/v1/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/v1/users/${id}`);
        return response.data;
    },
};
