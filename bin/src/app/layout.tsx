import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ryukih | Portfolio',
  description: 'Personal portfolio and projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <NavBar />
        <div className="pt-16">{children}</div> {/* Add padding below fixed nav */}
      </body>
    </html>
  );
}
