'use client';

import { useState } from 'react';
import styles from './history.module.scss';

export default function HistoryPage() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const historyData = [
    {
      date: '05/04/2025',
      type: 'Đặt vé máy bay',
      bookingCode: 'BKT4384935570247',
      route: 'DAD → HUI'
    },
    {
      date: '07/04/2025',
      type: 'Đặt vé máy bay',
      bookingCode: 'BKT4401612223219',
      route: 'HAN → HAN'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Lịch sử hoạt động
        </h2>

        {/* Filter Section */}
        <div className={styles.filterContainer}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Từ ngày:
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={styles.dateInput}
              placeholder="Chọn ngày"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Đến ngày:
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={styles.dateInput}
              placeholder="Chọn ngày"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.searchButton}>
              TÌM KIẾM
            </button>
            <button className={styles.resetButton}>
              RESET
            </button>
          </div>
        </div>

        {/* History Table */}
        <div className={styles.tableContainer}>
          <table className={styles.historyTable}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableCell}>Ngày</th>
                <th className={styles.tableCell}>Loại giao dịch</th>
                <th className={styles.tableCell}>Mã đặt chỗ</th>
                <th className={styles.tableCell}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.date}</td>
                  <td className={styles.tableCell}>{item.type}</td>
                  <td className={styles.tableCell}>{item.bookingCode}</td>
                  <td className={styles.tableCell}>{item.route}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {historyData.length === 0 && (
          <div className={styles.emptyState}>
            Không có dữ liệu hoạt động
          </div>
        )}
      </div>
    </div>
  );
}