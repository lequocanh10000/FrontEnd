// src/app/login/page.tsx
'use client'; // Chỉ định đây là Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.scss'; // Tạo file SCSS nếu cần

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Kiểm tra input cơ bản
    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      // Gọi API login (thay bằng API thực tế của bạn)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard'); // Chuyển hướng sau khi login thành công
      } else {
        const data = await response.json();
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Đăng nhập</h1>
      {error && <p className={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Đăng nhập
        </button>
      </form>

      <div className={styles.links}>
        <a href="/forgot-password">Quên mật khẩu?</a>
        <a href="/register">Đăng ký tài khoản</a>
      </div>
    </div>
  );
};

export default Login;