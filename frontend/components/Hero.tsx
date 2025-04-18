'use client';

import { motion } from 'framer-motion';
import NightToggle from '@/components/NightToggle';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 19 || hour < 6);
  }, []);

  return (
    <section
      className={`relative min-h-screen flex flex-col justify-center items-center overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-zinc-900 text-sand-50' : 'bg-sand-50 text-sand-900'
      }`}
    >
      {/* 🌙 Night mode toggle */}
      <NightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />

      {/* Hero Content */}
      <div className="z-10 text-center px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 tracking-widest"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          夢を描く
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-sand-700 dark:text-sand-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Yume o egaku — Drawing dreams
        </motion.p>

        <motion.a
          href="#projects"
          className="inline-block px-6 py-3 bg-sand-900 dark:bg-sand-100 text-sand-50 dark:text-sand-900 rounded-full hover:bg-sand-700 dark:hover:bg-sand-200 transition transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Explore Projects
        </motion.a>
      </div>
    </section>
  );
}
