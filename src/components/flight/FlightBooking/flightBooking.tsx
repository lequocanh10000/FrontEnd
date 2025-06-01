import React, { useState, useEffect } from 'react';
import FlightList, { Flight } from '../FlightList/flightList';
import Passenger from '../../booking/Passenger/passenger';
import Seat from '../../booking/Seat/seat';
import Payment from '../../booking/Payment/payment';
import ReviewBooking from '../../booking/ReviewBooking/ReviewBooking';
import styles from './flightBooking.module.scss';

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

// Cập nhật kiểu dữ liệu BookingStep với 4 bước riêng biệt
type BookingStep = 'passenger-info' | 'seat-selection' | 'review-booking' | 'payment-success';

const FlightBookingApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('passenger-info');
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

  // Effect để tải dữ liệu booking từ localStorage khi component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookingData = localStorage.getItem('selectedBooking');
      if (bookingData) {
        const data = JSON.parse(bookingData);
        setSelectedOutboundFlight(data.flight);
        setSelectedFareType(data.fareType);
        setPassengerCount(data.passengers);
        setFlightDate(data.date || 'N/A');
        setCurrentStep('passenger-info'); // Bắt đầu từ bước passenger-info
      } else {
        console.error("Error: No booking data found in localStorage.");
        // Có thể xử lý lỗi hoặc redirect ở đây
      }
    }
  }, []);

  // Hàm này không còn sử dụng
  const handleFlightSelect = (flight: Flight, fareType: 'economy' | 'business') => {
    // Logic cho việc chọn chuyến bay (nếu cần ở trang khác)
  };

  const handlePassengerSubmit = (passengers: PassengerData[]) => {
    setPassengerData(passengers);
    // Sau khi submit thông tin hành khách, chuyển sang bước Chọn ghế
    setCurrentStep('seat-selection');
  };

  const handleSeatConfirm = (seats: string[]) => {
    setSelectedSeats(seats);
    // Sau khi xác nhận ghế, chuyển sang bước Xem lại
    setCurrentStep('review-booking');
  };

  // Hàm mới để xác nhận booking và chuyển sang thanh toán
  const handleReviewConfirm = () => {
     // Simulate payment processing
     setTimeout(() => {
      const randomBookingCode = 'VN' + Math.random().toString(36).substr(2, 6).toUpperCase();
      setBookingCode(randomBookingCode);
      setCurrentStep('payment-success');
    }, 1000);
  }

  // Hàm xử lý quay lại bước trước (điều chỉnh cho 4 bước)
  const handleGoBack = () => {
    switch (currentStep) {
      case 'seat-selection':
        setCurrentStep('passenger-info'); // Quay lại bước Thông tin hành khách
        break;
      case 'review-booking':
        setCurrentStep('seat-selection'); // Quay lại bước Chọn ghế
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
    setCurrentStep('passenger-info'); // Reset về bước đầu tiên của component này
    setSelectedOutboundFlight(null);
    setSelectedReturnFlight(null);
    setPassengerData([]);
    setSelectedSeats([]);
    setBookingCode('');
    // Ví dụ: window.location.href = '/';
  };

  // Generate flight details
  const getFlightDetails = (): FlightDetails => {
    if (!selectedOutboundFlight) {
      return {
        flightNumber: '',
        departure: { time: '', code: '' },
        arrival: { time: '', code: '' },
        date: '',
        duration: '',
        passengers: '',
        paymentMethod: '',
        price: 0
      };
    }

    const basePrice = selectedOutboundFlight.price[selectedFareType];
    const totalPrice = basePrice * passengerCount;

    return {
      flightNumber: selectedOutboundFlight.flightNumber,
      departure: {
        time: selectedOutboundFlight.departure.time,
        code: selectedOutboundFlight.departure.code
      },
      arrival: {
        time: selectedOutboundFlight.arrival.time,
        code: selectedOutboundFlight.arrival.code
      },
      date: flightDate, 
      duration: selectedOutboundFlight.duration,
      passengers: `${passengerCount} Người lớn/ Trẻ em`, 
      paymentMethod: 'Chưa chọn', 
      price: totalPrice
    };
  };

  // Render step hiện tại (điều chỉnh cho 4 bước)
  const renderCurrentStep = () => {
    // Hiển thị lỗi nếu không có thông tin chuyến bay (trừ bước cuối cùng)
    if (!selectedOutboundFlight && currentStep !== 'payment-success') {
       return <div className={styles.stepContainer}>Không tìm thấy thông tin chuyến bay. Vui lòng quay lại trang chọn chuyến bay.</div>; 
    }

    switch (currentStep) {
      case 'passenger-info':
        return (
          <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
            <div className={styles.bookingHeader}>
              <h2>Thông tin hành khách</h2>
            </div>
            <Passenger
              flightDetails={getFlightDetails()}
              passengerCount={passengerCount}
              onSubmit={handlePassengerSubmit}
            />
             {/* Không có nút Quay lại ở bước đầu tiên của component này */}
          </div>
        );
      
      case 'seat-selection': // Bước mới: Chọn ghế (hiển thị trên trang)
         if (!selectedOutboundFlight) return <div>Không tìm thấy thông tin chuyến bay. Vui lòng quay lại trang chọn chuyến bay.</div>; 
        return (
           <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
            <div className={styles.bookingHeader}>
              <h2>Chọn ghế</h2>
            </div>
            {/* Render Seat selection component trực tiếp */} 
            <Seat
              isOpen={true} // Set true khi là step chính
              onClose={() => { /* Khi đóng từ nút X hoặc hành động khác, có thể quay lại */ handleGoBack(); }} 
              onConfirm={handleSeatConfirm}
              passengerCount={passengerCount}
              flightNumber={selectedOutboundFlight?.flightNumber || ''} 
            />
             <button onClick={handleGoBack} className={`${styles.button} ${styles.secondary}`} style={{ marginTop: '20px' }}>Quay lại</button>
          </div>
        );
      
      case 'review-booking':
        return (
           <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
             <ReviewBooking
               passengerData={passengerData}
               selectedSeats={selectedSeats}
               flightDetails={getFlightDetails()}
               onConfirm={handleReviewConfirm}
             />
             {/* Nút Quay lại cho bước xem lại */}
             <button onClick={handleGoBack} className={`${styles.button} ${styles.secondary}`} style={{ marginTop: '20px' }}>Quay lại</button>
           </div>
        );
      
      case 'payment-success': // Bước Thanh toán
        return (
          <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
            <Payment
              bookingCode={bookingCode}
              onReturnHome={handleReturnHome}
            />
            {/* Thường không có nút Quay lại ở trang thành công */}
          </div>
        );
      
      default:
        return <div>Có lỗi xảy ra hoặc đang tải dữ liệu...</div>;
    }
  };

  return (
    <div className={styles.flightBookingApp}>
      {/* Progress Bar với 4 bước */}
      <div className={styles.progressBar}>
        {/* Bước 1: Thông tin hành khách */} 
        <div className={`${styles.step} ${currentStep === 'passenger-info' ? styles.active : ''} ${(currentStep === 'seat-selection' || currentStep === 'review-booking' || currentStep === 'payment-success') ? styles.completed : ''}`}>
          <div className={styles.stepNumber}>1</div> 
          <div className={styles.stepLabel}>Thông tin hành khách</div>
        </div>
        {/* Bước 2: Chọn ghế */} 
        <div className={`${styles.step} ${currentStep === 'seat-selection' ? styles.active : ''} ${(currentStep === 'review-booking' || currentStep === 'payment-success') ? styles.completed : ''}`}>
          <div className={styles.stepNumber}>2</div> 
          <div className={styles.stepLabel}>Chọn ghế</div>
        </div>
        {/* Bước 3: Xem lại */} 
         <div className={`${styles.step} ${currentStep === 'review-booking' ? styles.active : ''} ${currentStep === 'payment-success' ? styles.completed : ''}`}>
          <div className={styles.stepNumber}>3</div> 
          <div className={styles.stepLabel}>Xem lại</div>
        </div>
        {/* Bước 4: Thanh toán */} 
        <div className={`${styles.step} ${currentStep === 'payment-success' ? styles.active : ''}`}>
          <div className={styles.stepNumber}>4</div> 
          <div className={styles.stepLabel}>Thanh toán</div>
        </div>
      </div>
      
      {/* Render nội dung step hiện tại */} 
      {renderCurrentStep()}
    </div>
  );
};

export default FlightBookingApp;