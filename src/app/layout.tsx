import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import Navbar from "../components/layout/Navbar/navbar";
import Footer from "../components/layout/Footer/footer";
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
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}