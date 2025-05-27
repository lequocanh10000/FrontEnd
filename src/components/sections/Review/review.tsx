"use client";
import React, { useState } from "react";
import styles from "./review.module.scss";
import img1 from "../../../../public/Assets/avatar1.jpg";
import img2 from "../../../../public/Assets/avatar2.jpg";
import img3 from "../../../../public/Assets/avatar3.jpg";
import img4 from "../../../../public/Assets/avatar4.jpg";
import img5 from "../../../../public/Assets/avatar5.jpg";

interface CustomerReview {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

const Review: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: CustomerReview[] = [
    {
      id: 1,
      name: "Quang Hán",
      avatar: img1.src,
      rating: 5,
      comment:
        "Dịch vụ rất tốt! Nhân viên tư vấn nhiệt tình, giúp mình chọn được chuyến bay phù hợp với ngân sách. Sẽ tiếp tục sử dụng dịch vụ trong các chuyến đi tới.",
    },
    {
      id: 2,
      name: "Thanh Vân",
      avatar: img2.src,
      rating: 5,
      comment:
        "Chuyến bay của chị và gia đình đi chơi rất thuận lợi. Bên em tư vấn chọn chuyến cho chị xong lại check in online cho chị nên cả nhà được ngồi gần nhau.",
    },
    {
      id: 3,
      name: "Thanh Trúc",
      avatar: img3.src,
      rating: 5,
      comment:
        "Cảm ơn bên bạn đặt vé cho mình nhé! Cả nhà đi vui lắm bạn ạ. May là bạn tư vấn cho mình giờ vì nhà mình có trẻ nhỏ. Chuyến bay chuẩn giờ, chỗ ngồi đẹp.",
    },
    {
      id: 4,
      name: "Justin Bieber",
      avatar: img4.src,
      rating: 5,
      comment:
        "I have leg pain, so I often need to choose a comfortable seat. Your service is excellent! You booked me a ticket on a large, and I'm very satisfied!",
    },
    {
      id: 5,
      name: "Hải Long",
      avatar: img5.src,
      rating: 5,
      comment:
        "Mình đặt vé cho cả gia đình 3 người, được tư vấn rất tận tâm. Thủ tục nhanh gọn, đặt vé xong là có thông tin ngay. Rất hài lòng với dịch vụ!",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 3 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={`${styles.star} ${
            i < rating ? styles.filled : styles.empty
          }`}
        >
          ★
        </span>
      ));
  };

  // Get visible reviews (3 at a time)
  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);
  // If we're at the end, we need to wrap around
  if (visibleReviews.length < 3) {
    visibleReviews.push(...reviews.slice(0, 3 - visibleReviews.length));
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Họ đã nói những gì về chúng tôi?</h2>
      <div className={styles.carouselContainer}>
        <button
          className={styles.nav}
          onClick={handlePrev}
          aria-label="Đánh giá trước"
        >
          <span>❮</span>
        </button>

        <div className={styles.carousel}>
          {visibleReviews.map((review) => (
            <div key={review.id} className={styles.item}>
              <div className={styles.avatar}>
                <img src={review.avatar} alt={review.name} />
              </div>
              <div className={styles.rating}>{renderStars(review.rating)}</div>
              <p className={styles.comment}>{review.comment}</p>
              <p className={styles.name}>{review.name}</p>
            </div>
          ))}
        </div>

        <button
          className={styles.nav}
          onClick={handleNext}
          aria-label="Đánh giá tiếp theo"
        >
          <span>❯</span>
        </button>
      </div>
    </section>
  );
};

export default Review;
