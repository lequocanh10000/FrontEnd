'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './bm_layout.module.scss';

export default function BookingManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { 
      id: 'bookingTab', 
      label: 'Quản lý đặt vé', 
      href: '/booking_management',
      active: pathname === '/booking_management'
    },
    { 
      id: 'checkIn', 
      label: 'Làm thủ tục', 
      href: '/booking_management/checkIn',
      active: pathname === '/booking_management/checkIn'
    },
    
  ];

  return (
    <div className={styles.layoutContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>
            QUẢN LÝ VÉ
          </h1>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={styles.navigationWrapper}>
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`${styles.tab} ${
                tab.active ? styles.tabActive : styles.tabInactive
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}