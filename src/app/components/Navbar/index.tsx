// src/components/Navbar/index.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { FiMenu, FiX, FiUser, FiShoppingCart } from "react-icons/fi";
import { SiChinaeasternairlines } from "react-icons/si";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Xử lý scroll để thay đổi style navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { path: "/", name: "Trang chủ" },
    { path: "/flight", name: "Chuyến bay" },
    { path: "/about", name: "Giới thiệu" },
    { path: "/contact", name: "Liên hệ" },
  ];

  const authLinks = [
    { path: "/login", name: "Đăng nhập" },
    { path: "/signup", name: "Đăng ký"},
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span><SiChinaeasternairlines className={styles.icon} /></span>
          <span>QAirline</span>
        </Link>

        {/* Menu chính - Desktop */}
        <div className={styles.menu}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.link} ${
                pathname === link.path ? styles.active : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Các action - Desktop */}
        <div className={styles.actions}>
          {authLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={styles.actionLink}
              aria-label={link.name}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Nút mobile menu */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuContent}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.mobileLink} ${
                pathname === link.path ? styles.active : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className={styles.mobileActions}>
            {authLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={styles.mobileActionLink}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
