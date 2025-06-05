'use client';

import { useState } from 'react';
import styles from './tickets.module.scss';
import { FaSearch } from 'react-icons/fa';

interface Ticket {
  flightNumber: string;
  departure: string;
  arrival: string;
  ticketNumber: string;
  status: string;
}

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.ticketsContainer}>
      <div className={styles.header}>
        <h1>Quản Lý Đặt Vé</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Tìm kiếm theo số hiệu chuyến bay hoặc số vé"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.ticketsTable}>
          <thead>
            <tr>
              <th>Số hiệu</th>
              <th>Cất cánh</th>
              <th>Hạ cánh</th>
              <th>Số vé</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows will be populated here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
