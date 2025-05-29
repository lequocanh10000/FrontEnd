'use client';

import { useState } from 'react';
import styles from '../bm_page.module.scss';

export default function CheckInPage() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Làm thủ tục với:\nMã đặt chỗ: ${code}\nEmail: ${email}`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Mã đặt chỗ"
          value={code}
          onChange={e => setCode(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="email"
          placeholder="Hòm thư điện tử"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.searchInput}
        />
        <button
          type="submit"
          className={styles.searchButton}
        >
          LÀM THỦ TỤC
        </button>
      </form>
    </div>
  );
}
