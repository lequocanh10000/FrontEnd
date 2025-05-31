// src/api/services/flightService.ts
import api from '../index';
import { Flight, FlightSearchParams, FlightSearchResponse, PopularFlightsResponse } from '@/types/flight';

class FlightService {
    // Tìm kiếm chuyến bay
    async searchFlights(params: FlightSearchParams): Promise<FlightSearchResponse> {
        try {
            const response = await api.get('/flights/searchDes', {
                params: {
                    from: params.from,
                    to: params.to,
                    departureDate: params.departDate
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error in searchFlights:', error);
            throw error;
        }
    }

    // Lấy tất cả chuyến bay
    async getAllFlights(): Promise<Flight[]> {
        try {
            const response = await api.get('/flights/searchAll');
            return response.data;
        } catch (error) {
            console.error('Error in getAllFlights:', error);
            throw error;
        }
    }

    // Lấy chuyến bay phổ biến
    async getPopularFlights(): Promise<PopularFlightsResponse> {
        try {
            const response = await api.get('/flights/popular');
            return {
                success: true,
                flights: response.data
            };
        } catch (error) {
            console.error('Error in getPopularFlights:', error);
            return {
                success: false,
                flights: [],
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Lấy chi tiết chuyến bay theo ID
    async getFlightById(flightId: number): Promise<Flight> {
        try {
            const response = await api.get(`/flights/${flightId}`);
            return response.data;
        } catch (error) {
            console.error('Error in getFlightById:', error);
            throw error;
        }
    }

    // Tìm kiếm chuyến bay theo giá
    async searchFlightsByPrice(minPrice?: number, maxPrice?: number): Promise<FlightSearchResponse> {
        try {
            const response = await api.get('/flights/searchPrice', {
                params: {
                    minPrice,
                    maxPrice
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error in searchFlightsByPrice:', error);
            throw error;
        }
    }

    // Format giá tiền
    formatPrice(price: number): string {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Format thời gian
    formatDateTime(dateTimeString: string): { date: string; time: string } {
        const date = new Date(dateTimeString);
        return {
            date: date.toLocaleDateString('vi-VN'),
            time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
    }

    // Validate search params
    validateSearchParams(params: FlightSearchParams): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!params.from) errors.push('Vui lòng chọn điểm đi');
        if (!params.to) errors.push('Vui lòng chọn điểm đến');
        if (!params.departDate) errors.push('Vui lòng chọn ngày đi');
        if (params.returnDate && params.returnDate < params.departDate) {
            errors.push('Ngày về phải sau ngày đi');
        }
        if (params.adults < 1) errors.push('Số người lớn phải lớn hơn 0');
        if (params.children < 0) errors.push('Số trẻ em không được âm');

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

export default new FlightService();