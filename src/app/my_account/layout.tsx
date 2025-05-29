'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './acc_layout.module.scss';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { 
      id: 'info', 
      label: 'Thông tin tài khoản', 
      href: '/my_account',
      active: pathname === '/account' || pathname === '/my_account'
    },
    { 
      id: 'history', 
      label: 'Lịch sử hoạt động', 
      href: '/my_account/history',
      active: pathname === '/my_account/history'
    },
    { 
      id: 'password', 
      label: 'Thay đổi mật khẩu', 
      href: '/my_account/reset-password',
      active: pathname === '/my_account/reset-password'
    },
  ];

  return (
    <div className={styles.layoutContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>
            THÔNG TIN TÀI KHOẢN
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