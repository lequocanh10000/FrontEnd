import React from "react";
import styles from "./about.module.scss";
import Image from "next/image";

//Image and video
import img1 from "../../../../public/Assets/location.png";
import img2 from "../../../../public/Assets/flight.png";
import img3 from "../../../../public/Assets/people.png";
const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.secContainer}>
        <h2 className={styles.title}>Tại sao nên chọn chúng tôi?</h2>

        <div className={styles.mainContent}>
          <div className={styles.singleItem}>
            <Image src={img1} alt="Image Name" />
            <h3>100+ Điểm đến</h3>
            <p>
              Với mạng lưới đường bay rộng khắp, chúng tôi kết nối bạn đến hơn
              100 điểm điểm trên toàn thế giới.
            </p>
          </div>

          <div className={styles.singleItem}>
            <Image src={img2} alt="Image Name" />
            <h3>500+ Chuyến bay mỗi ngày</h3>
            <p>
              Chúng tôi vận hành hơn 500 chuyến bay mỗi ngày, mang đến cho bạn
              sự thuận tiện cho hành trình của mình.
            </p>
          </div>

          <div className={styles.singleItem}>
            <Image src={img3} alt="Image Name" />
            <h3> 2 Triệu+ Khách hàng</h3>
            <p>
              Hãy cùng gia nhập gia đình hơn 2 triệu hành khách tin tưởng lựa
              chọn chúng tôi cho nhu cầu du lịch mỗi năm.
            </p>
          </div>
        </div>

        <div className={styles.videoCard}>
          <div className={styles.cardContent}>
            <div className={styles.cardText}>
              <h2>Trải nghiệm niềm vui bay cùng chúng tôi!</h2>
              <p>
                Chúng tôi tự hào mang đến trải nghiệm đặt vé máy bay trực tuyến
                tiện lợi và an toàn, với những tính năng vượt trội và dịch vụ
                khách hàng tận tâm, giúp bạn dễ dàng tìm kiếm chuyến bay.
              </p>
            </div>

            <div className={styles.cardVideo}>
              <video
                src="/Assets/xinchaovn.mp4"
                autoPlay
                loop
                muted
                typeof="video/mp4"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
