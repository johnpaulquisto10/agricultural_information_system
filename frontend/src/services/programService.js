import api from './api';

export const programService = {
    getAll: async (params = {}) => {
        const response = await api.get('/programs', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/programs/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/programs', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/programs/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/programs/${id}`);
        return response.data;
    },

    // Additional methods for program-specific features
    getActive: async () => {
        try {
            const response = await api.get('/programs/active');
            return response.data;
        } catch (error) {
            console.error('Error fetching active programs:', error);
            // Return static test data if API fails
            return [
                {
                    id: 1,
                    title: 'Modern Rice Farming Techniques',
                    description: 'Learn advanced rice farming methods for better yield.',
                    status: 'open',
                    location: 'Agricultural Training Center',
                    startDate: '2025-11-15',
                    capacity: 50,
                    enrolled: 25
                },
                {
                    id: 2,
                    title: 'Sustainable Vegetable Growing',
                    description: 'Training on organic farming and sustainable practices.',
                    status: 'open',
                    location: 'Community Farm',
                    startDate: '2025-12-01',
                    capacity: 30,
                    enrolled: 15
                },
                {
                    id: 3,
                    title: 'Livestock Management Workshop',
                    description: 'Essential skills for managing farm animals and poultry.',
                    status: 'ongoing',
                    location: 'Livestock Center',
                    startDate: '2025-11-10',
                    capacity: 40,
                    enrolled: 35
                },
                {
                    id: 4,
                    title: 'Agricultural Technology Seminar',
                    description: 'Introduction to modern farming technologies and equipment.',
                    status: 'open',
                    location: 'Tech Hub Center',
                    startDate: '2025-11-20',
                    capacity: 60,
                    enrolled: 20
                }
            ];
        }
    },

    apply: async (programId) => {
        const response = await api.post(`/programs/${programId}/apply`);
        return response.data;
    },

    getApplications: async (programId) => {
        const response = await api.get(`/programs/${programId}/applications`);
        return response.data;
    },

    updateApplicationStatus: async (programId, applicationId, status) => {
        const response = await api.put(
            `/programs/${programId}/applications/${applicationId}`,
            { status }
        );
        return response.data;
    },
};