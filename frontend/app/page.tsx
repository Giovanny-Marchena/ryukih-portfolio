// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LandingReveal from '@/components/LandingReveal';
import { Moon } from 'lucide-react';

export default function Home() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 19 || hour < 6);
  }, []);

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <LandingReveal />

      {isNight && (
        <div className="absolute top-6 right-6 z-20">
          <Moon className="text-white animate-pulse" size={28} />
        </div>
      )}

      {/* Custom styled toggle button */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="toggle">
          <input type="checkbox" checked={isNight} onChange={() => setIsNight((prev) => !prev)} />
          <span className="button"></span>
          <span className="label">☼</span>
        </div>
      </div>

      {/* Japanese heading and subtitle */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-cyan-400 mb-4 z-10 tracking-widest"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        夢を描く
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-xl text-gray-300 z-10 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Yume o egaku — Drawing dreams
      </motion.p>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        侍 × Code — Crafting digital precision
      </motion.h2>

      <motion.p
        className="text-md md:text-lg text-gray-300 mt-2 max-w-lg z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        A portfolio bridging tradition and technology.
      </motion.p>

      <motion.a
        href="#projects"
        className="mt-6 px-5 py-2 border border-gray-300 rounded-full text-sm hover:bg-white/10 transition z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        Explore Projects
      </motion.a>
    </main>
  );
}
