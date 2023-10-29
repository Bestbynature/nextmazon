import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar/navbar';
import Footer from './Footer';
import SessionProvider from './SessionProvider';
// import logo from '../assets/logo-no-background.png'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextMazon',
  description: 'The future of shopping, today',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider>
          <Navbar />
          <main className="p-4 m-auto max-w-[80%] min-w-[300px]">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
