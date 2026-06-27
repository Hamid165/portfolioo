import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './FloatingScene3D.css';

/**
 * FloatingScene3D — A versatile floating 3D scene for About/Skills sections
 * type: 'torus-knot' | 'octahedron' | 'globe'
 */
export default function FloatingScene3D({ type = 'torus-knot', color1 = 0x6c63ff, color2 = 0x00d4ff }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
    camera.position.z = 4;

    // Lights
    const ambient = new THREE.AmbientLight(color1, 0.5);
    scene.add(ambient);
    const point1 = new THREE.PointLight(color1, 4, 15);
    point1.position.set(3, 3, 3);
    scene.add(point1);
    const point2 = new THREE.PointLight(color2, 3, 15);
    point2.position.set(-3, -2, 2);
    scene.add(point2);

    // Main mesh
    let geo;
    if (type === 'torus-knot') {
      geo = new THREE.TorusKnotGeometry(0.9, 0.28, 120, 16);
    } else if (type === 'octahedron') {
      geo = new THREE.OctahedronGeometry(1.2, 2);
    } else {
      geo = new THREE.SphereGeometry(1.1, 32, 32);
    }

    const mat = new THREE.MeshPhongMaterial({
      color: color1,
      emissive: new THREE.Color(color1).multiplyScalar(0.2),
      shininess: 80,
      specular: new THREE.Color(color2),
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe overlay
    const wGeo = geo.clone();
    const wMat = new THREE.MeshBasicMaterial({
      color: color2,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wMesh = new THREE.Mesh(wGeo, wMat);
    scene.add(wMesh);

    // Particles ring
    const pCount = 120;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = (i / pCount) * Math.PI * 2;
      const r = 2.2 + (Math.random() - 0.5) * 0.4;
      pPos[i * 3] = Math.cos(theta) * r;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pPos[i * 3 + 2] = Math.sin(theta) * r;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: color2,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // Mouse
    const mouse = { x: 0, y: 0 };
    const handleMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);

    // Resize
    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mesh.rotation.x = t * 0.25 + mouse.y * 0.2;
      mesh.rotation.y = t * 0.3 + mouse.x * 0.2;
      wMesh.rotation.x = mesh.rotation.x;
      wMesh.rotation.y = mesh.rotation.y;

      // Pulse scale
      const s = 1 + Math.sin(t * 1.2) * 0.03;
      mesh.scale.set(s, s, s);

      // Ring rotation
      points.rotation.y = t * 0.1;
      points.rotation.x = Math.sin(t * 0.08) * 0.2;

      // Lights orbit
      point1.position.x = Math.sin(t * 0.6) * 4;
      point1.position.y = Math.cos(t * 0.4) * 3;
      point2.position.x = Math.cos(t * 0.5) * 3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      wGeo.dispose();
      wMat.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, [type, color1, color2]);

  return (
    <div className="floating-scene3d">
      <canvas ref={canvasRef} className="floating-scene3d__canvas" />
    </div>
  );
}
