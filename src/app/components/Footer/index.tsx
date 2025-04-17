import React from "react";
import { SiChinaeasternairlines } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import styles from './styles.module.scss';
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
          </div>

          <div className={`${styles.socials} ${styles.flex}`}>
            <a href="#" aria-label="Facebook">
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
          <span className={styles.linkTitle}>Information</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/explore">Explore</Link>
            </li>
            <li>
              <Link href="/travel">Travel</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <span className={styles.linkTitle}>Helpful Links</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/destination">Destination</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/travel">Travel</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <span className={styles.linkTitle}>Contact us</span>
          <div className={styles.contactInfo}>
            <span className={styles.phone}>+84383161142</span>
            <span className={styles.email}>nguyenduyen.260903@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
