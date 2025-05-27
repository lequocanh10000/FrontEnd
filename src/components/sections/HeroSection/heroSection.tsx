"use client"; // Required for client-side interactivity

import styles from "./heroSection.module.scss";
import FlightSearch from "../../flight/FlightSearch/flightSearch";

const HeroSection = () => {
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
          <button type="button" className={styles.btn}>
            <a href="#searchForm">Đặt vé ngay</a>
          </button>
        </div>

        <FlightSearch />
      </div>
    </section>
  );
};

export default HeroSection;
