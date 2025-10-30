import api from './api';

export const announcementService = {
    getAll: async (params = {}) => {
        const response = await api.get('/announcements', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/announcements/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/announcements', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/announcements/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/announcements/${id}`);
        return response.data;
    },

    // Additional methods for specific features
    getLatest: async (limit = 3) => {
        const response = await api.get('/announcements/latest', {
            params: { limit },
        });
        return response.data;
    },

    getByCategory: async (category) => {
        const response = await api.get('/announcements/category', {
            params: { category },
        });
        return response.data;
    },
};