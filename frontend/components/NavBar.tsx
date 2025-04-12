'use client';

import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="w-full px-6 py-4 flex justify-between items-center bg-black bg-opacity-70 fixed top-0 z-50 border-b border-cyan-400">
            <div className="text-xl font-bold text-cyan-400">Ryukih</div>
            <div className="space-x-4 text-sm">
                <Link href="/" className="hover:text-cyan-400">Home</Link>
                <Link href="/projects" className="hover:text-cyan-400">Projects</Link>
                <Link href="/labs" className="hover:text-cyan-400">Labs</Link>
                <Link href="/contact" className="hover:text-cyan-400">Contact</Link>
            </div>
        </nav>
    );
}
