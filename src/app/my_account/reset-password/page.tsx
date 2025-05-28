"use client";
import React, { useState } from 'react';
import styles from './reset.module.scss';

const ResetPasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thông tin mật khẩu</h1>
      
      <p className={styles.description}>
        Mật khẩu tối thiểu phải có 8 ký tự, không giới hạn độ dài tối đa. 
        Mật khẩu phải bao gồm ít nhất 1 ký tự số, 1 chữ cái hoa, 
        1 chữ cái thường và 1 ký tự đặc biệt (@ $ ! % * ? &). 
        Ví dụ: Matkhau@123
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword" className={styles.label}>
            Mật khẩu hiện tại *
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            Mật khẩu mới *
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Nhắc lại mật khẩu *
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Lưu
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;