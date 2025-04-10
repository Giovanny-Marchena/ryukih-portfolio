import React, { useEffect, useRef } from 'react';
import { ReactTyped } from 'react-typed';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader';
import ScrollIndicator from './ScrollIndicator';
import '../styles/circuits.css';

const Hero = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const clock = new THREE.Clock();
    let camera, scene, renderer, mixer, controls;

      const init = () => {
          // Camera
          camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
          camera.position.set(0, 30, 80);

          // Scene
          scene = new THREE.Scene();
          scene.background = null;

          // Lighting
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(0, 100, 50);
          directionalLight.castShadow = true;
          scene.add(directionalLight);
          scene.add(new THREE.AmbientLight(0x404040));

          // Floor
          const floorGeometry = new THREE.PlaneGeometry(400, 400);
          const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, transparent: true, opacity: 0.5 });
          const floor = new THREE.Mesh(floorGeometry, floorMaterial);
          floor.rotation.x = -Math.PI / 2;
          floor.position.y = -10;
          floor.receiveShadow = true;
          scene.add(floor);

          // Renderer
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.shadowMap.enabled = true;
          mountRef.current.appendChild(renderer.domElement);

          // Orbit Controls
          controls = new OrbitControls(camera, renderer.domElement);
          controls.minDistance = 50;
          controls.maxDistance = 200;
          controls.enablePan = false;
          controls.enableZoom = true;
          controls.enableRotate = true;

          // Load BVH animation
          const loader = new BVHLoader();
          loader.load(
              '/models/bvh/pirouette.bvh',
              (result) => {
                  const skeletonHelper = new THREE.SkeletonHelper(result.skeleton.bones[0]);
                  skeletonHelper.material.color.set(0xfb6107);
                  skeletonHelper.material.linewidth = 2;

                  result.skeleton.bones[0].castShadow = true;
                  scene.add(result.skeleton.bones[0]);
                  scene.add(skeletonHelper);

                  mixer = new THREE.AnimationMixer(result.skeleton.bones[0]);
                  mixer.clipAction(result.clip).play();
              },
              undefined,
              (error) => {
                  console.error('Failed to load BVH file:', error);
                  fetch('/models/bvh/pirouette.bvh')
                      .then((response) => response.text())
                      .then((text) => {
                          console.log('BVH file response content:', text);
                      })
                      .catch((fetchError) => {
                          console.error('Failed to fetch BVH file for inspection:', fetchError);
                      });

                  // Fallback: Add a rotating cube if BVH fails
                  const geometry = new THREE.BoxGeometry(10, 10, 10);
                  const material = new THREE.MeshStandardMaterial({ color: 0xfb6107 });
                  const cube = new THREE.Mesh(geometry, material);
                  cube.castShadow = true;
                  cube.position.y = 5; // Above the floor
                  scene.add(cube);

                  const animateCube = () => {
                      cube.rotation.x += 0.01;
                      cube.rotation.y += 0.01;
                  };

                  // Update the animation loop to include the cube
                  const animate = () => {
                      requestAnimationFrame(animate);
                      const delta = clock.getDelta();
                      if (mixer) mixer.update(delta);
                      animateCube(); // Rotate the cube
                      renderer.render(scene, camera);
                  };
                  animate();
              }
          );

          // Handle window resize
          const onWindowResize = () => {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth, window.innerHeight);
          };
          window.addEventListener('resize', onWindowResize);

          // Animation loop (initial setup)
          const animate = () => {
              requestAnimationFrame(animate);
              const delta = clock.getDelta();
              if (mixer) mixer.update(delta);
              renderer.render(scene, camera);
          };
          animate();

          // Cleanup on unmount
          return () => {
              window.removeEventListener('resize', onWindowResize);
              mountRef.current.removeChild(renderer.domElement);
              renderer.dispose();
          };
      };

    init();
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-[#023047]/70 z-5"></div>
      <div className="circuits-background z-10"></div>

      <div
        ref={mountRef}
        className="absolute top-0 left-0 w-full h-full z-20 opacity-0 animate-fadeIn animation-delay-300"
        style={{ pointerEvents: 'auto' }}
      />

      <div className="relative z-30">
        <ReactTyped
          strings={['Welcome to Ryukih']}
          typeSpeed={50}
          className="text-[#fb6107] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Outfit'] font-bold mb-4 opacity-0 animate-fadeIn"
        />
        <p className="text-[#f2cc8f] text-base sm:text-lg md:text-xl lg:text-2xl font-['Outfit'] font-medium mb-8 opacity-0 animate-fadeIn animation-delay-300">
          Building the Future with Technology
        </p>
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;
