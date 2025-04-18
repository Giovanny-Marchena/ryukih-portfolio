'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SakuraBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const petalVariants = [
            '/sakura1.png',
            '/sakura2.png',
            '/sakura3.png',
            '/sakura4.png',
        ];

        const loadedImages: HTMLImageElement[] = [];
        let animationId: number;

        petalVariants.forEach((src, i) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages[i] = img;
                if (loadedImages.length === petalVariants.length) init();
            };
        });

        function init() {
            const petals = Array.from({ length: 40 }).map(() => {
                const img = loadedImages[Math.floor(Math.random() * loadedImages.length)];
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 15 + 10,
                    speed: Math.random() * 1 + 0.5,
                    drift: Math.random() * 0.5 - 0.25,
                    rotation: Math.random() * 360,
                    rotateSpeed: Math.random() * 0.5 - 0.25,
                    img,
                };
            });

            function animate() {
                ctx.clearRect(0, 0, width, height);
                petals.forEach((p) => {
                    p.y += p.speed;
                    p.x += p.drift;
                    p.rotation += p.rotateSpeed;

                    if (p.y > height) {
                        p.y = -10;
                        p.x = Math.random() * width;
                    }

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.drawImage(p.img, -p.r / 2, -p.r / 2, p.r, p.r);
                    ctx.restore();
                });
                animationId = requestAnimationFrame(animate);
            }

            animate();
        }

        const handleResize = () => {
            width = canvas!.width = window.innerWidth;
            height = canvas!.height = window.innerHeight;
        };

        const handleVisibilityChange = () => {
            setVisible(document.visibilityState === 'visible');
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
            )}
        </AnimatePresence>
    );
}
