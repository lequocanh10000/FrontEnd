'use client';

import { useRouter } from 'next/navigation';
import styles from './hearder.module.scss';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/auth/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.userInfo}>
          <FaUserCircle className={styles.userIcon} />
          <div className={styles.userActions}>
            <button onClick={() => router.push('/admin/profile')}>
              Hồ sơ
            </button>
            <button onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
