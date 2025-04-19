"use client"; // Bắt buộc vì sử dụng hooks và event listeners

import React, { useState, useEffect } from "react";
import { SiChinaeasternairlines } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import styles from "./navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
  const [active, setActive] = useState(styles.navBar);
  const [transparent, setTransparent] = useState(styles.header);

  const showNav = () => {
    setActive(`${styles.navBar} ${styles.activeNavbar}`);
  };

  const removeNav = () => {
    setActive(styles.navBar);
  };

  useEffect(() => {
    const addBg = () => {
      if (window.scrollY >= 10) {
        setTransparent(`${styles.header} ${styles.activeHeader}`);
      } else {
        setTransparent(styles.header);
      }
    };

    window.addEventListener("scroll", addBg);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", addBg);
    };
  }, []);

  return (
    <section className={styles.navBarSection}>
      <div className={transparent}>
        <div className={styles.logoDiv}>
          <Link href="/" className={styles.logo}>
            <h1 className={styles.flex}>
              <SiChinaeasternairlines className={styles.icon} />
              QAirline
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className={`${styles.navLists} ${styles.flex}`}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Trang chủ
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/products" className={styles.navLink}>
                Chuyến bay
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/resources" className={styles.navLink}>
                Về chúng tôi
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>
                Liên hệ
              </Link>
            </li>

            <div className={`${styles.headerBtns} ${styles.flex}`}>
              <button className={`${styles.btn} ${styles.loginBtn}`}>
                <a href="/login">Đăng nhập</a>
              </button>
              <button className={styles.btn}>
                <a href="/signup">Đăng ký</a>
              </button>
            </div>
          </ul>

          <div onClick={removeNav} className={styles.closeNavbar}>
            <AiFillCloseCircle className={styles.icon} />
          </div>
        </div>

        <div onClick={showNav} className={styles.toggleNavbar}>
          <TbGridDots className={styles.icon} />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
