"use client"; // Required for client-side interactivity

import { useState, FormEvent } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GoArrowSwitch, GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import AirportInput from "../../airportInput/airportInput";
import styles from "./flightSearch.module.scss"; // You'll need to create this file
import flightService from "@/api/services/flightService";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightSearch = () => {
  const router = useRouter();
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("round-trip");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
  });

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if ((name === "from" || name === "to") && value.includes("(") && value.includes(")")) {
      const codeMatch = value.match(/\(([A-Z]{3})\)/);
      if (codeMatch) {
        setFormData((prev) => ({
          ...prev,
          [name]: codeMatch[1],
        }));
        return;
      }
    }

    // Handle date validation
    if (name === "departDate") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        // Reset return date if it's before the new depart date
        returnDate: prev.returnDate && prev.returnDate < value ? "" : prev.returnDate,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate search parameters
      const validation = flightService.validateSearchParams(formData);
      if (!validation.isValid) {
        validation.errors.forEach(error => toast.error(error));
        return;
      }

      // Call the API
      const response = await flightService.searchFlights({
        from: formData.from,
        to: formData.to,
        departDate: formData.departDate,
        returnDate: tripType === "round-trip" ? formData.returnDate : undefined,
        adults: formData.adults,
        children: formData.children
      });

      if (response.success) {
        // Store the search results in localStorage
        localStorage.setItem('searchResults', JSON.stringify(response));
        
        // Navigate to results page
        router.push(`/flights/results?from=${formData.from}&to=${formData.to}&date=${formData.departDate}`);
      } else {
        toast.error("Không tìm thấy chuyến bay phù hợp!");
      }
    } catch (error) {
      console.error('Error searching flights:', error);
      toast.error("Có lỗi xảy ra khi tìm kiếm chuyến bay!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="searchForm" className={styles.flightSearchCard}>
      <form onSubmit={handleSubmit}>
        <div className={styles.tripTypeTop}>
          <button
            className={tripType === "round-trip" ? styles.active : ""}
            onClick={() => setTripType("round-trip")}
            type="button"
          >
            <GoArrowSwitch className={styles.icon} /> Khứ hồi
          </button>
          <button
            className={tripType === "one-way" ? styles.active : ""}
            onClick={() => setTripType("one-way")}
            type="button"
          >
            <GoArrowRight className={styles.icon} /> Một chiều
          </button>
        </div>

        <AirportInput
          label="Điểm đi"
          icon={FaPlaneDeparture}
          name="from"
          value={formData.from}
          onChange={handleInputChange}
        />

        <AirportInput
          label="Điểm đến"
          icon={FaPlaneArrival}
          name="to"
          value={formData.to}
          onChange={handleInputChange}
        />

        <div className={styles.dateInput}>
          <label htmlFor="departDate">
            <FaCalendarAlt className={styles.icon} /> Ngày đi
          </label>
          <input
            type="date"
            id="departDate"
            name="departDate"
            value={formData.departDate}
            onChange={handleInputChange}
            min={getTodayDate()}
            required
          />
        </div>

        {tripType === "round-trip" && (
          <div className={styles.dateInput}>
            <label htmlFor="returnDate">
              <FaCalendarAlt className={styles.icon} /> Ngày về
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              min={formData.departDate || getTodayDate()}
              required={tripType === "round-trip"}
            />
          </div>
        )}

        <div className={styles.passengersDiv}>
          <label>
            <FiUsers className={styles.icon} /> Hành khách
          </label>
          <div className={styles.passengerInputs}>
            <div className={styles.passengerType}>
              <label htmlFor="adults">Người lớn (&gt;= 12 tuổi)</label>
              <input
                type="number"
                id="adults"
                name="adults"
                min="1"
                max="9"
                value={formData.adults}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.passengerType}>
              <label htmlFor="children">Trẻ em (2-11 tuổi)</label>
              <input
                type="number"
                id="children"
                name="children"
                min="0"
                max="8"
                value={formData.children}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className={styles.searchBtn}
          disabled={isLoading}
        >
          {isLoading ? "Đang tìm kiếm..." : "Tìm chuyến bay"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FlightSearch;