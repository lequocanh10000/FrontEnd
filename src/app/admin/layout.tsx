'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/admin/Sidebar/sidebar';
import Header from '../../components/admin/Header/header';
import styles from './dashboard/dashboard.module.scss';
import Loading from './loading';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check authentication here
    const isAuthenticated = localStorage.getItem('adminToken');
    if (!isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.contentArea}>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
