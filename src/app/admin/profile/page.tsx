'use client';

import { useState } from 'react';
import styles from './profile.module.scss';

export default function ProfilePage() {
  const [basicInfo, setBasicInfo] = useState({
    uid: 'AD001',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@qairline.com'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleBasicInfoUpdate = () => {
    // Handle basic info update
    console.log('Updating basic info:', basicInfo);
  };

  const handlePasswordChange = () => {
    // Handle password change
    console.log('Changing password:', passwords);
  };

  const handleAccountDelete = () => {
    // Handle account deletion
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản?')) {
      console.log('Deleting account');
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1>Hồ Sơ Cá Nhân</h1>

      <div className={styles.section}>
        <h2>Thông tin cơ bản</h2>
        <div className={styles.formGroup}>
          <label>UID:</label>
          <span>{basicInfo.uid}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Tên:</label>
          <input
            type="text"
            value={basicInfo.firstName}
            onChange={(e) => setBasicInfo({ ...basicInfo, firstName: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Họ:</label>
          <input
            type="text"
            value={basicInfo.lastName}
            onChange={(e) => setBasicInfo({ ...basicInfo, lastName: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={basicInfo.email}
            onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
          />
        </div>
        <button className={styles.primaryButton} onClick={handleBasicInfoUpdate}>
          Chỉnh sửa
        </button>
      </div>

      <div className={styles.section}>
        <h2>Đặt lại mật khẩu</h2>
        <div className={styles.formGroup}>
          <label>Mật khẩu hiện tại:</label>
          <input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Mật khẩu mới:</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Gõ lại mật khẩu mới:</label>
          <input
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
          />
        </div>
        <button className={styles.primaryButton} onClick={handlePasswordChange}>
          Lưu thay đổi
        </button>
      </div>

      <div className={styles.section}>
        <h2>Cài đặt tài khoản</h2>
        <div className={styles.accountActions}>
          <button className={styles.deleteButton} onClick={handleAccountDelete}>
            Xóa tài khoản
          </button>
          <button className={styles.logoutButton} onClick={() => window.location.href = '/auth/login'}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
