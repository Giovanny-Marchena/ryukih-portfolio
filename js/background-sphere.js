document.addEventListener("DOMContentLoaded", () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[BackgroundSphere.js] Loaded on page: ${pageClass}`);

    // Only initialize on the homepage
    if (pageClass !== "page-index") return;

    window.addEventListener('load', () => {
        console.log(`[BackgroundSphere.js] Window loaded, initializing background sphere on ${pageClass}`);
        initBackgroundSphere();
    });
});

function initBackgroundSphere() {
    const canvas = document.getElementById('backgroundSphereCanvas');
    if (!canvas) {
        console.error(`[BackgroundSphere.js] Background sphere canvas not found`);
        return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(`[BackgroundSphere.js] Renderer initialized with size ${window.innerWidth}x${window.innerHeight}`);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    console.log("[BackgroundSphere.js] Camera set up");

    const radius = 2.5; //Default 2
    const particleSize = 0.025;
    console.log(`[BackgroundSphere.js] Sphere radius set to: ${radius}, Particle size set to: ${particleSize}`);

    const particleCount = 400;
    console.log(`[BackgroundSphere.js] Particle count set to: ${particleCount}`);

    const particles = new THREE.Group();
    const particlePositions = [];

    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(particleSize, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0xEB5E28,
            // color: 0xf9ba31,
            transparent: true,
            opacity: 1.0
        });
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
    console.log("[BackgroundSphere.js] Particles created and added to scene");

    function animate() {
        requestAnimationFrame(animate);

        particles.children.forEach((particle, index) => {
            particle.userData.theta += particle.userData.speed;
            const { phi, theta } = particlePositions[index];
            particle.position.x = radius * Math.sin(phi) * Math.cos(theta + particle.userData.theta);
            particle.position.y = radius * Math.sin(phi) * Math.sin(theta + particle.userData.theta);
            particle.position.z = radius * Math.cos(phi);
        });

        // Rotate primarily on X-axis, with subtle Y-axis rotation
        particles.rotation.x += 0.005; // Faster rotation on X-axis
        particles.rotation.y += 0.001; // Slower rotation on Y-axis

        renderer.render(scene, camera);
    }

    animate();
    console.log(`[BackgroundSphere.js] Animation loop started on ${pageClass}`);

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}