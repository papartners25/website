"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const stackLayers = [
  { color: 0x7dd3fc, emissive: 0x0c4a6e, width: 5.4, depth: 2.65, x: -0.12 },
  { color: 0xd4af37, emissive: 0x78350f, width: 4.72, depth: 2.38, x: 0.16 },
  { color: 0x34d399, emissive: 0x064e3b, width: 3.88, depth: 2.05, x: -0.02 },
  { color: 0xc4b5fd, emissive: 0x4c1d95, width: 3.12, depth: 1.72, x: 0.22 },
  { color: 0xf8fafc, emissive: 0x334155, width: 2.32, depth: 1.38, x: -0.08 },
];

const nodePositions: Array<[number, number, number]> = [
  [-3.1, 0.1, 1.5],
  [3.0, 0.6, -1.48],
  [-2.45, 1.35, -1.35],
  [2.2, 1.95, 1.16],
  [0.3, 2.85, 0],
];

export default function CapitalStackScene() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.className = "h-full w-full";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Depth fog tuned to the page background so far geometry dissolves into it.
    scene.fog = new THREE.Fog(0x090b10, 9, 20);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const cameraHome = new THREE.Vector3(6.4, 4.7, 7.2);
    camera.position.copy(cameraHome);

    // Two parallax groups: the stack reacts strongly to the pointer, the far
    // particle field drifts the opposite way for a sense of depth.
    const rig = new THREE.Group();
    rig.rotation.set(-0.14, -0.36, 0.02);
    scene.add(rig);

    const farField = new THREE.Group();
    scene.add(farField);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    stackLayers.forEach((layer, index) => {
      const geometry = new THREE.BoxGeometry(layer.width, 0.38, layer.depth);
      geometries.push(geometry);
      const material = new THREE.MeshStandardMaterial({
        color: layer.color,
        emissive: layer.emissive,
        emissiveIntensity: 0.22,
        roughness: 0.44,
        metalness: 0.24,
        transparent: true,
        opacity: 0.92,
      });
      materials.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(layer.x, index * 0.48, 0);
      rig.add(mesh);

      const edgeGeometry = new THREE.EdgesGeometry(geometry);
      geometries.push(edgeGeometry);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
      });
      materials.push(edgeMaterial);
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      edges.position.copy(mesh.position);
      rig.add(edges);
    });

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: 0x92400e,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.35,
    });
    materials.push(nodeMaterial);
    const nodeGeometry = new THREE.SphereGeometry(0.1, 24, 16);
    geometries.push(nodeGeometry);

    const nodeMeshes: THREE.Mesh[] = [];
    nodePositions.forEach((position) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(...position);
      rig.add(node);
      nodeMeshes.push(node);
    });

    const curveMaterial = new THREE.LineBasicMaterial({
      color: 0xf8fafc,
      transparent: true,
      opacity: 0.26,
    });
    materials.push(curveMaterial);

    for (let i = 0; i < nodePositions.length - 1; i += 1) {
      const start = new THREE.Vector3(...nodePositions[i]);
      const end = new THREE.Vector3(...nodePositions[i + 1]);
      const mid = start.clone().lerp(end, 0.5);
      mid.y += 0.72;
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(28);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      geometries.push(geometry);
      rig.add(new THREE.Line(geometry, curveMaterial));
    }

    const grid = new THREE.GridHelper(8, 16, 0x94a3b8, 0x334155);
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.16;
    materials.push(gridMaterial);
    grid.position.y = -0.48;
    rig.add(grid);

    // Floating capital "dust" — a sparse particle field that gives the scene
    // parallax depth and keeps it alive even when the pointer is still.
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    geometries.push(particleGeometry);
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.055,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materials.push(particleMaterial);
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    farField.add(particles);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 1.8, 18);
    fillLight.position.set(-5, 2.2, 3.5);
    scene.add(fillLight);

    const warmLight = new THREE.PointLight(0xf59e0b, 1.5, 14);
    warmLight.position.set(4, 0.8, -3);
    scene.add(warmLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    // Pointer is normalized to the viewport so the scene reacts wherever the
    // cursor is over the hero — including above the headline and CTAs, which
    // sit on a higher stacking layer than the canvas.
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let animationFrame = 0;
    let running = false;
    let inView = true;

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    // Mobile: let device tilt drive the same parallax channel.
    const onDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;
      target.x = THREE.MathUtils.clamp(event.gamma / 45, -1, 1);
      target.y = THREE.MathUtils.clamp((event.beta - 45) / 45, -1, 1);
    };

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      // Ease the pointer toward its target so motion feels weighted, not jittery.
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;

      rig.rotation.y += (-0.36 + pointer.x * 0.5 - rig.rotation.y) * 0.06;
      rig.rotation.x += (-0.14 - pointer.y * 0.26 - rig.rotation.x) * 0.06;
      rig.rotation.z = Math.sin(elapsed * 0.38) * 0.025;
      rig.position.y = Math.sin(elapsed * 0.82) * 0.06;

      // Camera dolly/parallax — a small counter-move adds dimensionality.
      camera.position.x += (cameraHome.x - pointer.x * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (cameraHome.y + pointer.y * 1.0 - camera.position.y) * 0.05;
      camera.lookAt(0, 0.95, 0);

      // Far field drifts gently and leans opposite the pointer for depth.
      farField.rotation.y = elapsed * 0.015 - pointer.x * 0.12;
      farField.rotation.x = -pointer.y * 0.06;
      particles.position.y = Math.sin(elapsed * 0.25) * 0.4;

      nodeMeshes.forEach((node, i) => {
        const pulse = 0.4 + Math.sin(elapsed * 1.6 + i) * 0.18;
        (node.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      });

      fillLight.position.x = -5 + pointer.x * 2.6;
      warmLight.position.z = -3 + pointer.y * 1.6;

      renderer.render(scene, camera);
    };

    const animateScene = () => {
      renderFrame();
      animationFrame = window.requestAnimationFrame(animateScene);
    };

    const start = () => {
      if (running || prefersReducedMotion) return;
      running = true;
      animateScene();
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(animationFrame);
    };

    const updateRunState = () => {
      if (inView && document.visibilityState === "visible") start();
      else stop();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // Only animate while the hero is actually on screen.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        updateRunState();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(host);

    const onVisibility = () => updateRunState();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("deviceorientation", onDeviceOrientation, true);

    resize();
    if (prefersReducedMotion) {
      // Render a single composed frame and leave it static.
      renderFrame();
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation, true);
      renderer.dispose();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
}
