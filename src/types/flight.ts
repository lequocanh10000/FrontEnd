export interface Flight {
    id: string;
    flight_id: number;
    flight_number: string;
    departure: {
        airport: string;
        code: string;
        time: string;
    };
    arrival: {
        airport: string;
        code: string;
        time: string;
    };
    departure_time: string;
    arrival_time: string;
    duration: string;
    price: {
        economy: number;
        business: number;
    };
    prices: {
        economy: number;
        business: number;
    };
    seatsLeft: number;
    available_seats: number;
    status: string;
    route: {
        from: number;
        to: number;
    };
    aircraft_type?: string;
    airline?: string;
    departure_date?: string;
}

export interface FlightSearchParams {
    fromAirport: string;
    toAirport: string;
    departureDate: string;
    returnDate?: string;
    tripType: 'roundTrip' | 'oneWay';
    passengerCount: number;
    adults?: number;
    children?: number;
}

export interface FlightSearchResponse {
    success: boolean;
    message?: string;
    flights: Flight[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface PopularFlightsResponse {
    success: boolean;
    flights: Flight[];
    error?: string;
} 