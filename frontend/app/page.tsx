'use client';

import Hero from '@/components/Hero';
import SakuraLoading from '@/components/SakuraLoading';

export default function Home() {
  return (
    <>
      <SakuraLoading isNight={false} />
      <main className="w-full">
        <Hero />
      </main>
    </>
  );
}