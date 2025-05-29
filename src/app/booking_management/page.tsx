'use client';

import { useState } from 'react';
import styles from './bm_page.module.scss';

export default function BookingSearchPage() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tìm kiếm với:\nMã đặt chỗ/Số vé: ${code}\nEmail: ${email}`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Mã đặt chỗ/Số vé điện tử"
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
          TÌM KIẾM
        </button>
      </form>
    </div>
  );
}
