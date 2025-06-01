import React, { useState } from 'react';
import styles from './seat.module.scss';

interface Seat {
  id: string;
  row: number;
  seat: string;
  type: 'economy' | 'business' | 'premium';
  status: 'available' | 'occupied' | 'selected';
  price?: number;
}

interface SeatSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedSeats: string[]) => void;
  passengerCount: number;
  flightNumber: string;
}

const Seat: React.FC<SeatSelectionProps> = ({
  isOpen,
  onClose,
  onConfirm,
  passengerCount,
  flightNumber,
}) => {
  // Mock data cho sơ đồ ghế
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    
    // Business class (rows 1-3)
    for (let row = 1; row <= 3; row++) {
      ['A', 'B', 'C', 'D'].forEach(seatLetter => {
        seats.push({
          id: `${row}${seatLetter}`,
          row,
          seat: seatLetter,
          type: 'business',
          status: Math.random() > 0.7 ? 'occupied' : 'available',
          price: 500000,
        });
      });
    }
    
    // Premium economy (rows 4-6)
    for (let row = 4; row <= 6; row++) {
      ['A', 'B', 'C', 'D', 'E', 'F'].forEach(seatLetter => {
        seats.push({
          id: `${row}${seatLetter}`,
          row,
          seat: seatLetter,
          type: 'premium',
          status: Math.random() > 0.6 ? 'occupied' : 'available',
          price: 200000,
        });
      });
    }
    
    // Economy class (rows 7-30)
    for (let row = 7; row <= 30; row++) {
      ['A', 'B', 'C', 'D', 'E', 'F'].forEach(seatLetter => {
        seats.push({
          id: `${row}${seatLetter}`,
          row,
          seat: seatLetter,
          type: 'economy',
          status: Math.random() > 0.5 ? 'occupied' : 'available',
          price: 0,
        });
      });
    }
    
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'occupied') return;

    if (selectedSeats.includes(seatId)) {
      // Deselect seat
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
      setSeats(prev => prev.map(s => 
        s.id === seatId ? { ...s, status: 'available' } : s
      ));
    } else if (selectedSeats.length < passengerCount) {
      // Select seat
      setSelectedSeats(prev => [...prev, seatId]);
      setSeats(prev => prev.map(s => 
        s.id === seatId ? { ...s, status: 'selected' } : s
      ));
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === passengerCount) {
      onConfirm(selectedSeats);
      onClose();
    }
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + (seat?.price || 0);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  const groupSeatsByRow = () => {
    const grouped: { [key: number]: Seat[] } = {};
    seats.forEach(seat => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    return grouped;
  };

  const seatsByRow = groupSeatsByRow();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Thông tin hành khách</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.flightInfo}>
            <h3>Hành khách 1</h3>
            <div className={styles.passengerDetails}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Số CCCD</span>
                <span className={styles.value}>123456789012</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Họ</span>
                <span className={styles.value}>Nguyen</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Tên</span>
                <span className={styles.value}>Van A</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Số điện thoại</span>
                <span className={styles.value}>0987654321</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Ngày sinh (dd/MM/yyyy)</span>
                <span className={styles.value}>01/01/1990</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Giới tính</span>
                <span className={styles.value}>Chọn giới tính</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Địa chỉ</span>
                <span className={styles.value}>123 Nguyen Trai, Ha Noi</span>
              </div>
            </div>
          </div>

          <div className={styles.seatMapSection}>
            <div className={styles.seatMapHeader}>
              <h3>Chọn ghế ngồi</h3>
              <p>Chọn {passengerCount} ghế cho chuyến bay {flightNumber}</p>
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={`${styles.seatExample} ${styles.available}`}></div>
                <span>Ghế trống</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.seatExample} ${styles.occupied}`}></div>
                <span>Đã được chọn</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.seatExample} ${styles.selected}`}></div>
                <span>Ghế bạn chọn</span>
              </div>
            </div>

            <div className={styles.aircraft}>
              <div className={styles.aircraftBody}>
                {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => {
                  const row = parseInt(rowNum);
                  return (
                    <div key={row} className={styles.seatRow}>
                      <div className={styles.rowNumber}>{row}</div>
                      <div className={styles.seats}>
                        {rowSeats.map((seat, index) => (
                          <React.Fragment key={seat.id}>
                            <button
                              className={`${styles.seat} ${styles[seat.type]} ${styles[seat.status]}`}
                              onClick={() => handleSeatClick(seat.id)}
                              disabled={seat.status === 'occupied'}
                              title={`${seat.id} - ${seat.price ? formatPrice(seat.price) : 'Miễn phí'}`}
                            >
                              {seat.seat}
                            </button>
                            {/* Add aisle space */}
                            {seat.type === 'business' && index === 1 && (
                              <div className={styles.aisle}></div>
                            )}
                            {seat.type !== 'business' && index === 2 && (
                              <div className={styles.aisle}></div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.selectionSummary}>
              <div className={styles.selectedInfo}>
                <h4>Ghế đã chọn: {selectedSeats.join(', ') || 'Chưa chọn ghế nào'}</h4>
                {getTotalPrice() > 0 && (
                  <p className={styles.seatPrice}>
                    Phí chọn ghế: {formatPrice(getTotalPrice())}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button 
            className={styles.saveBtn}
            onClick={handleConfirm}
            disabled={selectedSeats.length !== passengerCount}
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seat;