// background-sphere.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initBackgroundSphere(pageClass) {
    console.log(`[BackgroundSphere.js] Initializing on ${pageClass}`);

    const backgroundContainer = document.querySelector('.background-container');
    if (!backgroundContainer) {
        console.error(`[BackgroundSphere.js] Background container not found on ${pageClass}`);
        return;
    }

    let canvas = document.getElementById('backgroundSphereCanvas');
    if (canvas) canvas.remove();

    canvas = document.createElement('canvas');
    canvas.id = 'backgroundSphereCanvas';
    canvas.className = 'background-sphere';
    backgroundContainer.appendChild(canvas);
    console.log(`[BackgroundSphere.js] Canvas created for background sphere on ${pageClass}`);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const gl = renderer.getContext();
    if (!gl || !gl.getParameter(gl.VERSION).includes('WebGL 2.0')) {
        console.error(`[BackgroundSphere.js] WebGL2 not supported or context failed on ${pageClass}`);
        return;
    }
    console.log(`[BackgroundSphere.js] WebGL2 context initialized`);

    function updateRendererSize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        console.log(`[BackgroundSphere.js] Renderer resized to ${window.innerWidth}x${window.innerHeight}`);
    }
    updateRendererSize();

    const baseRadius = 2.5;
    const radius = baseRadius * Math.min(1, window.innerWidth / 1920);
    const particleCount = Math.floor(500 * Math.min(1, window.innerWidth / 1920));
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
        colors[index + 1] = 0.35;
        colors[index + 2] = 0.15 + Math.random() * 0.5;
        speeds[i] = Math.random() * 0.01 + 0.005;
        phis[i] = phi;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    let particles;
    // Use default material with circular particles
    const material = new THREE.PointsMaterial({
        size: 0.050 * Math.min(1, window.innerWidth / 1920),
        transparent: true,
        opacity: 1,
        vertexColors: true,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    console.log(`[BackgroundSphere.js] Default particles (circular) added with ${particleCount} particles`);

    function startAnimation() {
        if (!particles) return;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        let touchStartX = 0, touchStartY = 0;
        canvas.addEventListener('touchstart', (event) => {
            const touch = event.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });
        canvas.addEventListener('touchmove', (event) => {
            const touch = event.touches[0];
            mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
            event.preventDefault();
        });

        function animate() {
            if (!particles) return;
            requestAnimationFrame(animate);
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const index = i * 3;
                const theta = (i / particleCount) * Math.PI * 2 + speeds[i] * Date.now() * 0.001;
                positions[index] = radius * Math.sin(phis[i]) * Math.cos(theta);
                positions[index + 1] = radius * Math.sin(phis[i]) * Math.sin(theta);
                positions[index + 2] = radius * Math.cos(phis[i]);
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05 + 0.001;
            particles.rotation.x += (mouseY * 0.5 - particles.rotation.x) * 0.05 + 0.005;
            particles.material.opacity = Math.sin(Date.now() * 0.001) * 0.3 + 0.5;
            controls.update();
            renderer.render(scene, camera);
        }

        console.log(`[BackgroundSphere.js] Starting animation immediately on ${pageClass}`);
        animate();
    }

    startAnimation();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateRendererSize, 100);
    });
}