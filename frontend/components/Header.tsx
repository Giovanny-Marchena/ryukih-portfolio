
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full bg-sand-100 shadow-md px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} priority />
                    <span className="text-xl font-semibold text-sand-900 tracking-wide">Ryukih</span>
                </Link>

                <nav className="hidden md:flex gap-6 text-sm font-medium text-sand-700">
                    <Link href="/">Home</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/labs">Labs</Link>
                    <Link href="/contact">Contact</Link>
                </nav>
            </div>
        </header>
    );
}
