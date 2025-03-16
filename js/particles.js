// particles.js
import * as THREE from 'three';

export function initParticles(pageClass) {
    console.log(`[Particles.js] Initializing on ${pageClass}`);

    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) {
        console.error(`[Particles.js] Loading screen not found on ${pageClass}`);
        return;
    }

    let canvas = document.getElementById('particleCanvas');
    if (canvas) canvas.remove();

    canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    loadingScreen.appendChild(canvas);
    console.log(`[Particles.js] Canvas created for loading sphere on ${pageClass}`);

    const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.2;
    canvas.width = Math.max(100, Math.min(baseSize, 150));
    canvas.height = Math.max(100, Math.min(baseSize, 150));

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const gl = renderer.getContext();
    if (!gl.getParameter(gl.VERSION).includes('WebGL 2.0')) {
        console.error(`[Particles.js] WebGL2 not supported on ${pageClass}`);
        return;
    }
    renderer.setSize(canvas.width, canvas.height);
    console.log(`[Particles.js] Renderer initialized with size ${canvas.width}x${canvas.height} on ${pageClass}`);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    camera.position.z = 1.5;

    const radius = 0.4;
    const particleCount = window.innerWidth <= 768 ? 20 : Math.min(50, window.innerWidth <= 360 ? 15 : 75);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const phis = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const index = i * 3;
        positions[index] = radius * Math.sin(phi) * Math.cos(theta);
        positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[index + 2] = radius * Math.cos(phi);
        colors[index] = 1.0;
        colors[index + 1] = 0.5;
        colors[index + 2] = 0.5;
        speeds[i] = Math.random() * 0.03 + 0.02;
        phis[i] = phi;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/star.png', (texture) => {
        console.log('[Particles.js] Texture loaded successfully');
        const material = new THREE.PointsMaterial({
            size: radius / 40,
            map: texture,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        console.log(`[Particles.js] Particles added to scene with ${particleCount} particles on ${pageClass}`);

        let animationFrameId;
        function animate() {
            if (loadingScreen.style.display === 'none') {
                renderer.dispose();
                cancelAnimationFrame(animationFrameId);
                console.log(`[Particles.js] Animation stopped on ${pageClass}`);
                return;
            }

            animationFrameId = requestAnimationFrame(animate);
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const index = i * 3;
                const theta = (i / particleCount) * Math.PI * 2 + speeds[i] * Date.now() * 0.001;
                positions[index] = radius * Math.sin(phis[i]) * Math.cos(theta);
                positions[index + 1] = radius * Math.sin(phis[i]) * Math.sin(theta);
                positions[index + 2] = radius * Math.cos(phis[i]);
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.x += 0.01;
            particles.rotation.y += 0.002;
            material.opacity = Math.sin(Date.now() * 0.001) * 0.3 + 0.5;
            renderer.render(scene, camera);
        }

        window.addEventListener('load', () => {
            console.log(`[Particles.js] Starting animation on ${pageClass}`);
            animate();
        });
    }, undefined, (error) => {
        console.error('[Particles.js] Texture loading failed:', error);
        // Fallback to default material if texture fails
        const material = new THREE.PointsMaterial({
            size: radius / 40,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        console.log(`[Particles.js] Fallback particles added with ${particleCount} particles on ${pageClass}`);
    });

    window.addEventListener('resize', () => {
        const newBaseSize = Math.min(window.innerWidth, window.innerHeight) * 0.2;
        canvas.width = Math.max(100, Math.min(newBaseSize, 150));
        canvas.height = Math.max(100, Math.min(newBaseSize, 150));
        renderer.setSize(canvas.width, canvas.height);
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
    });
}