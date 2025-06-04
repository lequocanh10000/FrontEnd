import api from '../index';
import { Flight, FlightSearchResponse, PopularFlightsResponse } from '@/types/flight';

interface FlightSearchParams {
    fromAirport: string;
    toAirport: string;
    departureDate: string;
    tripType: 'roundTrip' | 'oneWay';
    passengerCount: number;
    returnDate?: string; // Thêm returnDate cho roundtrip
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    timeOfDay?: string;
}

interface PaginatedResponse {
    success: boolean;
    flights: Flight[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

class FlightService {
    // Tìm kiếm chuyến bay
    async searchFlights(params: FlightSearchParams): Promise<FlightSearchResponse> {
        try {
            // Validate input parameters
            const validation = this.validateSearchParams(params);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            // Validate airport codes (chỉ check nếu có độ dài 3 ký tự)
            if (params.fromAirport.length === 3 && !/^[A-Z]{3}$/.test(params.fromAirport)) {
                throw new Error('Mã sân bay đi không hợp lệ');
            }
            if (params.toAirport.length === 3 && !/^[A-Z]{3}$/.test(params.toAirport)) {
                throw new Error('Mã sân bay đến không hợp lệ');
            }

            // Validate date format
            if (!this.isValidDate(params.departureDate)) {
                throw new Error('Ngày đi không hợp lệ');
            }

            // Log the request parameters
            console.log('Making API request with params:', params);

            // Chuẩn bị parameters cho API
            const apiParams: any = {
                fromAirport: params.fromAirport.trim().toUpperCase(),
                toAirport: params.toAirport.trim().toUpperCase(),
                departureDate: params.departureDate,
                tripType: params.tripType,
                passengerCount: params.passengerCount,
                page: params.page || 1,
                limit: params.limit || 10
            };

            // Thêm returnDate nếu là roundtrip
            if (params.tripType === 'roundTrip' && params.returnDate) {
                apiParams.returnDate = params.returnDate;
            }

            // Add filter parameters if they exist
            if (params.minPrice) apiParams.minPrice = params.minPrice;
            if (params.maxPrice) apiParams.maxPrice = params.maxPrice;
            if (params.timeOfDay) apiParams.timeOfDay = params.timeOfDay;

            const response = await api.get('/flights/searchDes', {
                params: apiParams,
                timeout: 10000 // Set timeout 10 seconds
            });

            // Log the response
            console.log('API Response:', response.data);

            // Kiểm tra response structure
            if (!response.data) {
                throw new Error('Không nhận được dữ liệu từ server');
            }

            return response.data;
        } catch (error: any) {
            console.error('Error in searchFlights:', error);

            if (error.response) {
                console.error('Error response status:', error.response.status);
                console.error('Error response data:', error.response.data);

                // Handle specific error codes
                if (error.response.status === 404) {
                    throw new Error('Không tìm thấy chuyến bay phù hợp');
                } else if (error.response.status === 400) {
                    throw new Error(error.response.data?.message || 'Thông tin tìm kiếm không hợp lệ');
                } else if (error.response.status === 500) {
                    throw new Error('Lỗi server, vui lòng thử lại sau');
                }

                throw new Error(error.response.data?.message || 'Có lỗi xảy ra khi tìm kiếm');
            } else if (error.request) {
                throw new Error('Không thể kết nối đến server, vui lòng kiểm tra kết nối mạng');
            } else {
                throw new Error(error.message || 'Có lỗi không xác định xảy ra');
            }
        }
    }

    // Validate date format (YYYY-MM-DD)
    private isValidDate(dateString: string): boolean {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) return false;

        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date.getTime());
    }

    // Lấy tất cả chuyến bay
    async getAllFlights(): Promise<Flight[]> {
        try {
            const response = await api.get('/flights/searchAll');
            return response.data || [];
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
                flights: response.data || []
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

    // Lấy chi tiết chuyến bay theo ID - SỬA LỖI TEMPLATE LITERAL
    async getFlightById(flightId: number): Promise<Flight> {
        try {
            const response = await api.get(`/flights/${flightId}`); // Sửa lỗi template literal
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

    // Validate search params - CẢI THIỆN VALIDATION
    validateSearchParams(params: FlightSearchParams): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        // Validate departure airport
        if (!params.fromAirport || params.fromAirport.trim().length === 0) {
            errors.push('Vui lòng chọn điểm đi');
        }

        // Validate arrival airport
        if (!params.toAirport || params.toAirport.trim().length === 0) {
            errors.push('Vui lòng chọn điểm đến');
        }

        // Check if departure and arrival airports are the same
        if (params.fromAirport && params.toAirport &&
            params.fromAirport.trim().toUpperCase() === params.toAirport.trim().toUpperCase()) {
            errors.push('Điểm đi và điểm đến không thể giống nhau');
        }

        // Validate departure date
        if (!params.departureDate) {
            errors.push('Vui lòng chọn ngày đi');
        } else {
            const departDate = new Date(params.departureDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (departDate < today) {
                errors.push('Ngày đi không thể là ngày trong quá khứ');
            }
        }

        // Validate return date for round trip
        if (params.tripType === 'roundTrip') {
            if (!params.returnDate) {
                errors.push('Vui lòng chọn ngày về cho chuyến khứ hồi');
            } else if (params.departureDate && params.returnDate) {
                const departDate = new Date(params.departureDate);
                const returnDate = new Date(params.returnDate);

                if (returnDate < departDate) {
                    errors.push('Ngày về không thể trước ngày đi');
                }
            }
        }

        // Validate passenger count
        if (!params.passengerCount || params.passengerCount < 1) {
            errors.push('Số hành khách phải lớn hơn 0');
        } else if (params.passengerCount > 9) {
            errors.push('Số hành khách không thể vượt quá 9 người');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Thêm method để normalize airport code
    normalizeAirportCode(input: string): string {
        if (!input) return '';

        // Extract airport code from various formats
        // Format 1: "Hanoi (HAN)" -> "HAN"
        const codeMatch1 = input.match(/\(([A-Z]{3})\)/);
        if (codeMatch1) {
            return codeMatch1[1];
        }

        // Format 2: "HAN - HANOI" -> "HAN"
        const codeMatch2 = input.match(/^([A-Z]{3})\s*-/);
        if (codeMatch2) {
            return codeMatch2[1];
        }

        // Format 3: Just the code "HAN"
        const trimmed = input.trim().toUpperCase();
        if (/^[A-Z]{3}$/.test(trimmed)) {
            return trimmed;
        }

        // If no pattern matches, try to extract first 3 uppercase letters
        const extractedCode = input.match(/([A-Z]{3})/);
        if (extractedCode) {
            return extractedCode[1];
        }

        // Return original if no pattern matches
        return trimmed;
    }

    // Lấy danh sách chuyến bay có phân trang
    async getPaginatedFlights(page: number = 1, limit: number = 10, filters?: {
        minPrice?: number;
        maxPrice?: number;
        timeOfDay?: string;
    }): Promise<PaginatedResponse> {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString()
            });

            if (filters) {
                if (filters.minPrice !== undefined) {
                    queryParams.append('minPrice', filters.minPrice.toString());
                }
                if (filters.maxPrice !== undefined) {
                    queryParams.append('maxPrice', filters.maxPrice.toString());
                }
                if (filters.timeOfDay) {
                    queryParams.append('timeOfDay', filters.timeOfDay);
                }
            }

            const response = await api.get(`/flights/paginated?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching paginated flights:', error);
            throw error;
        }
    }
}

export default new FlightService();