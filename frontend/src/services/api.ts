const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
};

export const dashboardService = {
    getStats: () => apiFetch('/analytics/stats'),
    getLiveFlow: () => apiFetch('/analytics/flow'),
};

export const agentService = {
    getAgents: () => apiFetch('/agents'),
};
