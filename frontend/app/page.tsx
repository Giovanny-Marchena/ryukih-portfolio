'use client';

import { motion } from 'framer-motion';
import SakuraBackground from '../components/SakuraBackground';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center relative bg-sand-50 text-sand-900 overflow-hidden">
      {/* 🌸 Sakura petal animation in background */}
      <SakuraBackground />

      {/* Hero text and content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          I’m <span className="text-sand-600">Ryukih</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-sand-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          CS enthusiast & full-stack developer crafting digital experiences with precision and flow.
        </motion.p>

        <motion.a
          href="/projects"
          className="inline-block bg-sand-900 text-sand-50 px-6 py-3 rounded-full hover:bg-sand-700 transition"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          View My Projects
        </motion.a>
      </div>
    </main>
  );
}
