import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './HeroScene3D.css';

/**
 * HeroScene3D — Custom Three.js 3D scene for Hero section
 * Features: Floating geometric shapes, particle field, mouse interaction, scroll parallax
 */
export default function HeroScene3D({ scrollY = 0 }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // === Setup ===
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0x6c63ff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6c63ff, 3, 20);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00d4ff, 2, 20);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xff6b9d, 1.5, 15);
    pointLight3.position.set(0, -3, 1);
    scene.add(pointLight3);

    // === Main floating objects ===
    const group = new THREE.Group();
    scene.add(group);

    // Central Icosahedron (main star)
    const icoGeo = new THREE.IcosahedronGeometry(1.1, 0);
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0x6c63ff,
      emissive: 0x2a2070,
      shininess: 100,
      wireframe: false,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    group.add(icoMesh);

    // Wireframe overlay on the icosahedron
    const wireGeo = new THREE.IcosahedronGeometry(1.12, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      opacity: 0.25,
      transparent: true,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // Orbiting torus
    const torusGeo = new THREE.TorusGeometry(1.8, 0.04, 8, 60);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x6c63ff,
      opacity: 0.5,
      transparent: true,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    group.add(torus);

    // Second orbiting torus (perpendicular)
    const torus2Geo = new THREE.TorusGeometry(2.1, 0.025, 8, 60);
    const torus2Mat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      opacity: 0.3,
      transparent: true,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.rotation.y = Math.PI / 4;
    group.add(torus2);

    // Floating small spheres orbiting
    const sphereGroup = new THREE.Group();
    group.add(sphereGroup);
    const smallSpheres = [];
    const sphereColors = [0x6c63ff, 0x00d4ff, 0xff6b9d, 0xffd93d, 0x6c63ff];
    for (let i = 0; i < 5; i++) {
      const sGeo = new THREE.SphereGeometry(0.1, 12, 12);
      const sMat = new THREE.MeshPhongMaterial({
        color: sphereColors[i],
        emissive: sphereColors[i],
        emissiveIntensity: 0.4,
      });
      const s = new THREE.Mesh(sGeo, sMat);
      const angle = (i / 5) * Math.PI * 2;
      s.position.set(Math.cos(angle) * 2, Math.sin(angle) * 2, 0);
      sphereGroup.add(s);
      smallSpheres.push({ mesh: s, angle, speed: 0.3 + i * 0.05 });
    }

    // === Particle field ===
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      particleSizes[i] = Math.random() * 3 + 1;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x6c63ff,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // === Mouse interaction ===
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // === Resize ===
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // === Animation ===
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Main group rotation + mouse parallax
      group.rotation.y = t * 0.18 + mouse.x * 0.3;
      group.rotation.x = Math.sin(t * 0.12) * 0.2 + mouse.y * 0.2;

      // Icosahedron pulsing
      const scale = 1 + Math.sin(t * 1.5) * 0.04;
      icoMesh.scale.set(scale, scale, scale);
      wireMesh.scale.set(scale + 0.01, scale + 0.01, scale + 0.01);

      // Orbiting small spheres
      smallSpheres.forEach(({ mesh, angle, speed }, i) => {
        const a = angle + t * speed;
        mesh.position.x = Math.cos(a) * 2;
        mesh.position.y = Math.sin(a) * 2;
        mesh.position.z = Math.sin(a * 0.7) * 0.5;
      });

      // Particles gentle drift
      particles.rotation.y = t * 0.03;
      particles.rotation.x = t * 0.015;

      // Point lights animation
      pointLight1.position.x = Math.sin(t * 0.5) * 4;
      pointLight1.position.y = Math.cos(t * 0.3) * 3;
      pointLight2.position.x = Math.cos(t * 0.4) * 3;
      pointLight2.position.z = Math.sin(t * 0.6) * 3;

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, scene, camera };

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torus2Geo.dispose();
      torus2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="hero-scene3d">
      <canvas ref={canvasRef} className="hero-scene3d__canvas" />
    </div>
  );
}
