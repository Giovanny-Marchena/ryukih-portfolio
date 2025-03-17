import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initializeAnimation, updateAnimation, setHoverState } from './moon_animation.js';

// Error handling and logging setup
const logger = {
    log: (message) => console.log(`[INFO] ${new Date().toISOString()}: ${message}`),
    error: (message, error) => console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error)
};

// Configurable parameters for background particles
const bgParticleConfig = {
    particleCount: 500, // Reduced number for a sparser look
    particleSize: 0.15, // Size of particles
    spread: 55, // Spread in x, y, z directions
    speed: 0.05, // Speed of particles moving towards the viewer
    glowColor: 0xffffff, // White glow
    glowIntensity: 0.7 // Intensity of glow effect
};

try {
    // 3D Setup Logic
    const scene = new THREE.Scene();
    const container = document.getElementById("canvas-container");
    if (!container) throw new Error("Canvas container not found");

    // Initialize camera with dynamic aspect ratio
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    logger.log("Renderer initialized");

    // Add lighting for better moon visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    logger.log("Lighting added");

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    logger.log("OrbitControls initialized");

    // Background Particle System
    const bgParticlesGeometry = new THREE.BufferGeometry();
    const bgPositions = new Float32Array(bgParticleConfig.particleCount * 3);
    const bgColors = new Float32Array(bgParticleConfig.particleCount * 3);

    for (let i = 0; i < bgParticleConfig.particleCount * 3; i += 3) {
        // Random positions within a large cube
        bgPositions[i] = (Math.random() - 0.5) * bgParticleConfig.spread;
        bgPositions[i + 1] = (Math.random() - 0.5) * bgParticleConfig.spread;
        bgPositions[i + 2] = (Math.random() - 0.5) * bgParticleConfig.spread;

        // White glow color
        const color = new THREE.Color(bgParticleConfig.glowColor);
        bgColors[i] = color.r;
        bgColors[i + 1] = color.g;
        bgColors[i + 2] = color.b;
    }

    bgParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
    bgParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));

    // Create a glow effect using a custom shader material
    const bgParticleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            pointSize: { value: bgParticleConfig.particleSize * window.devicePixelRatio },
            glowColor: { value: new THREE.Color(bgParticleConfig.glowColor) },
            glowIntensity: { value: bgParticleConfig.glowIntensity }
        },
        vertexShader: `
            attribute vec3 color;
            varying vec3 vColor;
            uniform float pointSize;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = pointSize * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            uniform vec3 glowColor;
            uniform float glowIntensity;
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
                gl_FragColor = vec4(vColor * glowColor * intensity * glowIntensity, intensity);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const bgParticles = new THREE.Points(bgParticlesGeometry, bgParticleMaterial);
    scene.add(bgParticles);

    // Initialize animation with moon
    let currentAnimation;
    try {
        currentAnimation = initializeAnimation(scene, container.clientWidth, container.clientHeight);
        if (!currentAnimation || !currentAnimation.object) throw new Error("Animation initialization failed");
        logger.log("Moon animation initialized");
    } catch (e) {
        logger.error("Failed to initialize animation", e);
    }

    // Add hover event listeners
    container.addEventListener('mouseover', () => {
        setHoverState(true);
        logger.log("Mouse over canvas");
    });
    container.addEventListener('mouseout', () => {
        setHoverState(false);
        logger.log("Mouse out of canvas");
    });

    // Interactive glow effect on "Under Construction" text
    const glowText = document.querySelector(".glow-text");
    document.addEventListener('mousemove', (e) => {
        const rect = glowText.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const maxDistance = 300;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const glowIntensity = Math.max(0, (maxDistance - distance) / maxDistance);
        glowText.style.textShadow = `0 0 ${10 + glowIntensity * 20}px #ffcc00, 0 0 ${20 + glowIntensity * 40}px #ffcc00`;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        try {
            controls.update();
            if (currentAnimation && typeof currentAnimation.update === 'function') {
                currentAnimation.update();
            }

            // Animate background particles (fly past effect)
            const positions = bgParticlesGeometry.attributes.position.array;
            for (let i = 0; i < bgParticleConfig.particleCount * 3; i += 3) {
                positions[i + 2] += bgParticleConfig.speed; // Move particles towards viewer
                if (positions[i + 2] > camera.position.z + 10) {
                    // Reset particle to the back when it passes the viewer
                    positions[i] = (Math.random() - 0.5) * bgParticleConfig.spread;
                    positions[i + 1] = (Math.random() - 0.5) * bgParticleConfig.spread;
                    positions[i + 2] = -bgParticleConfig.spread / 2;
                }
            }
            bgParticlesGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        } catch (e) {
            logger.error("Animation loop failed", e);
        }
    }
    animate();
    logger.log("Animation loop started");

    // Handle window resize for responsiveness
    window.addEventListener('resize', () => {
        try {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        } catch (e) {
            logger.error("Resize handler failed", e);
        }
    });

    logger.log("Page loaded successfully");
} catch (e) {
    logger.error("Critical error during initialization", e);
}