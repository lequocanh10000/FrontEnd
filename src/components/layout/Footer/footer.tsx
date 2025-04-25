import React from "react";
import { SiChinaeasternairlines } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

import styles from "./footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.secContainer}>
        <div className={styles.logoDiv}>
          <div className={styles.footerLogo}>
            <Link href="/" className={`${styles.logo} ${styles.flex}`}>
              <h1 className={styles.flex}>
                <SiChinaeasternairlines className={styles.icon} />
                QAirline
              </h1>
            </Link>
            <p className={styles.tagline}>Trải nghiệm tuyệt vời</p>
          </div>

          <div className={`${styles.socials} ${styles.flex}`}>
            <a
              href="https://www.facebook.com/rose.rowoon/"
              aria-label="Facebook"
            >
              <FaFacebookF className={styles.icon} />
            </a>
            <a href="#" aria-label="Twitter">
              <BsTwitter className={styles.icon} />
            </a>
            <a href="#" aria-label="Instagram">
              <AiFillInstagram className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <span className={styles.linkTitle}>Về chúng tôi</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/">Giới thiệu</Link>
            </li>
            <li>
              <Link href="/explore">Tin tức</Link>
            </li>
            <li>
              <Link href="/travel">Tuyển dụng</Link>
            </li>
            <li>
              <Link href="/blog">Đối tác</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <span className={styles.linkTitle}>Hỗ trợ</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/destination">Hỗ trợ 24/7</Link>
            </li>
            <li>
              <Link href="/support">An toàn & Bảo mật</Link>
            </li>
            <li>
              <Link href="/travel">Điều khoản sử dụng</Link>
            </li>
            <li>
              <Link href="/privacy">Chính sách bảo mật</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <span className={styles.linkTitle}>Liên hệ</span>
          <div className={styles.contactInfo}>
            <span className={styles.phone}>
              <FaPhoneAlt className={styles.smallIcon} />
              +84383161142
            </span>
            <span className={styles.email}>
              <IoMdMail className={styles.smallIcon} />
              support@airline.com
            </span>
            <span className={styles.location}>
              <FaLocationDot className={styles.smallIcon} />
              144 Xuân Thủy, Hà Nội
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
