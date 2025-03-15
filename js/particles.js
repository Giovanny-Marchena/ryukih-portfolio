document.addEventListener("DOMContentLoaded", () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[Particles.js] Loaded on page: ${pageClass}`);
    if (!document.getElementById('loading-screen')) {
        console.error(`[Particles.js] Loading screen element not found on ${pageClass}`);
        return;
    }

    // Defer particle animation until page is interactive
    window.addEventListener('load', () => {
        console.log(`[Particles.js] Window loaded, initializing particles on ${pageClass}`);
        initParticles();
    });
});

function initParticles() {
    const loadingScreen = document.getElementById('loading-screen');
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const baseSize = Math.min(viewportWidth, viewportHeight) * 0.25;
    canvas.width = Math.max(120, Math.min(baseSize, 200));
    canvas.height = Math.max(120, Math.min(baseSize, 200));
    loadingScreen.appendChild(canvas);
    console.log(`[Particles.js] Canvas created with size ${canvas.width}x${canvas.height} on ${pageClass}`);

    // Check for WebGL support
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        console.error(`[Particles.js] WebGL not supported on ${pageClass}, skipping animation`);
        return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.width, canvas.height);
    console.log("[Particles.js] Renderer initialized");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height,
        0.1,
        1000
    );
    camera.position.set(0, 0, 1.5);
    camera.lookAt(0, 0, 0);
    console.log("[Particles.js] Camera set up");

    const radius = 0.4;
    const particleSizeFactor = 40;
    const particleSize = radius / particleSizeFactor;
    console.log(`[Particles.js] Sphere radius set to: ${radius}, Particle size set to: ${particleSize}`);

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const particleCount = isMobile ? (window.innerWidth <= 360 ? 30 : 50) : 150;
    console.log(`[Particles.js] Particle count set to: ${particleCount} based on device`);

    const particles = new THREE.Group();
    particles.position.set(0, 0, 0);
    const particlePositions = [];

    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(particleSize, 16, 16);
        const material = new THREE.MeshBasicMaterial({ 
            color: Math.random() * 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const particle = new THREE.Mesh(geometry, material);

        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        particle.userData = { phi: phi, theta: theta, speed: Math.random() * 0.03 + 0.02 };
        particles.add(particle);
        particlePositions.push({ phi, theta });
    }

    scene.add(particles);
    console.log("[Particles.js] Particles created and added to scene");

    function animate() {
        requestAnimationFrame(animate);

        particles.children.forEach((particle, index) => {
            particle.userData.theta += particle.userData.speed;
            const { phi, theta } = particlePositions[index];
            particle.position.x = radius * Math.sin(phi) * Math.cos(theta + particle.userData.theta);
            particle.position.y = radius * Math.sin(phi) * Math.sin(theta + particle.userData.theta);
            particle.position.z = radius * Math.cos(phi);
        });

        particles.rotation.x += 0.01;
        particles.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    animate();
    console.log("[Particles.js] Animation loop started");

    window.addEventListener("resize", () => {
        const newViewportWidth = window.innerWidth;
        const newViewportHeight = window.innerHeight;
        const newBaseSize = Math.min(newViewportWidth, newViewportHeight) * 0.25;
        canvas.width = Math.max(120, Math.min(newBaseSize, 200));
        canvas.height = Math.max(120, Math.min(newBaseSize, 200));
        renderer.setSize(canvas.width, canvas.height);
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
    });
}