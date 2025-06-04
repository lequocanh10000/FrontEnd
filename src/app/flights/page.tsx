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
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFlights, setTotalFlights] = useState(0);
  const limit = 3;
  const [filters, setFilters] = useState<{
    minPrice?: number;
    maxPrice?: number;
    timeOfDay?: string;
  }>({});
  
  // Get search params
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('departDate') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const adults = Number(searchParams.get('adults') || 1);
  const children = Number(searchParams.get('children') || 0);
  
  useEffect(() => {
    const loadFlights = async () => {
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
            tripType: searchParams.get('tripType') as 'oneWay' | 'roundTrip',
            ...(searchParams.get('tripType') === 'roundTrip' && returnDate && { returnDate: returnDate }),
            page: currentPage,
            limit: limit,
            ...filterParams
          };

          console.log('Search params:', searchParamsForApi); // Debug log
          response = await flightService.searchFlights(searchParamsForApi);
        } else {
          // Get paginated flights with filters
          console.log('Filter params:', filterParams); // Debug log
          response = await flightService.getPaginatedFlights(currentPage, limit, filterParams);
        }

        const transformedFlights: Flight[] = response.flights.map((flight: any) => {
          console.log('Original flight data:', flight); // Debug log
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
          console.log('Transformed flight data:', transformed); // Debug log
          return transformed;
        });

        setFlights(transformedFlights);
        setFilteredFlights(transformedFlights);
        setTotalFlights(response.pagination.total);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Error loading flights:', error);
        toast.error('Có lỗi xảy ra khi tải danh sách chuyến bay');
      } finally {
        setIsLoading(false);
      }
    };

    loadFlights();
  }, [from, to, departDate, adults, children, currentPage, filters]);

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
    console.log('Applying new filters:', newFilters); // Debug log
    // Reset to first page when applying new filters
    setCurrentPage(1);
    // Store filters to be used in the next API call
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={styles.flightsPage}>
      <FlightSearchSummary 
        from={from} 
        to={to} 
        departDate={departDate} 
        returnDate={returnDate}
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
          {filteredFlights.length > 0 ? (
            <>
              <FlightList 
                flights={filteredFlights} 
                isRoundTrip={!!returnDate}
                passengers={adults + children}
              />
              
              {/* Pagination */}
              <div className={styles.pagination}>
                <div className={styles.paginationInfo}>
                  Hiển thị {((currentPage - 1) * limit) + 1} đến {Math.min(currentPage * limit, totalFlights)} trong tổng số {totalFlights} chuyến bay
                </div>
                <div className={styles.paginationControls}>
                  <button
                    className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
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