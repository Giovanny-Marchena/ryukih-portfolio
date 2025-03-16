// particles.js (updated)
import * as THREE from 'three';

export function initParticles(pageClass) {
    console.log(`[Particles.js] Initializing on ${pageClass}`);

    let canvas = document.getElementById('particleCanvas');
    if (canvas) {
        console.log(`[Particles.js] Removing existing particleCanvas on ${pageClass}`);
        canvas.remove();
    }

    canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.appendChild(canvas);
        console.log(`[Particles.js] Fresh canvas added to loading-screen on ${pageClass}`);
    } else {
        console.error(`[Particles.js] Loading screen not found on ${pageClass}`);
        return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const baseSize = Math.min(viewportWidth, viewportHeight) * 0.25;
    canvas.width = Math.max(120, Math.min(baseSize, 200));
    canvas.height = Math.max(120, Math.min(baseSize, 200));
    console.log(`[Particles.js] Canvas created with size ${canvas.width}x${canvas.height} on ${pageClass}`);

    const context = canvas.getContext('webgl2');
    if (!context) {
        console.error(`[Particles.js] WebGL 2 not supported on ${pageClass}, skipping animation`);
        return;
    }
    console.log(`[Particles.js] WebGL 2 context created successfully on ${pageClass}`);

    const { WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, BufferAttribute, PointsMaterial, Points } = THREE;

    const renderer = new WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.width, canvas.height);
    console.log(`[Particles.js] Renderer initialized on ${pageClass}`);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    camera.position.set(0, 0, 1.5);
    camera.lookAt(0, 0, 0);
    console.log(`[Particles.js] Camera set up on ${pageClass}`);

    const radius = 0.4;
    const particleSizeFactor = 40;
    const particleSize = radius / particleSizeFactor;
    console.log(`[Particles.js] Sphere radius set to: ${radius}, Particle size set to: ${particleSize} on ${pageClass}`);

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const particleCount = isMobile ? (window.innerWidth <= 360 ? 30 : 50) : 150;
    console.log(`[Particles.js] Particle count set to: ${particleCount} based on device on ${pageClass}`);

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
        colors[index] = Math.random();
        colors[index + 1] = Math.random();
        colors[index + 2] = Math.random();
        speeds[i] = Math.random() * 0.03 + 0.02;
        phis[i] = phi;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    const material = new PointsMaterial({
        size: particleSize,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
    });
    const particles = new Points(geometry, material);
    particles.position.set(0, 0, 0);
    scene.add(particles);
    console.log(`[Particles.js] Particles created and added to scene on ${pageClass}`);

    let animationFrameId;
    function animate() {
        // Stop animation if loading screen is hidden
        if (loadingScreen.style.display === 'none' || loadingScreen.style.opacity === '0') {
            renderer.dispose();
            cancelAnimationFrame(animationFrameId);
            console.log(`[Particles.js] Animation stopped on ${pageClass}`);
            return;
        }

        animationFrameId = requestAnimationFrame(animate);

        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;
            let theta = (i / particleCount) * Math.PI * 2 + speeds[i] * Date.now() * 0.001;
            positions[index] = radius * Math.sin(phis[i]) * Math.cos(theta);
            positions[index + 1] = radius * Math.sin(phis[i]) * Math.sin(theta);
            positions[index + 2] = radius * Math.cos(phis[i]);
        }
        particles.geometry.attributes.position.needsUpdate = true;

        particles.rotation.x += 0.01;
        particles.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    animate();
    console.log(`[Particles.js] Animation loop started on ${pageClass}`);

    window.addEventListener("resize", () => {
        const newViewportWidth = window.innerWidth;
        const newViewportHeight = window.innerHeight;
        const newBaseSize = Math.min(newViewportWidth, newViewportHeight) * 0.25;
        canvas.width = Math.max(120, Math.min(newBaseSize, 200));
        canvas.height = Math.max(120, Math.min(newBaseSize, 200));
        renderer.setSize(canvas.width, canvas.height);
        camera.aspect = canvas.width / camera.height;
        camera.updateProjectionMatrix();
    });
}