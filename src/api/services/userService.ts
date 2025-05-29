import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010';

export interface UserData {
    username: string;
    email: string;
    phone: string;
}

export const userService = {
    // Lấy thông tin user từ token
    getUserInfo: async (token: string) => {
        try {
            // Lấy user ID từ token
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found');
            }

            const response = await axios.get(`${API_URL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật thông tin user
    updateUserInfo: async (userId: number, userData: Partial<UserData>, token: string) => {
        try {
            const response = await axios.put(`${API_URL}/users/put/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
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