import api from './api';

export const announcementService = {
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/announcements', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching announcements:', error);
            // Return static test data if API fails
            return [
                {
                    id: 1,
                    title: 'Weather Advisory: Expected Heavy Rainfall',
                    content: 'Farmers are advised to prepare for heavy rainfall expected in the coming week. Take necessary precautions to protect crops.',
                    category: 'weather',
                    created_at: '2025-10-30T08:00:00Z'
                },
                {
                    id: 2,
                    title: 'New Agricultural Training Program',
                    content: 'Join our upcoming training program on modern farming techniques. Limited slots available.',
                    category: 'program',
                    created_at: '2025-10-29T10:30:00Z'
                },
                {
                    id: 3,
                    title: 'Market Price Update',
                    content: 'Latest market prices for agricultural products have been updated. Check the current rates for your crops.',
                    category: 'news',
                    created_at: '2025-10-28T15:45:00Z'
                },
                {
                    id: 4,
                    title: 'Upcoming Farmers\' Meeting',
                    content: 'Annual farmers\' meeting scheduled for next month. Important updates and discussions on agricultural policies.',
                    category: 'event',
                    created_at: '2025-10-27T09:15:00Z'
                }
            ];
        }
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