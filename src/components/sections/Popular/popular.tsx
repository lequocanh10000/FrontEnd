"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import styles from "./popular.module.scss";
import img1 from "../../../../public/Assets/hanoi.jpg";
import img2 from "../../../../public/Assets/hue.jpg";
import img3 from "../../../../public/Assets/dalat.jpg";
import img4 from "../../../../public/Assets/nhatban.jpg";
import img5 from "../../../../public/Assets/danang.jpg";
import img6 from "../../../../public/Assets/hochiminh.jpg";
import img7 from "../../../../public/Assets/phuquoc.jpg";
import img8 from "../../../../public/Assets/trungquoc.jpg";

// Data for destinations
const Data = [
  {
    id: 1,
    imgSrc: img1,
    destTitle: "Hồ Gươm",
    location: "Hà Nội",
    from: "Hồ Chí Minh đến Hà Nội",
    date: "08/06/2025",
    money: "1.200.000VND",
    grade: "CULTURAL RELAX",
  },
  {
    id: 2,
    imgSrc: img2,
    destTitle: "Cung Đình Huế",
    location: "Huế",
    from: "Hồ Chí Minh đến Huế",
    date: "12/06/2025",
    money: "1.100.000VND",
    grade: "CULTURAL RELAX",
  },
  {
    id: 3,
    imgSrc: img3,
    destTitle: "Đà Lạt",
    location: "Lâm Đồng",
    from: "Hồ Chí Minh đến Đà Lạt",
    date: "17/07/2025",
    money: "850.000VND",
    grade: "CULTURAL RELAX",
  },

  {
    id: 4,
    imgSrc: img4,
    destTitle: "Chùa Sensoji",
    location: "Tokyo",
    from: "Hồ Chí Minh đến Tokyo",
    date: "22/07/2025",
    money: "6.476.000VND",
    grade: "CULTURAL RELAX",
  },
  {
    id: 5,
    imgSrc: img5,
    destTitle: "Cầu Rồng",
    location: "Đà Nẵng",
    from: "Hà Nội đến Đà Nẵng",
    date: "19/06/2025",
    money: "1.305.000VND",
    grade: "CULTURAL RELAX",
  },
  {
    id: 6,
    imgSrc: img6,
    destTitle: "Chợ Bến Thành",
    location: "Hồ Chí Minh",
    from: "Hà Nội đến Hồ Chí Minh",
    date: "16/07/2025",
    money: "1.200.000VND",
    grade: "CULTURAL RELAX",
  },
  {
    id: 7,
    imgSrc: img7,
    destTitle: "Phú Quốc",
    location: "Kiên Giang",
    from: "Hà Nội đến Phú Quốc",
    date: "17/08/2025",
    money: "1.599.000VND",
    grade: "CULTURAL RELAX",
  },
  {
    id: 8,
    imgSrc: img8,
    destTitle: "Thiên Đàn",
    location: "Bắc Kinh",
    from: "Hà Nội đến Bắc Kinh",
    date: "23/07/2025",
    money: "8.885.000VND",
    grade: "CULTURAL RELAX",
  },
];

const Popular = () => {
  // State for managing pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  // Navigate to the previous page
  const handlePrevClick = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Navigate to the next page
  const handleNextClick = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Get current items to display
  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return Data.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className={styles.popular}>
      <div className={styles.secContainer}>
        <div className={styles.secHeader}>
          <div className={styles.textDiv}>
            <h2 className={styles.secTitle}>Các chuyến bay phổ biến</h2>
            <p>
              Từ những thành phố đậm đà bản sắc đến những kỳ quan thiên nhiên, khám phá vẻ đẹp của Việt Nam và Thế Giới!
            </p>
            
          </div>

          <div className={styles.iconsDiv}>
            <BsArrowLeftShort
              className={`${styles.icon} ${styles.leftIcon}`}
              onClick={handlePrevClick}
            />
            <BsArrowRightShort
              className={styles.icon}
              onClick={handleNextClick}
            />
          </div>
        </div>

        <div className={styles.mainContent}>
          {getCurrentItems().map(
            ({ id, imgSrc, destTitle, location, from, date, money, grade }) => {
              return (
                <div key={id} className={styles.singleDestination}>
                  <div className={styles.destImage}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                      }}
                    >
                      <Image
                        src={imgSrc}
                        alt={`${destTitle} in ${location}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className={styles.overlayInfo}>
                      <h3>{destTitle}</h3>
                      <p>{location}</p>
                      <BsArrowRightShort className={styles.icon} />
                    </div>
                  </div>

                  <div className={styles.destFooter}>
                    <div className={styles.number}>0{id}</div>

                    <div className={styles.destText}>
                      <h4>{from}</h4>
                      <p>{date}</p>

                      <div className={styles.priceRow}>
                        <p className={styles.economyText}>Phổ thông từ</p>
                        <h6>{money}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Page indicators */}
        <div className={styles.paginationIndicators}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`${styles.paginationDot} ${
                currentPage === index ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
