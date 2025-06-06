'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.scss';
import { FaPlane, FaUsers, FaTicketAlt, FaUserCog, FaUser } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { SiChinaeasternairlines } from 'react-icons/si';
import { MdFlight } from "react-icons/md";
import { TbBuildingAirport } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Tổng quan', icon: <MdDashboard /> },
    { path: '/admin/aircrafts', label: 'Quản lý tàu bay', icon: <MdFlight /> },
    { path: '/admin/airports', label: 'Quản lý sân bay', icon: <TbBuildingAirport /> },
    { path: '/admin/flights', label: 'Quản lý chuyến bay', icon: <FaPlane /> },
    { path: '/admin/customers', label: 'Danh sách người dùng', icon: <FaUsers /> },
    { path: '/admin/tickets', label: 'Danh sách vé', icon: <FaTicketAlt /> },
    { path: '/admin/bookings', label: 'Danh sách đặt chỗ', icon: <FaClipboardList /> },
    { path: '/admin/members', label: 'Tài khoản quản trị', icon: <FaUserCog /> },
    { path: '/admin/profile', label: 'Hồ sơ cá nhân', icon: <FaUser /> },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/admin/dashboard">
          <span className={styles.logoIcon}><SiChinaeasternairlines/></span>
          <span className={styles.logoText}>QAirline Admin</span>
        </Link>
      </div>
      <nav className={styles.navigation}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`${styles.navItem} ${
              pathname === item.path ? styles.active : ''
            }`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
