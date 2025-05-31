import axios from 'axios';
import { store } from '@/store/store';
import { loginSuccess } from '@/store/features/authSlice';
import type { User } from '@/store/features/authSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface UserData {
    username: string;
    email: string;
    phone: string;
}

export const userService = {
    // Lấy thông tin user từ token
    getUserInfo: async (token: string) => {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            // Lấy user từ Redux store
            const state = store.getState();
            const userId = state.auth.user?.id;

            // Nếu không tìm thấy user trong Redux store, thử lấy từ localStorage
            if (!userId) {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    if (user && user.id) {
                        const response = await axios.get(`${API_URL}/users/${user.id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        console.log("User info response:", response.data);
                        return response.data;
                    }
                }
                throw new Error('User ID not found');
            }

            const response = await axios.get(`${API_URL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("User info response:", response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                // Server trả về response với status code nằm ngoài 2xx
                throw new Error(error.response.data?.message || 'Failed to get user info');
            } else if (error.request) {
                // Request được gửi nhưng không nhận được response
                throw new Error('No response from server');
            } else {
                // Có lỗi khi setting up request
                throw new Error(error.message || 'Error getting user info');
            }
        }
    },

    // Cập nhật thông tin user
    updateUserInfo: async (userData: Partial<UserData>, token: string) => {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            // Lấy user từ Redux store
            const state = store.getState();
            let userId = state.auth.user?.id;

            // Nếu không tìm thấy user trong Redux store, thử lấy từ localStorage
            if (!userId) {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    if (user && user.id) {
                        userId = user.id;
                    } else {
                        throw new Error('User ID not found');
                    }
                } else {
                    throw new Error('User ID not found');
                }
            }

            const response = await axios.put(`${API_URL}/users/put/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Cập nhật lại thông tin user trong Redux store
            if (response.data && state.auth.user) {
                const updatedUser = {
                    ...state.auth.user,
                    ...userData
                };
                store.dispatch(loginSuccess({
                    user: updatedUser as User,
                    token
                }));
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Failed to update user info');
            } else if (error.request) {
                throw new Error('No response from server');
            } else {
                throw new Error(error.message || 'Error updating user info');
            }
        }
    },

    // Đổi mật khẩu
    resetPassword: async (email: string, newPassword: string, token: string) => {
        try {
            const response = await axios.post(`${API_URL}/users/resetPassword`,
                { email, password: newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};