'use client';

export default function Hero() {
    return (
        <section className="relative h-[90vh] bg-sand-50 text-sand-900 flex items-center justify-center overflow-hidden">
            {/* Background canvas / animation container */}
            <div id="webgl-bg" className="absolute inset-0 z-0" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                    侍 × Code — <br />
                    <span className="text-sand-600">Crafting digital precision</span>
                </h1>
                <p className="text-lg text-sand-700 mb-8">
                    A portfolio bridging tradition and technology.
                </p>
                <button className="px-6 py-3 bg-sand-900 text-sand-50 rounded-full hover:bg-sand-700 transition">
                    Explore Projects
                </button>
            </div>
        </section>
    );
}
