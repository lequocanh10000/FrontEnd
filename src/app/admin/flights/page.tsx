'use client';

import { useState } from 'react';
import styles from './flights.module.scss';
import { FaSearch, FaPlus } from 'react-icons/fa';

interface Flight {
  id: string;
  flightNumber: string;
  aircraftType: string;
  departure: string;
  arrival: string;
  status: string;
  economy: string;
  business: string;
}

export default function FlightsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newFlight, setNewFlight] = useState({
    id: '',
    flightNumber: '',
    aircraftType: '',
    departure: '',
    arrival: '',
    departureTime: '',
    arrivalTime: '',
    basePrice: ''
  });

  const handleAddFlight = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle flight addition
    console.log('Adding new flight:', newFlight);
    setShowAddModal(false);
  };

  return (
    <div className={styles.flightsContainer}>
      <div className={styles.header}>
        <h1>Quản Lý Chuyến Bay</h1>
        <div className={styles.actions}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Tìm kiếm chuyến bay sử dụng tên tàu bay hoặc số hiệu chuyến"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
          <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
            <FaPlus /> CHUYẾN BAY MỚI
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.flightsTable}>
          <thead>
            <tr>
              <th>SỐ HIỆU</th>
              <th>LOẠI MÁY BAY</th>
              <th>CẤT CÁNH</th>
              <th>HẠ CÁNH</th>
              <th>PHỔ THÔNG</th>
              <th>THƯƠNG GIA</th>
              <th>TÙY CHỈNH</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows will be populated here */}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Thêm chuyến bay mới</h2>
              <button className={styles.closeButton} onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddFlight}>
              <div className={styles.formGroup}>
                <label>ID chuyến bay</label>
                <input
                  type="text"
                  value={newFlight.id}
                  onChange={(e) => setNewFlight({ ...newFlight, id: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số hiệu chuyến</label>
                <input
                  type="text"
                  value={newFlight.flightNumber}
                  onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Loại tàu bay</label>
                <input
                  type="text"
                  value={newFlight.aircraftType}
                  onChange={(e) => setNewFlight({ ...newFlight, aircraftType: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Điểm cất cánh</label>
                <input
                  type="text"
                  value={newFlight.departure}
                  onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Điểm hạ cánh</label>
                <input
                  type="text"
                  value={newFlight.arrival}
                  onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Thời gian cất cánh</label>
                <input
                  type="datetime-local"
                  value={newFlight.departureTime}
                  onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Thời gian hạ cánh</label>
                <input
                  type="datetime-local"
                  value={newFlight.arrivalTime}
                  onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Giá cơ sở</label>
                <input
                  type="number"
                  value={newFlight.basePrice}
                  onChange={(e) => setNewFlight({ ...newFlight, basePrice: e.target.value })}
                />
              </div>
              <button type="submit" className={styles.submitButton}>Lưu</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
