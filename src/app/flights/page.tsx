"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './pageflight.module.scss';
import FlightList from '../../components/flight/FlightList/flightList';
import FlightFilter from '../../components/flight/FlightFilter/flightFilter';
import FlightSearchSummary from '../../components/flight/FlightHeader/flightHeader';
import flightService from '@/api/services/flightService';
import { Flight } from '@/types/flight';
import { toast } from 'react-toastify';

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const [outboundFlights, setOutboundFlights] = useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
  const [filteredOutboundFlights, setFilteredOutboundFlights] = useState<Flight[]>([]);
  const [filteredReturnFlights, setFilteredReturnFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReturn, setIsLoadingReturn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFlights, setTotalFlights] = useState(0);
  const limit = 3;
  const [filters, setFilters] = useState<{
    minPrice?: number;
    maxPrice?: number;
    timeOfDay?: string;
  }>({});
  
  // State để theo dõi bước hiện tại
  const [currentStep, setCurrentStep] = useState<'outbound' | 'return'>('outbound');
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<any>(null);
  
  // State cho phân trang chuyến về
  const [returnCurrentPage, setReturnCurrentPage] = useState(1);
  const [returnTotalPages, setReturnTotalPages] = useState(1);
  const [returnTotalFlights, setReturnTotalFlights] = useState(0);
  
  // Get search params
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('departDate') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const adults = Number(searchParams.get('adults') || 1);
  const children = Number(searchParams.get('children') || 0);
  const tripType = searchParams.get('tripType') as 'oneWay' | 'roundTrip';
  const isRoundTrip = tripType === 'roundTrip';
  
  // Load chuyến bay đi
  useEffect(() => {
    const loadOutboundFlights = async () => {
      try {
        setIsLoading(true);
        let response;

        // Prepare filter parameters
        const filterParams = {
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          timeOfDay: filters.timeOfDay !== 'all' ? filters.timeOfDay : undefined
        };

        // If search parameters exist, use search API with pagination
        if (from && to && departDate) {
          const searchParamsForApi = {
            fromAirport: from,
            toAirport: to,
            departureDate: departDate,
            passengerCount: adults + children,
            tripType: 'oneWay' as const, // Luôn tìm một chiều cho chuyến đi
            page: currentPage,
            limit: limit,
            ...filterParams
          };

          console.log('Search outbound params:', searchParamsForApi);
          response = await flightService.searchFlights(searchParamsForApi);
        } else {
          response = await flightService.getPaginatedFlights(currentPage, limit, filterParams);
        }

        const transformedFlights: Flight[] = response.flights.map((flight: any) => {
          console.log('Original outbound flight data:', flight);
          const transformed = {
            id: flight.flight_id.toString(),
            flight_id: flight.flight_id,
            flight_number: flight.flight_number,
            departure: {
              airport: flight.departureAirport?.name || '',
              code: flight.departureAirport?.code || '',
              time: new Date(flight.departure_time).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })
            },
            arrival: {
              airport: flight.destinationAirport?.name || '',
              code: flight.destinationAirport?.code || '',
              time: new Date(flight.arrival_time).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })
            },
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            duration: calculateDuration(flight.departure_time, flight.arrival_time),
            price: {
              economy: parseFloat(flight.price_economy) || 0,
              business: parseFloat(flight.price_business) || 0
            },
            prices: {
              economy: parseFloat(flight.price_economy) || 0,
              business: parseFloat(flight.price_business) || 0
            },
            seatsLeft: flight.available_seats || 0,
            available_seats: flight.available_seats || 0,
            status: flight.status || 'scheduled',
            route: {
              from: flight.departure_airport_id,
              to: flight.destination_airport_id
            },
            departure_date: flight.departure_date,
            aircraft_type: flight.aircraft_type,
            airline: flight.airline
          };
          console.log('Transformed outbound flight data:', transformed);
          return transformed;
        });

        setOutboundFlights(transformedFlights);
        setFilteredOutboundFlights(transformedFlights);
        setTotalFlights(response.pagination.total);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Error loading outbound flights:', error);
        toast.error('Có lỗi xảy ra khi tải danh sách chuyến bay đi');
      } finally {
        setIsLoading(false);
      }
    };

    if (currentStep === 'outbound') {
      loadOutboundFlights();
    }
  }, [from, to, departDate, adults, children, currentPage, filters, currentStep]);

  // Load chuyến bay về khi người dùng đã chọn chuyến đi
  useEffect(() => {
    const loadReturnFlights = async () => {
      if (!isRoundTrip || !returnDate || currentStep !== 'return') return;
      
      try {
        setIsLoadingReturn(true);
        
        const filterParams = {
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          timeOfDay: filters.timeOfDay !== 'all' ? filters.timeOfDay : undefined
        };

        const searchParamsForApi = {
          fromAirport: to,
          toAirport: from,
          departureDate: returnDate,
          passengerCount: adults + children,
          tripType: 'oneWay' as const,
          page: returnCurrentPage,
          limit: limit,
          ...filterParams
        };

        console.log('Search return params:', searchParamsForApi);
        const response = await flightService.searchFlights(searchParamsForApi);

        const transformedReturnFlights: Flight[] = response.flights.map((flight: any) => {
          console.log('Original return flight data:', flight);
          const transformed = {
            id: flight.flight_id.toString(),
            flight_id: flight.flight_id,
            flight_number: flight.flight_number,
            departure: {
              airport: flight.departureAirport?.name || '',
              code: flight.departureAirport?.code || '',
              time: new Date(flight.departure_time).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })
            },
            arrival: {
              airport: flight.destinationAirport?.name || '',
              code: flight.destinationAirport?.code || '',
              time: new Date(flight.arrival_time).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })
            },
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            duration: calculateDuration(flight.departure_time, flight.arrival_time),
            price: {
              economy: parseFloat(flight.price_economy) || 0,
              business: parseFloat(flight.price_business) || 0
            },
            prices: {
              economy: parseFloat(flight.price_economy) || 0,
              business: parseFloat(flight.price_business) || 0
            },
            seatsLeft: flight.available_seats || 0,
            available_seats: flight.available_seats || 0,
            status: flight.status || 'scheduled',
            route: {
              from: flight.departure_airport_id,
              to: flight.destination_airport_id
            },
            departure_date: flight.departure_date,
            aircraft_type: flight.aircraft_type,
            airline: flight.airline
          };
          console.log('Transformed return flight data:', transformed);
          return transformed;
        });

        setReturnFlights(transformedReturnFlights);
        setFilteredReturnFlights(transformedReturnFlights);
        setReturnTotalFlights(response.pagination.total);
        setReturnTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Error loading return flights:', error);
        toast.error('Có lỗi xảy ra khi tải danh sách chuyến bay về');
      } finally {
        setIsLoadingReturn(false);
      }
    };

    loadReturnFlights();
  }, [currentStep, isRoundTrip, returnDate, to, from, adults, children, filters, returnCurrentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const applyFilters = (newFilters: {
    minPrice: number;
    maxPrice: number;
    timeOfDay: string;
  }) => {
    console.log('Applying new filters:', newFilters);
    setCurrentPage(1);
    setFilters(newFilters);
  };

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const diffMs = arrival.getTime() - departure.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHrs}h ${diffMins}m`;
  };

  // Callback khi người dùng chọn chuyến bay đi (cho khứ hồi)
  const handleOutboundFlightSelected = (flightData: any) => {
    console.log('Outbound flight selected:', flightData);
    setSelectedOutboundFlight(flightData);
    if (isRoundTrip) {
      setCurrentStep('return');
    }
  };

  // Callback khi người dùng muốn quay lại chọn chuyến đi
  const handleBackToOutbound = () => {
    setCurrentStep('outbound');
    setSelectedOutboundFlight(null);
  };

  if (isLoading && currentStep === 'outbound') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Xác định danh sách chuyến bay hiện tại và trạng thái loading
  const currentFlights = currentStep === 'outbound' ? filteredOutboundFlights : filteredReturnFlights;
  const currentLoading = currentStep === 'outbound' ? isLoading : isLoadingReturn;

  return (
    <div className={styles.flightsPage}>
      <FlightSearchSummary 
        from={currentStep === 'outbound' ? from : to} 
        to={currentStep === 'outbound' ? to : from} 
        departDate={currentStep === 'outbound' ? departDate : returnDate} 
        returnDate={isRoundTrip ? returnDate : ''}
        passengers={adults + children}
      />
      
      <div className={styles.flightsContainer}>
        <aside className={styles.filterSidebar}>
          <FlightFilter 
            onFilterChange={applyFilters} 
            initialFilters={filters}
          />
        </aside>
        
        <main className={styles.flightResults}>
          {currentLoading ? (
            <div className="flex justify-center items-center min-h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : currentFlights.length > 0 ? (
            <>
              <FlightList 
                flights={currentFlights}
                returnFlights={filteredReturnFlights}
                isRoundTrip={isRoundTrip}
                passengers={adults + children}
                currentStep={currentStep}
                onOutboundFlightSelected={handleOutboundFlightSelected}
                onBackToOutbound={handleBackToOutbound}
                initialSelectedOutboundFlight={selectedOutboundFlight}
                currentPage={currentStep === 'outbound' ? currentPage : returnCurrentPage}
                totalPages={currentStep === 'outbound' ? totalPages : returnTotalPages}
                totalFlights={currentStep === 'outbound' ? totalFlights : returnTotalFlights}
                limit={limit}
                onPageChange={(page) => {
                  if (currentStep === 'outbound') {
                    setCurrentPage(page);
                  } else {
                    setReturnCurrentPage(page);
                  }
                }}
              />
            </>
          ) : (
            <div className={styles.noResults}>
              <h2>Không tìm thấy chuyến bay phù hợp</h2>
              <p>Vui lòng thử lại với các tiêu chí khác</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}