import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import Navbar from "../components/layout/Navbar/navbar";
import Footer from "../components/layout/Footer/footer";
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}