// src/components/flight/flightList.tsx
import React, { useState } from "react";
import styles from "./flightList.module.scss";
import { FaClock, FaPlane } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flight } from "@/types/flight";
import { GrPowerReset } from "react-icons/gr";
import { RiRefund2Line } from "react-icons/ri";
import { MdLuggage } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";

interface FlightListProps {
  flights: Flight[];
  isRoundTrip: boolean;
  passengers: number;
  onSelect?: (flight: Flight, fareType: 'economy' | 'business', fareDetails?: any) => void;
  selectedFlight?: Flight | null;
  selectedFare?: 'economy' | 'business' | null;
  onDone?: (selected: any) => void;
}

// Modal component
const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

const FlightList: React.FC<FlightListProps> = ({
  flights,
  isRoundTrip,
  passengers,
  onSelect,
  selectedFlight: selectedFlightProp,
  selectedFare: selectedFareProp,
  onDone,
}) => {
  
  // State to track which flight's details are open
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);
  const [selectedFlightForModal, setSelectedFlightForModal] = useState<Flight | null>(null);
  const [selectedFare, setSelectedFare] = useState<null | { flightId: string, classType: 'economy' | 'business' }>(null);
  const [selectedFareIndex, setSelectedFareIndex] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<'outbound' | 'return' | 'passenger-info' | 'payment-success'>('outbound');

  const router = useRouter();

  const handleToggleDetails = (flightId: string) => {
    setOpenDetailId((prev) => (prev === flightId ? null : flightId));
  };

  const handleOpenDetails = (flight: Flight) => {
    setSelectedFlightForModal(flight);
  };
  
  const handleCloseDetails = () => {
    setSelectedFlightForModal(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VND";
  };

  const handleSelectFare = (flight: Flight, classType: 'economy' | 'business') => {
    // Reset selectedFareIndex khi chuyển loại vé
    setSelectedFareIndex(null);
    
    // Toggle hiển thị chi tiết giá vé
    setSelectedFare(
      selectedFare && selectedFare.flightId === flight.id && selectedFare.classType === classType
        ? null
        : { flightId: flight.id, classType }
    );
  };

  // Xử lý khi chọn loại vé cụ thể (Standard/Flexible)
  const handleSelectSpecificFare = (flight: Flight, classType: 'economy' | 'business', fare: any) => {
    // Lưu thông tin vé đã chọn vào localStorage
    const bookingData = {
      flight: flight,
      fareType: classType,
      fareDetail: fare,
      passengers: passengers,
      isRoundTrip: isRoundTrip,
      totalPrice: fare.price * passengers
    };
    localStorage.setItem('selectedBooking', JSON.stringify(bookingData));

    // Chuyển đến trang booking (không phải flight-booking)
    router.push('/booking');
  };

  const handleFlightSelect = (flight: Flight, fareType: 'economy' | 'business') => {
    // Kiểm tra số ghế còn lại
    if (flight.available_seats < passengers) {
      alert('Không đủ ghế cho số lượng hành khách!');
      return;
    }

    if (isRoundTrip) {
      if (!selectedFlightForModal) {
        setSelectedFlightForModal(flight);
        setSelectedFare(
          selectedFare && selectedFare.flightId === flight.id && selectedFare.classType === fareType
            ? null
            : { flightId: flight.id, classType: fareType }
        );
        setCurrentStep('return');
      } else {
        setSelectedFlightForModal(null);
        setSelectedFare(null);
        setCurrentStep('passenger-info');
      }
    } else {
      setSelectedFlightForModal(flight);
      setSelectedFare(null);
      setCurrentStep('passenger-info');
    }
  };

  return (
    <div className={styles.flightListContainer}>
      <div className={styles.flightListHeader}>
        <h2 className={styles.listTitle}>
          Chọn chuyến bay đi
          <span className={styles.subtitle}>
            Vui lòng chọn chuyến bay đi của bạn.
          </span>
        </h2>
      </div>

      {flights.map((flight) => {
        // Define fareDetails inside the map loop to access flight data
        const fareDetails = {
          economy: [
            {
              name: 'Phổ Thông Tiêu Chuẩn',
              price: flight.price.economy, // Use actual economy price
              change: 'Phí đổi vé tối đa 860.000 VND mỗi hành khách',
              refund: 'Phí hoàn vé tối đa 860.000 VND mỗi hành khách',
              baggage: '1 x 23 kg',
              carryon: 'Không quá 12kg',
            },
            // Add other economy fares if needed
          ],
          business: [
            {
              name: 'Thương Gia Tiêu Chuẩn',
              price: flight.price.business, // Use actual business price
              change: 'Miễn phí đổi vé',
              refund: 'Miễn phí hoàn vé',
              baggage: '2 x 32 kg',
              carryon: 'Không quá 18kg',
            },
            // Add other business fares if needed
          ],
        };

        return (
          <div key={flight.id} className={styles.flightCard}>
            <div className={styles.flightRow}>
              <div className={styles.flightInfo}>
                <div className={styles.timeRow}>
                  <div className={styles.timeInfo}>
                    <div className={styles.departureTime}>
                      {flight.departure.time}
                    </div>
                    <div className={styles.airportInfo}>
                      <div className={styles.airportCode}>({flight.departure.code})</div>
                    </div>
                  </div>
                  <div className={styles.flightPath}>
                    <div className={styles.durationInfo}>
                      <span className={styles.duration}>
                        <FaClock className={styles.icon} /> {flight.duration}
                      </span>
                      <div className={styles.flightLine}>
                        <div className={styles.dot}></div>
                        <div className={styles.line}></div>
                        <div className={styles.dot}></div>
                      </div>
                      <span className={styles.flightNumberInfo}>
                        <FaPlane className={styles.icon} /> {flight.flight_number}
                      </span>
                    </div>
                  </div>
                  <div className={styles.timeInfo}>
                    <div className={styles.arrivalTime}>{flight.arrival.time}</div>
                    <div className={styles.airportInfo}>
                      <div className={styles.airportCode}>({flight.arrival.code})</div>
                    </div>
                  </div>
                </div>
                <div className={styles.flightDetails}>
                  <button
                    className={styles.detailsBtn}
                    onClick={() => handleOpenDetails(flight)}
                    aria-expanded={selectedFlightForModal?.id === flight.id}
                  >
                    Chi tiết hành trình <FiInfo className={styles.icon} />
                  </button>
                </div>
              </div>
              <div className={styles.priceSection}>
                <div
                  className={`${styles.fareOption} ${styles.economy} ${
                    selectedFare && selectedFare.flightId === flight.id && selectedFare.classType === 'economy' 
                      ? styles.selected 
                      : ''
                  }`}
                  onClick={() => handleSelectFare(flight, 'economy')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.fareType}>Phổ thông</div>
                  <div className={styles.farePrice}>{formatPrice(flight.price.economy)}</div>
                  <div className={styles.seatsLeft}>Còn {Math.floor(flight.available_seats * 0.7)} ghế</div>
                </div>
                <div
                  className={`${styles.fareOption} ${styles.business} ${
                    selectedFare && selectedFare.flightId === flight.id && selectedFare.classType === 'business' 
                      ? styles.selected 
                      : ''
                  }`}
                  onClick={() => handleSelectFare(flight, 'business')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.fareType}>Thương gia</div>
                  <div className={styles.farePrice}>{formatPrice(flight.price.business)}</div>
                  <div className={styles.seatsLeft}>Còn {Math.floor(flight.available_seats * 0.3)} ghế</div>
                </div>
              </div>
            </div>
            
            {/* Hiển thị chi tiết giá vé khi đã chọn */}
            {selectedFare && selectedFare.flightId === flight.id && (
              <div className={styles.fareDetailSection}>
                <h3 className={styles.fareDetailTitle}>Chọn giá vé</h3>
                <div className={styles.fareDetailList}>
                  {fareDetails[selectedFare.classType].map((fare, idx) => (
                    <div key={idx} className={styles.fareDetailCard}>
                      <div className={styles.fareDetailName}>{fare.name}</div>
                      <div className={styles.fareDetailPrice}>{formatPrice(fare.price)}</div>
                      <ul className={styles.fareDetailInfo}>
                        <li><GrPowerReset /> Thay đổi vé<br /><span>{fare.change}</span></li>
                        <li><RiRefund2Line /> Hoàn vé<br /><span>{fare.refund}</span></li>
                        <li><MdLuggage /> Hành lý ký gửi<br /><span>{fare.baggage}</span></li>
                        <li><BsFillHandbagFill /> Hành lý xách tay<br /><span>{fare.carryon}</span></li>
                      </ul>
                      <button
                        className={styles.fareDetailSelectBtn}
                        onClick={() => handleSelectSpecificFare(flight, selectedFare.classType, fare)}
                      >
                        Chọn
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.fareDetailNote}>
                  Vui lòng chọn loại vé để tiếp tục.
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Modal popup for flight details */}
      <Modal open={!!selectedFlightForModal} onClose={handleCloseDetails}>
        {selectedFlightForModal && (
          <div className={styles.flightDetailCard}>
            <ul>
              <li>
                <b>Thời gian bay dự kiến:</b> {selectedFlightForModal.duration}
              </li>
              <li>
                <b>Số hiệu:</b> {selectedFlightForModal.flight_number}
              </li>
              <li>
                <b>Khởi hành:</b> {selectedFlightForModal.departure.airport} ({selectedFlightForModal.departure.code}) lúc {selectedFlightForModal.departure.time}
              </li>
              <li>
                <b>Đến:</b> {selectedFlightForModal.arrival.airport} ({selectedFlightForModal.arrival.code}) lúc {selectedFlightForModal.arrival.time}
              </li>
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FlightList;