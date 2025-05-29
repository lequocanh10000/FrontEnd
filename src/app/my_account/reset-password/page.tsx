"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './reset.module.scss';
import { userService } from '@/api/services/userService';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords
      if (newPassword !== confirmPassword) {
        toast.error('Mật khẩu mới không khớp');
        setIsLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        toast.error('Mật khẩu phải có ít nhất 6 ký tự');
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email : '';
      if (!email) {
        toast.error('Không tìm thấy thông tin người dùng');
        setIsLoading(false);
        return;
      }

      await userService.resetPassword(email, newPassword, token);
      toast.success('Đổi mật khẩu thành công');
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirect to my account page
      router.push('/my_account');
    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast.error(error.response?.data?.message || 'Không thể đổi mật khẩu');
    } finally {
      setIsLoading(false);
    }
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
              Mật khẩu hiện tại
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
              Mật khẩu mới
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
             Nhắc lại mật khẩu
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

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đổi Mật Khẩu"}
          </button>
        </form>
      </div>
    
  );
}