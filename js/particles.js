document.addEventListener("DOMContentLoaded", () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[Particles.js] Loaded on page: ${pageClass}`);
    if (!document.getElementById('loading-screen')) {
        console.error(`[Particles.js] Loading screen element not found on ${pageClass}`);
        return;
    }
    initParticles();
});

function initParticles() {
    const loadingScreen = document.getElementById('loading-screen');
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.width = 200;
    canvas.height = 200;
    loadingScreen.appendChild(canvas);
    console.log("[Particles.js] Canvas created and appended to loading screen");

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(200, 200);
    console.log("[Particles.js] Renderer initialized");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height,
        0.1,
        1000
    );
    camera.position.z = 1; // Closer zoom to focus on the small sphere
    camera.position.x = 0; // Center X
    camera.position.y = 0; // Center Y
    camera.lookAt(0, 0, 0); // Ensure camera focuses on the center of the sphere
    console.log("[Particles.js] Camera set up");

    // Define fixed sphere and particle properties
    const radius = 0.4;
    const particleSizeFactor = 40;
    const particleSize = radius / particleSizeFactor;
    console.log(`[Particles.js] Sphere radius set to: ${radius}, Particle size set to: ${particleSize}`);

    // Create particles on the surface of a 3D sphere
    const particleCount = 150;
    const particles = new THREE.Group();
    const particlePositions = [];

    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(particleSize, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
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
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
    });
}