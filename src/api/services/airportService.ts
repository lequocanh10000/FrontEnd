import api from '../index';

export interface Airport {
    airport_id: number;
    code: string;
    name: string;
    city: string;
    country: string;
}

export const airportService = {
    // Lấy tất cả sân bay
    getAllAirports: async (): Promise<Airport[]> => {
        try {
            const response = await api.get('/airports');
            return response.data;
        } catch (error) {
            console.error('Error fetching airports:', error);
            throw error;
        }
    },

    // Tìm kiếm sân bay theo từ khóa
    searchAirports: async (query: string): Promise<Airport[]> => {
        try {
            const response = await api.get(`/airports/search?q=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching airports:', error);
            throw error;
        }
    },

    // Lấy sân bay theo ID
    getAirportById: async (id: number): Promise<Airport> => {
        try {
            const response = await api.get(`/airports/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching airport by ID:', error);
            throw error;
        }
    }
}; 