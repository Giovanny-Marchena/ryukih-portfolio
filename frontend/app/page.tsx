'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-cyan-400 mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        I’m Ryukih
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl max-w-xl text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        CS enthusiast & full-stack developer crafting digital experiences.
      </motion.p>
    </main>
  );
}
