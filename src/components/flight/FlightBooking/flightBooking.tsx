import React, { useState, useEffect } from 'react';
import FlightList from '../FlightList/flightList';
import Passenger from '../../booking/Passenger/passenger';
import Seat from '../../booking/Seat/seat';
import Payment from '../../booking/Payment/payment';
import ReviewBooking from '../../booking/ReviewBooking/ReviewBooking';
import styles from './flightBooking.module.scss';

// Define Flight interface
interface Flight {
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
  available_seats: number;
  status: string;
  route: {
    from: string;
    to: string;
  };
  departure_date: string;
  aircraft_type: string;
  airline: string;
}

interface PassengerData {
  idNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female';
  address: string;
}

interface FlightDetails {
  flightNumber: string;
  departure: {
    time: string;
    code: string;
  };
  arrival: {
    time: string;
    code: string;
  };
  date: string;
  duration: string;
  passengers: string;
  paymentMethod: string;
  price: number;
}

// Define component prop interfaces
interface PassengerInfoProps {
  flightDetails: FlightDetails;
  passengerCount: number;
  onSubmit: (passengers: PassengerData[]) => void;
  isRoundTrip?: boolean;
  returnFlightDetails?: FlightDetails;
}

interface SeatSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (seats: string[]) => void;
  passengerCount: number;
  flightNumber: string;
  isRoundTrip?: boolean;
  returnFlightNumber?: string;
}

interface ReviewBookingProps {
  passengerData: PassengerData[];
  selectedSeats: string[];
  flightDetails: FlightDetails;
  returnFlightDetails?: FlightDetails;
  isRoundTrip?: boolean;
  onConfirm: () => void;
}

interface PaymentSuccessProps {
  bookingCode: string;
  onReturnHome: () => void;
  isRoundTrip?: boolean;
}

// Cập nhật kiểu dữ liệu BookingStep với 3 bước riêng biệt
type BookingStep = 'passenger-seat' | 'review-booking' | 'payment-success';

const FlightBookingApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('passenger-seat');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [passengerCount, setPassengerCount] = useState(1);
  
  // Selected flight data
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(null);
  const [selectedFareType, setSelectedFareType] = useState<'economy' | 'business'>('economy');
  
  // Passenger data
  const [passengerData, setPassengerData] = useState<PassengerData[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Booking data
  const [bookingCode, setBookingCode] = useState<string>('');

  // State để lưu ngày chuyến bay
  const [flightDate, setFlightDate] = useState<string>('');

  // State để kiểm soát việc hiển thị popup chọn ghế
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

  // State để kiểm soát trạng thái loading
  const [isLoading, setIsLoading] = useState(false);

  // Effect để tải dữ liệu booking từ localStorage khi component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookingData = localStorage.getItem('selectedBooking');
      if (bookingData) {
        const data = JSON.parse(bookingData);
        console.log('Loaded booking data:', data);
        
        // Set outbound flight data
        setSelectedOutboundFlight(data.outboundFlight.flight);
        setSelectedFareType(data.outboundFlight.fareType);
        setPassengerCount(data.passengers);
        setTripType(data.isRoundTrip ? 'round-trip' : 'one-way');
        
        // Set return flight data if it's a round trip
        if (data.isRoundTrip && data.returnFlight) {
          setSelectedReturnFlight(data.returnFlight.flight);
        }
        
        setCurrentStep('passenger-seat');
      } else {
        console.error("Error: No booking data found in localStorage.");
        // Redirect to flights page if no booking data
        window.location.href = '/flights';
      }
    }
  }, []);

  const handlePassengerSubmit = (passengers: PassengerData[]) => {
    setPassengerData(passengers);
    // Mở popup chọn ghế sau khi điền thông tin hành khách
    setIsSeatModalOpen(true);
  };

  const handleSeatConfirm = (seats: string[]) => {
    setSelectedSeats(seats);
    setIsSeatModalOpen(false);
    // Sau khi chọn ghế xong, chuyển sang bước xem lại
    setCurrentStep('review-booking');
  };

  const handleOpenSeatModal = () => {
    if (passengerData.length > 0) {
      setIsSeatModalOpen(true);
    } else {
      alert('Vui lòng điền thông tin hành khách trước khi chọn ghế');
    }
  };

  // Hàm mới để xác nhận booking và chuyển sang thanh toán
  const handleReviewConfirm = async () => {
    try {
      setIsLoading(true);
      
      // Get the first passenger data since we're handling single passenger case
      const passenger = passengerData[0];
      const flightDetails = getFlightDetails();
      
      if (!selectedOutboundFlight) {
        throw new Error('Không tìm thấy thông tin chuyến bay');
      }

      if (!passenger) {
        throw new Error('Không tìm thấy thông tin hành khách');
      }

      if (!selectedSeats.length) {
        throw new Error('Vui lòng chọn ghế');
      }

      // Format date to YYYY-MM-DD
      const formattedBirthDate = new Date(passenger.birthDate).toISOString().split('T')[0];
      
      // Prepare the booking data
      const bookingData = {
        user_id: 11, // This should come from your authentication system
        flight_id: selectedOutboundFlight.flight_id,
        seat_id: parseInt(selectedSeats[0]), // Convert seat string to number
        total_amount: flightDetails[0].price,
        price: flightDetails[0].price,
        status: "confirmed",
        customer: {
          first_name: passenger.firstName,
          last_name: passenger.lastName,
          address: passenger.address,
          gender: passenger.gender,
          date_of_birth: formattedBirthDate,
          id_card_number: passenger.idNumber,
          status: "confirmed"
        }
      };

      console.log('Sending booking data:', bookingData); // Debug log

      // Make the API call
      const response = await fetch('http://localhost:4000/bookings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Đặt vé thất bại');
      }
      
      // Set booking code from response
      setBookingCode(responseData.bookingCode || 'VN' + Math.random().toString(36).substr(2, 6).toUpperCase());
      
      // Clear booking data from localStorage
      localStorage.removeItem('selectedBooking');
      
      // Move to success step
      setCurrentStep('payment-success');
    } catch (error: any) {
      console.error('Error making booking:', error);
      alert(error.message || 'Có lỗi xảy ra khi đặt vé. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }

  // Hàm xử lý quay lại bước trước (điều chỉnh cho 3 bước)
  const handleGoBack = () => {
    switch (currentStep) {
      case 'review-booking':
        setCurrentStep('passenger-seat'); // Quay lại bước Thông tin hành khách và chọn ghế
        break;
      case 'payment-success':
        setCurrentStep('review-booking'); // Quay lại bước Xem lại
        break;
      default:
        // Không làm gì ở bước đầu tiên
        break;
    }
  };

  const handleReturnHome = () => {
    localStorage.removeItem('selectedBooking');
    setCurrentStep('passenger-seat'); // Reset về bước đầu tiên của component này
    setSelectedOutboundFlight(null);
    setSelectedReturnFlight(null);
    setPassengerData([]);
    setSelectedSeats([]);
    setBookingCode('');
    // Ví dụ: window.location.href = '/';
  };

  // Generate flight details
  const getFlightDetails = (): FlightDetails[] => {
    const details: FlightDetails[] = [];

    // Add outbound flight details
    if (selectedOutboundFlight) {
      const outboundPrice = selectedOutboundFlight.price[selectedFareType];
      details.push({
        flightNumber: selectedOutboundFlight.flight_number,
        departure: {
          time: selectedOutboundFlight.departure.time,
          code: selectedOutboundFlight.departure.code
        },
        arrival: {
          time: selectedOutboundFlight.arrival.time,
          code: selectedOutboundFlight.arrival.code
        },
        date: selectedOutboundFlight.departure_date,
        duration: selectedOutboundFlight.duration,
        passengers: `${passengerCount} Người lớn/ Trẻ em`,
        paymentMethod: 'Chưa chọn',
        price: outboundPrice * passengerCount
      });
    }

    // Add return flight details if it's a round trip
    if (tripType === 'round-trip' && selectedReturnFlight) {
      const returnPrice = selectedReturnFlight.price[selectedFareType];
      details.push({
        flightNumber: selectedReturnFlight.flight_number,
        departure: {
          time: selectedReturnFlight.departure.time,
          code: selectedReturnFlight.departure.code
        },
        arrival: {
          time: selectedReturnFlight.arrival.time,
          code: selectedReturnFlight.arrival.code
        },
        date: selectedReturnFlight.departure_date,
        duration: selectedReturnFlight.duration,
        passengers: `${passengerCount} Người lớn/ Trẻ em`,
        paymentMethod: 'Chưa chọn',
        price: returnPrice * passengerCount
      });
    }

    return details;
  };

  // Render step hiện tại
  const renderCurrentStep = () => {
    // Hiển thị lỗi nếu không có thông tin chuyến bay (trừ bước cuối cùng)
    if (!selectedOutboundFlight && currentStep !== 'payment-success') {
      return <div className={styles.stepContainer}>Không tìm thấy thông tin chuyến bay. Vui lòng quay lại trang chọn chuyến bay.</div>;
    }

    const flightDetails = getFlightDetails();

    switch (currentStep) {
      case 'passenger-seat':
        if (!selectedOutboundFlight) return <div>Không tìm thấy thông tin chuyến bay. Vui lòng quay lại trang chọn chuyến bay.</div>;
        return (
          <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
            <div className={styles.bookingHeader}>
              <h2>Thông tin hành khách và chọn ghế</h2>
            </div>
            <Passenger
              flightDetails={flightDetails[0]}
              passengerCount={passengerCount}
              onSubmit={handlePassengerSubmit}
              isRoundTrip={tripType === 'round-trip'}
              returnFlightDetails={flightDetails[1]}
            />
            <Seat
              isOpen={isSeatModalOpen}
              onClose={() => setIsSeatModalOpen(false)}
              onConfirm={handleSeatConfirm}
              passengerCount={passengerCount}
              flightNumber={selectedOutboundFlight.flight_number}
              isRoundTrip={tripType === 'round-trip'}
              returnFlightNumber={selectedReturnFlight?.flight_number}
            />
          </div>
        );
      
      case 'review-booking':
        return (
          <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
            <ReviewBooking
              passengerData={passengerData}
              selectedSeats={selectedSeats}
              flightDetails={flightDetails[0]}
              returnFlightDetails={flightDetails[1]}
              isRoundTrip={tripType === 'round-trip'}
              onConfirm={handleReviewConfirm}
            />
            <button onClick={handleGoBack} className={`${styles.button} ${styles.secondary}`} style={{ marginTop: '20px' }}>Quay lại</button>
          </div>
        );
      
      case 'payment-success':
        return (
          <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
            <Payment
              bookingCode={bookingCode}
              onReturnHome={handleReturnHome}
              isRoundTrip={tripType === 'round-trip'}
            />
          </div>
        );
      
      default:
        return <div>Có lỗi xảy ra hoặc đang tải dữ liệu...</div>;
    }
  };

  return (
    <div className={styles.flightBookingApp}>
      {/* Progress Bar với 3 bước */}
      <div className={styles.progressBar}>
        {/* Bước 1: Thông tin hành khách và chọn ghế */} 
        <div className={`${styles.step} ${currentStep === 'passenger-seat' ? styles.active : ''} ${(currentStep === 'review-booking' || currentStep === 'payment-success') ? styles.completed : ''}`}>
          <div className={styles.stepNumber}>1</div> 
          <div className={styles.stepLabel}>Thông tin hành khách và chọn ghế</div>
        </div>
        {/* Bước 2: Xem lại */} 
        <div className={`${styles.step} ${currentStep === 'review-booking' ? styles.active : ''} ${currentStep === 'payment-success' ? styles.completed : ''}`}>
          <div className={styles.stepNumber}>2</div> 
          <div className={styles.stepLabel}>Xem lại</div>
        </div>
        {/* Bước 3: Thanh toán */} 
        <div className={`${styles.step} ${currentStep === 'payment-success' ? styles.active : ''}`}>
          <div className={styles.stepNumber}>3</div> 
          <div className={styles.stepLabel}>Thanh toán</div>
        </div>
      </div>
      
      {/* Render nội dung step hiện tại */} 
      {renderCurrentStep()}
    </div>
  );
};

export default FlightBookingApp;