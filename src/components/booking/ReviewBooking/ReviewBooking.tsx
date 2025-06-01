import React from 'react';
import styles from './reviewBooking.module.scss'; // Import styles từ FlightBooking
import { PassengerData, FlightDetails } from '../Passenger/passenger'; // Import types PassengerData và FlightDetails từ Passenger.tsx

interface ReviewBookingProps {
  passengerData: PassengerData[];
  selectedSeats: string[];
  flightDetails: FlightDetails; // Thông tin chuyến bay
  onConfirm: () => void; // Hàm xử lý khi user xác nhận
}

const ReviewBooking: React.FC<ReviewBookingProps> = ({
  passengerData,
  selectedSeats,
  flightDetails,
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
      <div className={styles.reviewSection} style={{ marginTop: '20px' }}> {/* Cần style lại */} 
        <h3>Thông tin chuyến bay:</h3>
        <p>Chuyến bay: {flightDetails.flightNumber}</p>
        <p>Điểm đi: {flightDetails.departure.code}</p>
        <p>Điểm đến: {flightDetails.arrival.code}</p>
        <p>Ngày: {flightDetails.date}</p>
        <p>Tổng tiền: {flightDetails.price.toLocaleString('vi-VN')} VND</p>
        {/* Hiển thị thêm các thông tin khác nếu cần */}
      </div>

      {/* Nút xác nhận để chuyển sang bước thanh toán */}
      <button onClick={onConfirm} className={`${styles.button} ${styles.primary}`} style={{ marginTop: '30px' }}>
        Xác nhận và Thanh toán
      </button>
    </div>
  );
};

export default ReviewBooking; 