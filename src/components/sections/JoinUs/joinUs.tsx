"use client";
import { useState } from "react";
import styles from "./joinUs.module.scss";
import Image from "next/image";
import Link from "next/link";

const JoinUs = () => {
  return (
    <section className={styles.joinUs}>
      <div className={styles.secContainer}>
        <div className={styles.secIntro}>
          <h2 className={styles.secTitle}>Tham gia với chúng tôi</h2>
          <p>
            Bạn đã là thành viên chưa? Các thành viên của chúng tôi có thể tiết
            kiệm lên đến 50%.
          </p>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.btn}>
              <Link href="/auth/login">Đăng nhập</Link>
            </button>

            <button type="submit" className={styles.btn}>
              <Link href="/auth/signup">Đăng ký</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;