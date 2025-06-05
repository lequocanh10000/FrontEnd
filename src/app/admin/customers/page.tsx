'use client';

import { useState } from 'react';
import styles from './customer.module.scss';
import { FaSearch, FaPlus } from 'react-icons/fa';

interface Customer {
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle customer addition
    console.log('Adding new customer:', newCustomer);
    setShowAddModal(false);
  };

  return (
    <div className={styles.customersContainer}>
      <div className={styles.header}>
        <h1>Quản Lý Khách Hàng</h1>
        <div className={styles.actions}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
          <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
            <FaPlus /> THÊM KHÁCH HÀNG
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.customersTable}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Ngày đăng ký</th>
              <th>Hành động</th>
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
              <h2>Thêm Khách Hàng Mới</h2>
              <button className={styles.closeButton} onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddCustomer}>
              <div className={styles.formGroup}>
                <label>Tên</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={newCustomer.password}
                  onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  value={newCustomer.confirmPassword}
                  onChange={(e) => setNewCustomer({ ...newCustomer, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>Thêm Khách Hàng</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 