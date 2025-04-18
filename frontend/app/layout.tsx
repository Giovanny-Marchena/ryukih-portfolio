
import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
// import ClientLayout from '../components/ClientLayout';


export const metadata: Metadata = {
  title: 'Ryukih Portfolio',
  icons: {
    icon: '/dragon_roll_black.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

