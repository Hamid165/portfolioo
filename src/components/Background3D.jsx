import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Background3D.css';

/**
 * Background3D — Single full-page fixed 3D scene
 * Camera flies through a 3D space, scroll-linked (rewinds on scroll up)
 */
export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── Renderer ───────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // ─── Scene & Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 14);

    // ─── Lights ─────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x6c63ff, 0.3));

    const light1 = new THREE.PointLight(0x6c63ff, 6, 40);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00d4ff, 4, 40);
    light2.position.set(-6, -4, 2);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xff6b9d, 3, 30);
    light3.position.set(0, -8, -10);
    scene.add(light3);

    // ─── Build Scene Objects ─────────────────────────────────

    // 1. Central icosahedron (hero area, z=0)
    const icoGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0x6c63ff,
      emissive: 0x1a1060,
      shininess: 120,
      transparent: true,
      opacity: 0.85,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3.5, 0.5, 0);
    scene.add(ico);

    // Wireframe overlay on ico
    const icoWireMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.2,
    });
    const icoWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.85, 1), icoWireMat);
    icoWire.position.copy(ico.position);
    scene.add(icoWire);

    // 2. Orbiting torus rings around ico
    const makeTorus = (r, tube, color, opacity, rotX, rotZ, parent) => {
      const g = new THREE.TorusGeometry(r, tube, 8, 80);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = rotX;
      mesh.rotation.z = rotZ;
      parent.add(mesh);
      return mesh;
    };

    const icoGroup = new THREE.Group();
    icoGroup.position.copy(ico.position);
    icoGroup.add(ico);
    icoGroup.add(icoWire);
    scene.remove(ico);
    scene.remove(icoWire);
    scene.add(icoGroup);
    makeTorus(2.8, 0.04, 0x6c63ff, 0.5, Math.PI / 3, 0, icoGroup);
    makeTorus(3.3, 0.025, 0x00d4ff, 0.3, Math.PI / 5, Math.PI / 4, icoGroup);

    // 3. Torus Knot (about section, z=-18)
    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16);
    const knotMat = new THREE.MeshPhongMaterial({
      color: 0x00d4ff, emissive: 0x003344, shininess: 100,
      transparent: true, opacity: 0.8,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(-3.5, 1, -18);
    scene.add(knot);

    const knotWireMat = new THREE.MeshBasicMaterial({
      color: 0xff6b9d, wireframe: true, transparent: true, opacity: 0.15,
    });
    scene.add(new THREE.Mesh(new THREE.TorusKnotGeometry(1.22, 0.36, 120, 16), knotWireMat));
    scene.children[scene.children.length - 1].position.copy(knot.position);

    // 4. Octahedron (skills section, z=-36)
    const octGeo = new THREE.OctahedronGeometry(1.5, 2);
    const octMat = new THREE.MeshPhongMaterial({
      color: 0xff6b9d, emissive: 0x330020, shininess: 80,
      transparent: true, opacity: 0.75,
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(3.5, -0.5, -36);
    scene.add(oct);

    const octWireMat = new THREE.MeshBasicMaterial({
      color: 0xffd93d, wireframe: true, transparent: true, opacity: 0.18,
    });
    const octWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.53, 2), octWireMat);
    octWire.position.copy(oct.position);
    scene.add(octWire);

    // 5. Dodecahedron (projects, z=-54)
    const dodeGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const dodeMat = new THREE.MeshPhongMaterial({
      color: 0xffd93d, emissive: 0x332200, shininess: 90,
      transparent: true, opacity: 0.75,
    });
    const dode = new THREE.Mesh(dodeGeo, dodeMat);
    dode.position.set(-3, 1, -54);
    scene.add(dode);

    // 6. Floating small orbs scattered through the tunnel
    const orbColors = [0x6c63ff, 0x00d4ff, 0xff6b9d, 0xffd93d, 0x8b83ff];
    const orbs = [];
    for (let i = 0; i < 30; i++) {
      const r = 0.08 + Math.random() * 0.18;
      const g = new THREE.SphereGeometry(r, 10, 10);
      const m = new THREE.MeshPhongMaterial({
        color: orbColors[i % orbColors.length],
        emissive: orbColors[i % orbColors.length],
        emissiveIntensity: 0.4,
        transparent: true, opacity: 0.8,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        -(Math.random() * 65)
      );
      scene.add(mesh);
      orbs.push({ mesh, basePos: mesh.position.clone(), speed: 0.3 + Math.random() * 0.5 });
    }

    // 7. Star field (particles deep in background)
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 2] = -(Math.random() * 80);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x8b83ff, size: 0.06, transparent: true, opacity: 0.6, sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // 8. Connecting tube / path along Z axis
    const tubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 5),
      new THREE.Vector3(2, 1, -9),
      new THREE.Vector3(-2, -1, -18),
      new THREE.Vector3(2, 0.5, -27),
      new THREE.Vector3(-1, -0.5, -36),
      new THREE.Vector3(2, 1, -45),
      new THREE.Vector3(-2, 0, -54),
      new THREE.Vector3(0, 0, -65),
    ]);
    const tubeGeo = new THREE.TubeGeometry(tubeCurve, 120, 0.02, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x6c63ff, transparent: true, opacity: 0.25,
    });
    scene.add(new THREE.Mesh(tubeGeo, tubeMat));

    // ─── Scroll state ────────────────────────────────────────
    // scrollProgress: 0 (top) → 1 (bottom of page)
    let currentScrollT = 0;  // smoothed scroll target
    let targetScrollT = 0;

    const getScrollT = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const handleScroll = () => {
      targetScrollT = getScrollT();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─── Resize ───────────────────────────────────────────────
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // ─── Mouse tracking removed ────────────────────────

    // ─── Camera path (follows tube curve on scroll) ──────────
    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 14),
      new THREE.Vector3(1.5, 0.5, 5),
      new THREE.Vector3(-1, -0.5, -5),
      new THREE.Vector3(1, 0.5, -14),
      new THREE.Vector3(-1.5, -0.5, -23),
      new THREE.Vector3(1, 0.5, -32),
      new THREE.Vector3(-1, 0, -42),
      new THREE.Vector3(0, 0, -52),
    ]);

    // ─── Animation loop ──────────────────────────────────────
    let animId;
    let elapsedTime = 0;
    let lastTimestamp = performance.now();

    const animate = (timestamp) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;
      elapsedTime += delta;

      // Smooth scroll tracking (lerp) — gives the "rewind" feel
      currentScrollT += (targetScrollT - currentScrollT) * 0.06;

      // ── Camera: follow path based on scroll ─────────────
      const camPos = cameraPath.getPoint(Math.min(currentScrollT * 0.98, 0.98));
      camera.position.lerp(camPos, 0.08);

    // (Mouse offset removed)

      // Camera looks slightly ahead on path
      const lookAheadT = Math.min(currentScrollT * 0.98 + 0.02, 0.99);
      const lookTarget = cameraPath.getPoint(lookAheadT);
      camera.lookAt(lookTarget);

      // ── Main shape rotations (scroll-driven) ──────────────
      const scrollAngle = currentScrollT * Math.PI * 4;

      // Ico group — rotates as camera passes
      icoGroup.rotation.y = scrollAngle * 0.8 + elapsedTime * 0.12;
      icoGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15;

      // Knot
      knot.rotation.x = scrollAngle * 1.2 + elapsedTime * 0.15;
      knot.rotation.y = elapsedTime * 0.1;
      scene.children.forEach(c => {
        if (c !== knot && c.position?.z === knot.position.z && c.geometry?.type === 'TorusKnotGeometry') {
          c.rotation.copy(knot.rotation);
        }
      });

      // Octahedron
      oct.rotation.x = scrollAngle * 0.9;
      oct.rotation.z = scrollAngle * 0.6 + elapsedTime * 0.2;
      octWire.rotation.copy(oct.rotation);

      // Dodecahedron
      dode.rotation.y = scrollAngle * 1.1 + elapsedTime * 0.1;
      dode.rotation.x = elapsedTime * 0.15;

      // ── Floating orbs subtle idle animation ──────────────
      orbs.forEach(({ mesh, basePos, speed }) => {
        mesh.position.y = basePos.y + Math.sin(elapsedTime * speed) * 0.3;
        mesh.position.x = basePos.x + Math.cos(elapsedTime * speed * 0.7) * 0.2;
      });

      // ── Lights pulsing ────────────────────────────────────
      light1.position.x = Math.sin(elapsedTime * 0.5) * 8 + 5;
      light1.position.y = Math.cos(elapsedTime * 0.3) * 6 + 5;
      light2.position.x = Math.cos(elapsedTime * 0.4) * 7 - 6;
      light2.position.z = Math.sin(elapsedTime * 0.6) * 5;
      light3.position.z = -10 + Math.sin(elapsedTime * 0.25) * 5;

      renderer.render(scene, camera);
    };
    animate(performance.now());

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="bg3d">
      <canvas ref={canvasRef} className="bg3d__canvas" />
    </div>
  );
}
