import React from 'react';
import styles from './reviewBooking.module.scss'; // Import styles từ FlightBooking
import { PassengerData, FlightDetails } from '../Passenger/passenger'; // Import types PassengerData và FlightDetails từ Passenger.tsx

interface ReviewBookingProps {
  passengerData: PassengerData[];
  selectedSeats: string[];
  flightDetails: FlightDetails;
  returnFlightDetails?: FlightDetails;
  isRoundTrip?: boolean;
  onConfirm: () => void;
}

const ReviewBooking: React.FC<ReviewBookingProps> = ({
  passengerData,
  selectedSeats,
  flightDetails,
  returnFlightDetails,
  isRoundTrip,
  onConfirm,
}) => {
  return (
    <div className={`${styles.stepContainer} ${styles.stepTransition}`}>
      <div className={styles.bookingHeader}>
        <h2>Xem lại Booking</h2>
      </div>

      {/* Hiển thị thông tin hành khách đã nhập */}
      <div className={styles.reviewSection}> {/* Cần style cho section này */} 
        <h3>Thông tin hành khách:</h3>
        {passengerData.length > 0 ? (
          passengerData.map((p, index) => (
            <div key={index} className={styles.passengerInfoItem}> {/* Cần style cho item này */}
              <p><strong>{`Hành khách ${index + 1}:`}</strong> {`${p.firstName} ${p.lastName}`}</p>
              <p>CMND/CCCD: {p.idNumber}</p>
              <p>Điện thoại: {p.phone}</p>
              <p>Ngày sinh: {p.birthDate}</p>
              <p>Giới tính: {p.gender === 'male' ? 'Nam' : 'Nữ'}</p>
              {/* Hiển thị thêm các thông tin khác nếu cần */}
            </div>
          ))
        ) : (
           <p>Không có thông tin hành khách.</p>
        )}
      </div>

      {/* Hiển thị ghế đã chọn */}
      <div className={styles.reviewSection} style={{ marginTop: '20px' }}> {/* Cần style lại */} 
        <h3>Ghế đã chọn:</h3>
        {selectedSeats.length > 0 ? (
          <p className={styles.selectedSeatsList}>{selectedSeats.join(', ')}</p>
        ) : (
          <p>Chưa chọn ghế.</p>
        )}
      </div>

      {/* Hiển thị thông tin chuyến bay */}
      <div className={styles.reviewSection} style={{ marginTop: '20px' }}> 
        <h3>Thông tin chuyến bay đi:</h3>
        <p>Chuyến bay: {flightDetails.flightNumber}</p>
        <p>Điểm đi: {flightDetails.departure.code}</p>
        <p>Điểm đến: {flightDetails.arrival.code}</p>
        <p>Ngày: {flightDetails.date}</p>
        <p>Giá vé: {flightDetails.price.toLocaleString('vi-VN')} VND</p>
      </div>

      {/* Hiển thị thông tin chuyến bay về nếu là chuyến khứ hồi */}
      {isRoundTrip && returnFlightDetails && (
        <div className={styles.reviewSection} style={{ marginTop: '20px' }}>
          <h3>Thông tin chuyến bay về:</h3>
          <p>Chuyến bay: {returnFlightDetails.flightNumber}</p>
          <p>Điểm đi: {returnFlightDetails.departure.code}</p>
          <p>Điểm đến: {returnFlightDetails.arrival.code}</p>
          <p>Ngày: {returnFlightDetails.date}</p>
          <p>Giá vé: {returnFlightDetails.price.toLocaleString('vi-VN')} VND</p>
        </div>
      )}

      {/* Hiển thị tổng tiền */}
      <div className={styles.reviewSection} style={{ marginTop: '20px' }}>
        <h3>Tổng tiền:</h3>
        <p className={styles.totalPrice}>
          {(isRoundTrip && returnFlightDetails 
            ? flightDetails.price + returnFlightDetails.price 
            : flightDetails.price).toLocaleString('vi-VN')} VND
        </p>
      </div>

      {/* Nút xác nhận để chuyển sang bước thanh toán */}
      <button onClick={onConfirm} className={`${styles.button} ${styles.primary}`} style={{ marginTop: '30px' }}>
        Xác nhận và Thanh toán
      </button>
    </div>
  );
};

export default ReviewBooking; 