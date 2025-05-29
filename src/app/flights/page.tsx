"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './pageflight.module.scss';
import FlightList from '../../components/flight/FlightList/flightList';
import FlightFilter from '../../components/flight/FlightFilter/flightFilter';
import FlightSearchSummary from '../../components/flight/FlightHeader/flightHeader';

interface Flight {
  id: string;
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
  duration: string;
  flightNumber: string;
  price: {
    economy: number;
    business: number;
  };
  seatsLeft: number;
}

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get search params
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('departDate') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const adults = Number(searchParams.get('adults') || 1);
  const children = Number(searchParams.get('children') || 0);
  
  // Mock data fetching based on search params
  useEffect(() => {
    const fetchFlights = async () => {
      // In a real app, you would fetch from an API
      // For now, we'll simulate with mock data
      setIsLoading(true);

      // Mock flight data
      const mockFlights: Flight[] = [
        {
          id: 'VN834',
          departure: {
            airport: 'Hà Nội',
            code: 'HAN',
            time: '07:45',
          },
          arrival: {
            airport: 'TP. Hồ Chí Minh',
            code: 'SGN',
            time: '09:00',
          },
          duration: '1 giờ 15 phút',
          flightNumber: 'VN834',
          price: {
            economy: 1200000,
            business: 1900000,
          },
          seatsLeft: 63,
        },
        {
          id: 'VN359',
          departure: {
            airport: 'Hà Nội',
            code: 'HAN',
            time: '15:00',
          },
          arrival: {
            airport: 'TP. Hồ Chí Minh',
            code: 'SGN',
            time: '17:30',
          },
          duration: '2 giờ 30 phút',
          flightNumber: 'VN359',
          price: {
            economy: 1800000,
            business: 2400000,
          },
          seatsLeft: 57,
        },
        {
          id: 'VN123',
          departure: {
            airport: 'Hà Nội',
            code: 'HAN',
            time: '12:30',
          },
          arrival: {
            airport: 'TP. Hồ Chí Minh',
            code: 'SGN',
            time: '14:15',
          },
          duration: '1 giờ 45 phút',
          flightNumber: 'VN123',
          price: {
            economy: 1450000,
            business: 2100000,
          },
          seatsLeft: 42,
        },
      ];

      // Simulate network delay
      setTimeout(() => {
        setFlights(mockFlights);
        setFilteredFlights(mockFlights);
        setIsLoading(false);
      }, 1000);
    };

    fetchFlights();
  }, [from, to, departDate]);

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
          {isLoading ? (
            <div className={styles.loadingState}>Đang tìm kiếm chuyến bay...</div>
          ) : filteredFlights.length > 0 ? (
            <FlightList 
              flights={filteredFlights} 
              isRoundTrip={!!returnDate}
              passengers={adults + children}
            />
          ) : (
            <div className={styles.noResults}>
              Không tìm thấy chuyến bay phù hợp. Vui lòng thử lại với các điều kiện khác.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}