import React, { useEffect, useRef } from 'react';
import { ReactTyped } from 'react-typed';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader';
import ScrollIndicator from './ScrollIndicator';
import '../styles/circuits.css';

const Hero = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let camera, scene, mixer, controls, boneGroup;

    const init = () => {
      // Camera
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 100, 200);
      camera.lookAt(0, 50, 0);

      // Scene
      scene = new THREE.Scene();
      scene.background = null;

      // Lighting
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 200, 100);
      directionalLight.castShadow = true;
      scene.add(directionalLight);
      scene.add(new THREE.AmbientLight(0x404040, 0.5));

      // Floor
      const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
      const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, transparent: true, opacity: 0.5 });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -50;
      floor.receiveShadow = true;
      scene.add(floor);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      rendererRef.current = renderer;
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      } else {
        console.error('mountRef.current is null during initialization');
      }

      // Orbit Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 50;
      controls.maxDistance = 500;
      controls.enablePan = false;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.target.set(0, 50, 0);
      controls.update();

      // Load BVH animation
      const loader = new BVHLoader();
      console.log('Attempting to load BVH file from /assets/animations/walk.bvh');
      loader.load(
        '/assets/animations/walk.bvh',
        (result) => {
          console.log('BVH file loaded successfully:', result);
          const frameCount = result.clip.tracks[0].times.length;
          console.log('Number of frames in BVH:', frameCount);

          if (frameCount <= 1) {
            console.warn('BVH has only one frame, no animation will be visible. Please use a BVH file with multiple frames.');
          }

          // Get the skeleton and bones
          const skeleton = result.skeleton;
          const bones = skeleton.bones;

          // Create a group to hold the custom visualization
          boneGroup = new THREE.Group();

          // Visualize bones as lines and joints as spheres
          const lines = [];
          const spheres = [];

          // Define color palette
          const upperBodyColor = 0xfb6107; // Orange for upper body
          const lowerBodyColor = 0xf2cc8f; // Light beige for lower body
          const jointColor = 0x023047; // Dark teal for joints

          // Create lines for bones with color based on hierarchy
          for (let i = 0; i < bones.length; i++) {
            const bone = bones[i];
            if (bone.children.length > 0) {
              for (let j = 0; j < bone.children.length; j++) {
                const child = bone.children[j];
                // Determine color based on bone name or hierarchy
                let boneColor = upperBodyColor;
                if (bone.name.toLowerCase().includes('leg') || bone.name.toLowerCase().includes('foot') || bone.name.toLowerCase().includes('toe')) {
                  boneColor = lowerBodyColor; // Lower body bones
                }
                const geometry = new THREE.BufferGeometry();
                const material = new THREE.LineBasicMaterial({ color: boneColor });
                const line = new THREE.Line(geometry, material);
                lines.push({ line, startBone: bone, endBone: child });
                boneGroup.add(line);
                const start = bone.getWorldPosition(new THREE.Vector3());
                const end = child.getWorldPosition(new THREE.Vector3());
                console.log(`Line from bone ${i} to child ${j}: start ${start.toArray()}, end ${end.toArray()}`);
              }
            }
          }

          // Create spheres for joints
          bones.forEach((bone) => {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: jointColor });
            const sphere = new THREE.Mesh(geometry, material);
            spheres.push({ sphere, bone });
            boneGroup.add(sphere);
          });

          // Log bone positions to debug
          console.log('Skeleton bones:', bones);
          bones.forEach((bone, index) => {
            console.log(`Bone ${index} position:`, bone.position.toArray());
          });

          // Adjust scale and position for visibility
          boneGroup.scale.set(1.5, 1.5, 1.5);
          boneGroup.position.set(0, 50, 0);
          console.log('Bone group position:', boneGroup.position.toArray());
          console.log('Bone group scale:', boneGroup.scale.toArray());

          // Add a bounding box to visualize the bone group's extents
          const box = new THREE.Box3().setFromObject(boneGroup);
          const boxHelper = new THREE.Box3Helper(box, 0xffff00);
          scene.add(boxHelper);
          console.log('Bounding box added for bone group:', box);

          scene.add(boneGroup);
          console.log('Custom bone visualization added to scene');

          // Set up the AnimationMixer to animate the skeleton bones directly
          mixer = new THREE.AnimationMixer(skeleton.bones[0]);
          const action = mixer.clipAction(result.clip);
          action.play();
          console.log('Animation action started for skeleton bones');

          // Animation loop with dynamic bone position updates
          const clock = new THREE.Clock();
          const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            if (mixer) {
              mixer.update(delta);

              // Update bone matrices to ensure transformations are applied
              skeleton.bones.forEach((bone) => {
                bone.updateMatrixWorld(true);
              });

              // Update line positions
              lines.forEach(({ line, startBone, endBone }) => {
                const start = startBone.getWorldPosition(new THREE.Vector3());
                const end = endBone.getWorldPosition(new THREE.Vector3());
                line.geometry.setFromPoints([start, end]);
                line.geometry.attributes.position.needsUpdate = true;
              });

              // Update sphere positions
              spheres.forEach(({ sphere, bone }) => {
                sphere.position.copy(bone.getWorldPosition(new THREE.Vector3()));
              });

              // Log the world position of the first bone to confirm animation
              if (bones.length > 0) {
                const firstBone = bones[0];
                const worldPos = firstBone.getWorldPosition(new THREE.Vector3());
                console.log('First bone world position:', worldPos.toArray());
              }
            }
            renderer.render(scene, camera);
          };
          animate();
        },
        (progress) => {
          console.log('BVH loading progress:', progress);
        },
        (error) => {
          console.error('Error loading BVH:', error);

          fetch('/assets/animations/walk.bvh')
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then((text) => {
              console.log('BVH file content:', text);
            })
            .catch((fetchError) => {
              console.error('Failed to fetch BVH file:', fetchError);
            });

          // Fallback cube (not added since we don't need it)
          const clock = new THREE.Clock();
          const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            if (mixer) mixer.update(delta);
            renderer.render(scene, camera);
          };
          animate();
        }
      );
    };

    const onWindowResize = () => {
      if (camera && rendererRef.current) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', onWindowResize);

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      const renderer = rendererRef.current;
      if (renderer) {
        const domElement = renderer.domElement;
        if (mountRef.current && domElement && mountRef.current.contains(domElement)) {
          mountRef.current.removeChild(domElement);
        }
        renderer.dispose();
      }
      if (scene) {
        scene.clear();
      }
    };
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
      <div className="absolute inset-0 bg-[#023047]/70 z-[5]"></div>
      <div className="circuits-background z-[10]"></div>

      <div
        ref={mountRef}
        className="absolute top-0 left-0 w-full h-full z-[20] opacity-0 animate-fadeIn animation-delay-300"
        style={{ pointerEvents: 'auto' }}
      />

      <div className="relative z-[30]">
        <ReactTyped
          strings={['Welcome to Ryukih']}
          typeSpeed={50}
          className="text-[#fb6107] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Outfit'] font-bold mb-4 opacity-0 animate-fadeIn"
        />
        <p className="text-[#f2cc8f] text-base sm:text-lg md:text-xl lg:text-2xl font-['Outfit'] font-medium mb-8 opacity-0 animate-fadeIn animation-delay-300">
          Building the Future with Technology
        </p>
        <ScrollIndicator />
        <div className="mt-8">
          <a
            href="/mind"
            className="inline-block bg-[#fb6107] text-white font-['Outfit'] font-medium text-lg px-6 py-3 rounded-full hover:bg-[#f2cc8f] hover:text-[#023047] transition-all duration-300"
          >
            Explore My Mind
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;