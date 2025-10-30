import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export default function AnimatedLogo() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const textMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;
    scene.fog = new THREE.Fog(0x1a1a2e, 15, 100);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: 'highp',
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf72585, 1.5, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x90a8ed, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xE0D3F0, 0.7, 100);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);

    // Load font and create text
    const fontLoader = new FontLoader();
    fontLoader.load(
      'https://cdn.jsdelivr.net/npm/three@r128/examples/fonts/helvetiker_bold.typeface.json',
      (font) => {
        const textGeometry = new TextGeometry('YUME', {
          font: font,
          size: 1.2,
          height: 0.4,
          curveSegments: 16,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.03,
          bevelOffset: 0,
          bevelSegments: 8,
        });

        textGeometry.center();

        // Create gradient texture
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#F72585');
        gradient.addColorStop(0.5, '#90A8ED');
        gradient.addColorStop(1, '#E0D3F0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.7,
          roughness: 0.3,
          emissive: 0x90a8ed,
          emissiveIntensity: 0.4,
          emissiveMap: texture,
          flatShading: false,
        });

        const textMesh = new THREE.Mesh(textGeometry, material);
        scene.add(textMesh);
        textMeshRef.current = textMesh;
      }
    );

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.userData.velocities = velocities;

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x90a8ed,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      sizeRange: [0.5, 100],
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse tracking
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (textMeshRef.current) {
        textMeshRef.current.rotation.x += 0.004;
        textMeshRef.current.rotation.y += 0.006;
        textMeshRef.current.rotation.z += 0.002;

        textMeshRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.4;
        textMeshRef.current.position.x = Math.cos(elapsedTime * 0.3) * 0.2;

        textMeshRef.current.scale.set(
          1 + Math.sin(elapsedTime * 1.5) * 0.05,
          1 + Math.sin(elapsedTime * 1.5) * 0.05,
          1 + Math.sin(elapsedTime * 1.5) * 0.05
        );
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0002;
        particlesRef.current.rotation.y += 0.0004;

        const positions = particlesRef.current.geometry.attributes.position.array;
        const velocities = particlesRef.current.geometry.userData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          if (Math.abs(positions[i]) > 5) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <motion.div
      className="animated-logo-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 15 }}
    >
      <div ref={containerRef} className="three-canvas-container" />
      <div className="logo-glow" />
    </motion.div>
  );
}
