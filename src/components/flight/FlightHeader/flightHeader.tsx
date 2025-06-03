import React from "react"; // Nhập thư viện React để sử dụng JSX và các tính năng của React
import styles from "./flightHeader.module.scss"; // Nhập file CSS module cho style riêng của component
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
} from "react-icons/fa"; // Nhập các icon máy bay và lịch từ thư viện react-icons
import { FiUsers as UsersIcon } from "react-icons/fi"; // Nhập icon người dùng từ react-icons

// Kiểu dữ liệu (interface) cho props gồm: mã sân bay đi, mã sân bay đến, ngày đi, ngày về, số hành khách
interface FlightHeaderProps {
  from: string | null; // Mã sân bay đi
  to: string | null; // Mã sân bay đến
  departDate: string | null; // Ngày đi
  returnDate: string | null; // Ngày về
  passengers: number | null; // Số hành khách
  adults?: number | null;
  children?: number | null;
}

// Định nghĩa component FlightHeader nhận các props theo interface ở trên
const FlightHeader: React.FC<FlightHeaderProps> = ({
  from,
  to,
  departDate,
  returnDate,
  passengers,
  adults,
  children
}) => {
  // Hàm chuyển đổi định dạng ngày từ YYYY-MM-DD sang DD/MM/YYYY
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"; // Nếu không có ngày thì trả về N/A
    const [year, month, day] = dateString.split("-"); // Tách chuỗi ngày thành năm, tháng, ngày
    return `${day}/${month}/${year}`; // Trả về định dạng DD/MM/YYYY
  };

  const formatPassengerCount = () => {
    if (!passengers) return "N/A";
    let text = `${passengers} hành khách`;
    if (adults && children) {
      text = `${adults} người lớn, ${children} trẻ em`;
    }
    return text;
  };


  // JSX trả về giao diện của component
  return (
    <div className={styles.summaryContainer}> {/* Khung tổng chứa toàn bộ thông tin */}
      <div className={styles.routeInfo}> {/* Thông tin về hành trình */}
        <div className={styles.airportCodes}> {/* Hiển thị mã sân bay đi và đến */}
          <span>{from || "N/A"}</span> {/* Mã sân bay đi */}
          <div className={styles.arrow}>→</div> {/* Mũi tên chuyển hướng */}
          <span>{to || "N/A"}</span> {/* Mã sân bay đến */}
        </div>
      </div>

      <div className={styles.tripDetails}> {/* Thông tin chi tiết chuyến đi */}
        <div className={styles.dateInfo}> {/* Thông tin ngày đi và ngày về */}
          <div className={styles.date}> {/* Ngày đi */}
            <FaCalendarAlt className={styles.icon} /> {/* Icon lịch */}
            <div>
              <span className={styles.label}>Chuyến đi</span> {/* Nhãn chuyến đi */}
              <span className={styles.value}>{formatDate(departDate)}</span> {/* Ngày đi đã định dạng */}
            </div>
          </div>

          <div className={styles.date}> {/* Ngày về */}
            <FaCalendarAlt className={styles.icon} /> {/* Icon lịch */}
            <div>
              <span className={styles.label}>Chuyến về</span> {/* Nhãn chuyến về */}
              <span className={styles.value}>{formatDate(returnDate)}</span> {/* Ngày về đã định dạng */}
            </div>
          </div>
        </div>

        <div className={styles.passengerInfo}> {/* Thông tin hành khách */}
          <UsersIcon className={styles.icon} /> {/* Icon người dùng */}
          <div>
            <span className={styles.label}>Hành khách</span> {/* Nhãn hành khách */}
            <span className={styles.value}>{formatPassengerCount()}</span> {/* Số lượng hành khách hoặc N/A */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHeader; // Xuất component để sử dụng ở nơi khác
