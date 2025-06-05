'use client';

import { usePathname } from 'next/navigation';
import Navbar from "../components/layout/Navbar/navbar";
import Footer from "../components/layout/Footer/footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
} 