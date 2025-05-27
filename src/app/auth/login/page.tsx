// app/login/page.tsx
"use client"; // Chỉ định đây là Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import styles from "./login.module.scss";
import { authService } from "@/api/services/authService";
import { toast } from "react-toastify";
import { loginSuccess } from "@/store/features/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });

      if (response.token) {
        // Lưu vào localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Cập nhật Redux store
        dispatch(loginSuccess({ user: response.user, token: response.token }));
        
        toast.success('Đăng nhập thành công!');
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Có lỗi xảy ra khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>Đăng Nhập</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>Hoặc</span>
        </div>

        <button
          className={styles.googleButton}
          disabled={isLoading}
          type="button"
        >
          <span className={styles.googleIcon}></span>
          Đăng nhập với Google
        </button>

        <div className={styles.links}>
          <a href="/auth/forgot-password" className={styles.link}>
            Quên mật khẩu?
          </a>
          <a href="/auth/signup" className={styles.link}>
            Đăng ký tài khoản
          </a>
        </div>
      </div>
    </div>
  );
}
