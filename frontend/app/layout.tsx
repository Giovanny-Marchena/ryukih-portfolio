// app/layout.tsx
'use client';

import './globals.css';
import { ReactNode, useEffect, useState } from 'react';
import AudioController from '@/components/AudioController';
import Header from '@/components/Header';
import SakuraBackground from '@/components/SakuraBackground';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 19 || hour < 6);
  }, []);

  return (
    <html lang="en">
      <body
        className={`min-h-screen transition-colors duration-700 ease-in-out overflow-hidden
          ${isNight ? 'bg-zinc-900 text-white' : 'bg-sand-50 text-sand-900'}`}
      >
        {/* Optional night overlay filter */}
        {isNight && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-none z-40" />
        )}

        <Header />
        <SakuraBackground />

        <div className="h-screen overflow-hidden flex flex-col items-center justify-center">
          {children}
        </div>

        <AudioController nightMode={isNight} />
      </body>
    </html>
  );
}
