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
  
  // Get search params
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('date') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const adults = Number(searchParams.get('adults') || 1);
  const children = Number(searchParams.get('children') || 0);
  
  useEffect(() => {
    const loadFlights = async () => {
      try {
        setIsLoading(true);
        let response;

        // If search parameters exist, use search API
        if (from && to && departDate) {
          response = await flightService.searchFlights({
            from,
            to,
            departDate,
            adults,
            children
          });
          setFlights(response.flights);
          setFilteredFlights(response.flights);
        } else {
          // Otherwise, get all flights
          const allFlights = await flightService.getAllFlights();
          // Transform backend data to match Flight interface
          const transformedFlights: Flight[] = allFlights.map((flight: any) => ({
            id: flight.flight_id.toString(),
            flight_id: flight.flight_id,
            flight_number: flight.flight_number,
            departure: {
              airport: `Sân bay ${flight.departure_airport_id}`,
              code: flight.departure_airport_id.toString(),
              time: new Date(flight.departure_time).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })
            },
            arrival: {
              airport: `Sân bay ${flight.destination_airport_id}`,
              code: flight.destination_airport_id.toString(),
              time: new Date(flight.arrival_time).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })
            },
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            duration: calculateDuration(flight.departure_time, flight.arrival_time),
            price: {
              economy: parseInt(flight.price_economy),
              business: parseInt(flight.price_business)
            },
            prices: {
              economy: parseInt(flight.price_economy),
              business: parseInt(flight.price_business)
            },
            seatsLeft: flight.available_seats,
            available_seats: flight.available_seats,
            status: flight.status,
            route: flight.route
          }));
          setFlights(transformedFlights);
          setFilteredFlights(transformedFlights);
        }
      } catch (error) {
        console.error('Error loading flights:', error);
        toast.error('Có lỗi xảy ra khi tải danh sách chuyến bay');
      } finally {
        setIsLoading(false);
      }
    };

    loadFlights();
  }, [from, to, departDate, adults, children]);

  const applyFilters = (filters: any) => {
    // Apply filters to the flights
    let results = [...flights];
    
    // Price filter
    if (filters.minPrice && filters.maxPrice) {
      results = results.filter(
        flight => flight.price.economy >= filters.minPrice && 
                 flight.price.economy <= filters.maxPrice
      );
    }
    
    // Time of day filter
    if (filters.timeOfDay) {
      const timeFilters = {
        morning: (time: string) => {
          const hour = parseInt(time.split(':')[0]);
          return hour >= 0 && hour < 12;
        },
        afternoon: (time: string) => {
          const hour = parseInt(time.split(':')[0]);
          return hour >= 12 && hour < 18;
        },
        evening: (time: string) => {
          const hour = parseInt(time.split(':')[0]);
          return hour >= 18 && hour < 24;
        },
      };
      
      if (filters.timeOfDay !== 'all') {
        results = results.filter(flight => 
          timeFilters[filters.timeOfDay as keyof typeof timeFilters](flight.departure.time)
        );
      }
    }
    
    setFilteredFlights(results);
  };

  // Helper function to calculate flight duration
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
          <FlightFilter onFilterChange={applyFilters} />
        </aside>
        
        <main className={styles.flightResults}>
          {filteredFlights.length > 0 ? (
            <FlightList 
              flights={filteredFlights} 
              isRoundTrip={!!returnDate}
              passengers={adults + children}
            />
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