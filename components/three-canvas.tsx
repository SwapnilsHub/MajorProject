'use client';

import * as React from 'react';
import * as THREE from 'three';

export function ThreeCanvas() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 4. Floating 3D Geometries
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0x6366f1, // Indigo
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x8b5cf6, // Purple
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x06b6d4, // Cyan
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xec4899, // Pink
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    ];

    const geometries = [
      new THREE.IcosahedronGeometry(2.5, 1),
      new THREE.OctahedronGeometry(2.2, 0),
      new THREE.TorusKnotGeometry(1.8, 0.4, 64, 8),
      new THREE.DodecahedronGeometry(2, 0),
      new THREE.TetrahedronGeometry(2.5, 0),
    ];

    const meshes: THREE.Mesh[] = [];
    const initialPositions: { x: number; y: number; z: number; rx: number; ry: number }[] = [];

    // Create 12 floating shapes scattered in 3D space
    for (let i = 0; i < 12; i++) {
      const geom = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geom, mat);

      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 20 - 5;

      mesh.position.set(x, y, z);
      const scale = 0.6 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);

      const rx = (Math.random() - 0.5) * 0.02;
      const ry = (Math.random() - 0.5) * 0.02;

      shapesGroup.add(mesh);
      meshes.push(mesh);
      initialPositions.push({ x, y, z, rx, ry });
    }

    // 5. Particle Constellation Network
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 60;
      particlePositions[i + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.4,
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 3, 50);
    pointLight1.position.set(10, 10, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 3, 50);
    pointLight2.position.set(-10, -10, 15);
    scene.add(pointLight2);

    // 7. Mouse interaction & smooth parallax lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Render animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Parallax camera rotation
      camera.position.x = mouseX * 4;
      camera.position.y = mouseY * 3;
      camera.lookAt(0, 0, 0);

      // Rotate group and meshes
      shapesGroup.rotation.y = elapsedTime * 0.05;
      shapesGroup.rotation.x = elapsedTime * 0.03;

      meshes.forEach((mesh, idx) => {
        const pos = initialPositions[idx];
        mesh.rotation.x += pos.rx;
        mesh.rotation.y += pos.ry;
        mesh.position.y = pos.y + Math.sin(elapsedTime * 1.2 + idx) * 0.6;
      });

      // Animate particle constellation
      particles.rotation.y = elapsedTime * 0.02 + mouseX * 0.2;
      particles.rotation.x = mouseY * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      materials.forEach((m) => m.dispose());
      geometries.forEach((g) => g.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-700 opacity-80 dark:opacity-90"
    />
  );
}
