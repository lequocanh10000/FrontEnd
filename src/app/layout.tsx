import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import MainLayout from './main/layout';  // Thêm dòng này

const inter = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QAirline',
  description: 'Welcome to my website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>  {/* Bọc children bằng MainLayout */}
      </body>
    </html>
  );
}