'use client';

import { useState } from 'react';
import styles from './members.module.scss';
import { FaPlus } from 'react-icons/fa';

interface Admin {
  name: string;
  email: string;
  registrationDate: string;
}

export default function MembersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle admin addition
    console.log('Adding new admin:', newAdmin);
    setShowAddModal(false);
  };

  return (
    <div className={styles.membersContainer}>
      <div className={styles.header}>
        <h1>Quản Lý Admin</h1>
        <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
          <FaPlus /> ADMIN MỚI
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.membersTable}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
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
              <h2>Thêm Admin Mới</h2>
              <button className={styles.closeButton} onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddAdmin}>
              <div className={styles.formGroup}>
                <label>Tên</label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  value={newAdmin.confirmPassword}
                  onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>Thêm Admin</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
