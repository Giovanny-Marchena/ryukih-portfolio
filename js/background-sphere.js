// background-sphere.js (updated)
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initBackgroundSphere(pageClass) {
    const backgroundContainer = document.querySelector('.background-container');
    if (!backgroundContainer) {
        console.error(`[BackgroundSphere.js] Background container not found on ${pageClass}`);
        return;
    }

    let canvas = document.getElementById('backgroundSphereCanvas');
    if (canvas) {
        console.log(`[BackgroundSphere.js] Removing existing backgroundSphereCanvas to avoid context conflicts on ${pageClass}`);
        canvas.remove();
    }

    canvas = document.createElement('canvas');
    canvas.id = 'backgroundSphereCanvas';
    canvas.className = 'background-sphere';
    backgroundContainer.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    function updateRendererSize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        console.log(`[BackgroundSphere.js] Renderer updated with size ${window.innerWidth}x${window.innerHeight} on ${pageClass}`);
    }
    updateRendererSize();

    const baseRadius = 3.5;
    function getScaledRadius() {
        return baseRadius * Math.min(1, window.innerWidth / 1920);
    }
    let radius = getScaledRadius();
    const particleSize = 0.025 * Math.min(1, window.innerWidth / 1920);
    const particleCount = Math.floor(200 * Math.min(1, window.innerWidth / 1920));

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
    const material = new THREE.PointsMaterial({
        size: particleSize,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

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

    let opacity = 0;
    material.opacity = 0;
    function animate() {
        requestAnimationFrame(animate);

        if (opacity < 0.8) {
            opacity += 0.02;
            material.opacity = Math.min(opacity, 0.8);
        }

        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;
            let theta = (i / particleCount) * Math.PI * 2 + speeds[i] * Date.now() * 0.001;
            const currentRadius = getScaledRadius();
            positions[index] = currentRadius * Math.sin(phis[i]) * Math.cos(theta);
            positions[index + 1] = currentRadius * Math.sin(phis[i]) * Math.sin(theta);
            positions[index + 2] = currentRadius * Math.cos(phis[i]);
        }
        particles.geometry.attributes.position.needsUpdate = true;

        particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05 + 0.001;
        particles.rotation.x += (mouseY * 0.5 - particles.rotation.x) * 0.05 + 0.005;

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateRendererSize();
            radius = getScaledRadius();
            material.size = 0.025 * Math.min(1, window.innerWidth / 1920);
            console.log(`[BackgroundSphere.js] Radius updated to ${radius} on resize`);
        }, 100);
    });

    console.log(`[BackgroundSphere.js] Initialized with ${particleCount} particles, radius ${radius} on ${pageClass}`);
}