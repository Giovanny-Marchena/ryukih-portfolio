import * as THREE from 'three';

// Simplex Noise for crater simulation (basic implementation)
function simplexNoise(x, y, z) {
    // Simplified noise function for demonstration
    // In a real project, you'd use a library like simplex-noise.js
    const scale = 0.5;
    return Math.sin(x * scale) * Math.sin(y * scale) * Math.sin(z * scale);
}

let isHovering = false;

// Configurable parameters for the moon
const moonConfig = {
    particleCount: 5000, // Increased for more detail
    particleSize: 0.05,
    radius: 2,
    rotationSpeed: 0.01,
    hoverScale: 1.5,
    craterDepth: 0.5, // Depth threshold for craters
    craterDarkness: 0.2 // Darkness factor for crater areas
};

// Animation initialization function for a particle-based moon with craters
export function initializeAnimation(scene, containerWidth, containerHeight) {
    try {
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(moonConfig.particleCount * 3);
        const colors = new Float32Array(moonConfig.particleCount * 3);

        for (let i = 0; i < moonConfig.particleCount * 3; i += 3) {
            // Random positions within a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = moonConfig.radius * Math.sin(phi) * Math.cos(theta);
            const y = moonConfig.radius * Math.sin(phi) * Math.sin(theta);
            const z = moonConfig.radius * Math.cos(phi);

            positions[i] = x;
            positions[i + 1] = y;
            positions[i + 2] = z;

            // Base color
            const baseColor = new THREE.Color(0xffcc00);
            
            // Simulate craters using noise
            const noiseValue = simplexNoise(x, y, z);
            let color = baseColor.clone();
            
            // Darken particles in "crater" areas
            if (noiseValue < moonConfig.craterDepth) {
                const darkness = (moonConfig.craterDepth - noiseValue) * moonConfig.craterDarkness;
                color.offsetHSL(0, 0, -darkness); // Darken by reducing lightness
            }

            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: moonConfig.particleSize,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const moon = new THREE.Points(particlesGeometry, particleMaterial);
        moon.position.set(0, 0, 0);
        scene.add(moon);

        return {
            object: moon,
            update: function () {
                try {
                    moon.rotation.y += moonConfig.rotationSpeed;
                    if (isHovering) {
                        moon.scale.x = Math.min(moon.scale.x + 0.02, moonConfig.hoverScale);
                        moon.scale.y = Math.min(moon.scale.y + 0.02, moonConfig.hoverScale);
                        moon.scale.z = Math.min(moon.scale.z + 0.02, moonConfig.hoverScale);
                    } else {
                        moon.scale.x = Math.max(moon.scale.x - 0.02, 1.0);
                        moon.scale.y = Math.max(moon.scale.y - 0.02, 1.0);
                        moon.scale.z = Math.max(moon.scale.z - 0.02, 1.0);
                    }
                } catch (e) {
                    console.error(`[ERROR] ${new Date().toISOString()}: Animation update failed`, e);
                }
            }
        };
    } catch (e) {
        console.error(`[ERROR] ${new Date().toISOString()}: Animation initialization failed`, e);
        return null;
    }
}

// Function to set hover state
export function setHoverState(hovering) {
    isHovering = hovering;
}

// Export updateAnimation function (not used but included for consistency)
export function updateAnimation() {
    // This can be expanded if needed
}