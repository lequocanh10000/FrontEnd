import api from '../index';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    phone: string;
}

export interface User {
    id: string;
    email: string;
    phone?: string;
    role: string;
}

const getLocalStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);
        console.log(`[AuthService] Getting ${key} from localStorage:`, value);
        return value;
    }
    console.log(`[AuthService] Window is undefined, cannot get ${key}`);
    return null;
};

const setLocalStorage = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
        console.log(`[AuthService] Setting ${key} in localStorage:`, value);
        localStorage.setItem(key, value);
    } else {
        console.log(`[AuthService] Window is undefined, cannot set ${key}`);
    }
};

const removeLocalStorage = (key: string): void => {
    if (typeof window !== 'undefined') {
        console.log(`[AuthService] Removing ${key} from localStorage`);
        localStorage.removeItem(key);
    } else {
        console.log(`[AuthService] Window is undefined, cannot remove ${key}`);
    }
};

export const authService = {
    login: async (data: LoginData) => {
        const response = await api.post('/users/login', data);
        if (response.data.token) {
            setLocalStorage('token', response.data.token);
            setLocalStorage('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    register: async (data: RegisterData) => {
        const response = await api.post('/users/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: (): User | null => {
        if (typeof window === 'undefined') return null;

        const userStr = getLocalStorage('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error('[AuthService] Error parsing user data:', error);
                return null;
            }
        }
        return null;
    },

    isAuthenticated: (): boolean => {
        if (typeof window === 'undefined') return false;
        const token = getLocalStorage('token');
        return !!token;
    },

    getToken: (): string | null => {
        return getLocalStorage('token');
    },

    refreshUserData: async () => {
        const token = getLocalStorage('token');
        if (!token) return null;

        try {
            const response = await api.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                setLocalStorage('user', JSON.stringify(response.data));
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('[AuthService] Error refreshing user data:', error);
            return null;
        }
    }
}; 