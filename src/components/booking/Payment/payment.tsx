import React from 'react';
import styles from './payment.module.scss';

interface PaymentSuccessProps {
  bookingCode: string;
  onReturnHome: () => void;
  isRoundTrip?: boolean;
}

const Payment: React.FC<PaymentSuccessProps> = ({
  bookingCode = "ABC123",
  onReturnHome,
  isRoundTrip,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.successIcon}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="#4CAF50"/>
            <path 
              d="M25 40L35 50L55 30" 
              stroke="white" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1 className={styles.title}>Thanh toán thành công</h1>
        
        <div className={styles.bookingInfo}>
          <p className={styles.bookingLabel}>Mã đặt vé của bạn là:</p>
          <div className={styles.bookingCode}>{bookingCode}</div>
        </div>
        
        <div className={styles.message}>
          <p>Cảm ơn quý khách đã đặt vé. Chúc quý khách có chuyến bay vui vẻ!</p>
        </div>
        
        <button 
          className={styles.homeButton}
          onClick={onReturnHome}
        >
          Quay về trang chủ
        </button>
      </div>
      
      <div className={styles.notification}>
        <div className={styles.notificationContent}>
          <h2>Thanh toán thành công</h2>
          <p>Cảm ơn quý khách đã đặt vé. Chúc quý khách có chuyến bay vui vẻ!</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
