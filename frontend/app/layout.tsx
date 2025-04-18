import './globals.css';
import { Metadata } from 'next';
import Header from '../components/Header';
import AudioController from '../components/AudioController';

export const metadata: Metadata = {
  title: 'Ryukih Portfolio',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-sand-50 text-sand-900">
        <Header />
        {children}
        <AudioController />
      </body>
    </html>
  );
}
