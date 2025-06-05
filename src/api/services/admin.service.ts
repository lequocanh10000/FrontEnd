import api from '../index';

export interface AdminLoginData {
    email: string;
    password: string;
}

export interface AdminResponse {
    token: string;
    user: {
        id: number;
        email: string;
        role: string;
    };
}

const AdminService = {
    // Authentication
    login: async (data: AdminLoginData): Promise<AdminResponse> => {
        const response = await api.post('/users/login', data);
        return response.data;
    },

    // Flights Management
    getAllFlights: async () => {
        const response = await api.get('/flights');
        return response.data;
    },

    createFlight: async (flightData: any) => {
        const response = await api.post('/flights', flightData);
        return response.data;
    },

    updateFlight: async (id: number, flightData: any) => {
        const response = await api.put(`/flights/${id}`, flightData);
        return response.data;
    },

    deleteFlight: async (id: number) => {
        const response = await api.delete(`/flights/${id}`);
        return response.data;
    },

    // Bookings Management
    getAllBookings: async () => {
        const response = await api.get('/bookings');
        return response.data;
    },

    updateBooking: async (id: number, bookingData: any) => {
        const response = await api.put(`/bookings/${id}`, bookingData);
        return response.data;
    },

    // Aircraft Management
    getAllAircrafts: async () => {
        const response = await api.get('/aircrafts');
        return response.data;
    },

    createAircraft: async (aircraftData: any) => {
        const response = await api.post('/aircrafts', aircraftData);
        return response.data;
    },

    // Customer Management
    getAllCustomers: async () => {
        const response = await api.get('/customers');
        return response.data;
    },

    // Airport Management
    getAllAirports: async () => {
        const response = await api.get('/airports');
        return response.data;
    },
};

export default AdminService; 