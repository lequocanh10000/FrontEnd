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
}

export interface FlightSearchParams {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
    adults: number;
    children: number;
}

export interface FlightSearchResponse {
    success: boolean;
    count: number;
    searchCriteria: {
        from: number;
        to: number;
        departureDate: string;
    };
    flights: Flight[];
}

export interface PopularFlightsResponse {
    success: boolean;
    flights: Flight[];
    error?: string;
} 