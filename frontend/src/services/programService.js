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
        const response = await api.get('/programs/active');
        return response.data;
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