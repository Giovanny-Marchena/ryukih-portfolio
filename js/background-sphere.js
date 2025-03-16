document.addEventListener("DOMContentLoaded", () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[BackgroundSphere.js] Loaded on page: ${pageClass}`);

    // Only initialize on the homepage
    if (pageClass !== "page-index") return;

    window.addEventListener('load', () => {
        console.log(`[BackgroundSphere.js] Window loaded, initializing background sphere on ${pageClass}`);
        initBackgroundSphere(pageClass);
    });
});

function initBackgroundSphere(pageClass) {
    const canvas = document.getElementById('backgroundSphereCanvas');
    if (!canvas) {
        console.error(`[BackgroundSphere.js] Background sphere canvas not found on ${pageClass}`);
        return;
    }

    // Declare camera first
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    console.log(`[BackgroundSphere.js] Camera set up on ${pageClass}`);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    function updateRendererSize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        console.log(`[BackgroundSphere.js] Renderer updated with size ${window.innerWidth}x${window.innerHeight} on ${pageClass}`);
    }
    updateRendererSize(); // Call after camera is defined

    const scene = new THREE.Scene();

    // Scale radius based on viewport width
    const baseRadius = 3.5;
    function getScaledRadius() {
        return baseRadius * Math.min(1, window.innerWidth / 1920); // Scale down on smaller screens
    }
    let radius = getScaledRadius();
    const particleSize = 0.025 * Math.min(1, window.innerWidth / 1920); // Scale particle size
    console.log(`[BackgroundSphere.js] Sphere radius set to: ${radius}, Particle size set to: ${particleSize} on ${pageClass}`);

    const particleCount = 200;
    console.log(`[BackgroundSphere.js] Particle count set to: ${particleCount} on ${pageClass}`);

    const particles = new THREE.Group();
    const particlePositions = [];

    // Create geometry and material for particles
    const geometry = new THREE.SphereGeometry(particleSize, 16, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0xEB5E28, // Solid blue color
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(geometry, material);

        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        particle.userData = { phi: phi, theta: theta, speed: Math.random() * 0.01 + 0.005 };
        particles.add(particle);
        particlePositions.push({ phi, theta });
    }

    scene.add(particles);
    console.log(`[BackgroundSphere.js] Particles created and added to scene on ${pageClass}`);

    function animate() {
        requestAnimationFrame(animate);

        particles.children.forEach((particle, index) => {
            particle.userData.theta += particle.userData.speed;
            const { phi, theta } = particlePositions[index];
            const currentRadius = getScaledRadius(); // Update radius dynamically
            particle.position.x = currentRadius * Math.sin(phi) * Math.cos(theta + particle.userData.theta);
            particle.position.y = currentRadius * Math.sin(phi) * Math.sin(theta + particle.userData.theta);
            particle.position.z = currentRadius * Math.cos(phi);
        });

        // Rotate primarily on X-axis, with subtle Y-axis rotation
        particles.rotation.x += 0.005; // Faster rotation on X-axis
        particles.rotation.y += 0.001; // Slower rotation on Y-axis

        renderer.render(scene, camera);
    }

    animate();
    console.log(`[BackgroundSphere.js] Animation loop started on ${pageClass}`);

    window.addEventListener("resize", () => {
        updateRendererSize();
        radius = getScaledRadius(); // Update radius on resize
        console.log(`[BackgroundSphere.js] Radius updated to ${radius} on resize`);
    });
}