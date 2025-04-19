"use client"; // Required for client-side interactivity

import { useState } from "react";
import styles from "./heroSection.module.scss";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GoArrowSwitch, GoArrowRight } from "react-icons/go";
import AirportInput from "../../AirportInput/airportInput";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const [tripType, setTripType] = useState<"round-trip" | "one-way">(
    "round-trip"
  );
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      (name === "from" || name === "to") &&
      value.includes("(") &&
      value.includes(")")
    ) {
      const codeMatch = value.match(/\(([A-Z]{3})\)/);
      if (codeMatch) {
        setFormData((prev) => ({
          ...prev,
          [name]: codeMatch[1],
        }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section className={styles.home}>
      <div className={styles.secContainer}>
        <div className={styles.homeText}>
          <h1 className={styles.title}>
            Nâng tầm hành trình của bạn cùng với <span>QAirline</span>
          </h1>
          <p className={styles.subTitle}>
            Chúng tôi biến mọi hành trình trên bầu trời thành ký ức không thể
            quên
          </p>
          <button className={styles.btn}>
            <Link href="/">Đặt vé ngay</Link>
          </button>
        </div>

        <div className={styles.homeCard}>
          <div className={styles.tripTypeTop}>
            <button
              className={tripType === "round-trip" ? styles.active : ""}
              onClick={() => setTripType("round-trip")}
            >
              <GoArrowSwitch className={styles.icon} /> Khứ hồi
            </button>
            <button
              className={tripType === "one-way" ? styles.active : ""}
              onClick={() => setTripType("one-way")}
            >
              <GoArrowRight className={styles.icon} /> Một chiều
            </button>
          </div>

          <form onSubmit={handleSubmit}>
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
                  required
                />
              </div>
            )}

            <div className={styles.passengersDiv}>
              <label>
                <FiUsers className={styles.icon} /> Hành khách
              </label>
              <div className={styles.passengerInputs}>
                <div className={styles.passengerType}>
                  <label htmlFor="adults">Người lớn (>= 12 tuổi)</label>
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

            <button type="submit" className={styles.searchBtn}>
              Tìm chuyến bay
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
