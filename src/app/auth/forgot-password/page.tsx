// src/app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./forgot.module.scss";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Vui lòng nhập email của bạn");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Gọi API để gửi email reset password
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra khi gửi yêu cầu");
      }

      // Hiển thị thông báo thành công
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Yêu cầu đã được gửi</h1>
          <p className={styles.message}>
            Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến {email}. Vui
            lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn.
          </p>
          <p className={styles.info}>
            Nếu bạn không nhận được email trong vài phút tới, hãy kiểm tra thư
            mục spam hoặc{" "}
            <button className={styles.resendButton} onClick={handleSubmit}>
              gửi lại
            </button>
            .
          </p>
          <Link href="/auth/login" className={styles.backLink}>
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Quên mật khẩu</h1>
        <p className={styles.subtitle}>
          Nhập email của bạn và chúng tôi sẽ gửi cho bạn đường dẫn để đặt lại
          mật khẩu.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Gửi yêu cầu đặt lại mật khẩu"}
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/auth/login" className={styles.backLink}>
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
