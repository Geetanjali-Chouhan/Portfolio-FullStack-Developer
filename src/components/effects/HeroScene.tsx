"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineLoop,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  TetrahedronGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";

const GOLD = 0xc5a46d;
const GOLD_LIGHT = 0xdfca9f;
const ROYAL = 0x2563eb;
const ROYAL_DARK = 0x142b50;
const NAVY = 0x0b1428;

const CAMERA_Z = 10;
const FOV = 40;

function orbitRing(radius: number, color: number, opacity: number) {
  const segments = 160;
  const positions: number[] = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    positions.push(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  return new LineLoop(geometry, new LineBasicMaterial({ color, transparent: true, opacity }));
}

function dotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(223, 202, 159, 1)");
  gradient.addColorStop(0.5, "rgba(197, 164, 109, 0.8)");
  gradient.addColorStop(1, "rgba(197, 164, 109, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

function boxWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight };
}

type Crystal = {
  mesh: Mesh;
  orbit: number;
  radius: number;
  speed: number;
  phase: number;
  spinX: number;
  spinY: number;
};

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const root = mount?.parentElement;
    if (!mount || !root) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.z = CAMERA_Z;

    // ---- Luxury Lighting ----------------------------------------------------
    const ambientLight = new AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldPointLight = new PointLight(GOLD_LIGHT, 3, 20);
    goldPointLight.position.set(4, 5, 6);
    scene.add(goldPointLight);

    const blueDirLight = new DirectionalLight(ROYAL, 2.2);
    blueDirLight.position.set(-5, -3, 5);
    scene.add(blueDirLight);

    // ---- Orbit system around the portrait -----------------------------------
    const system = new Group();
    scene.add(system);

    const orbits: Group[] = [
      { r: 3.5, color: GOLD, opacity: 0.45, tilt: [1.05, 0.3, 0.0] as const },
      { r: 4.3, color: ROYAL, opacity: 0.4, tilt: [0.45, -0.7, 0.8] as const },
      { r: 2.7, color: GOLD_LIGHT, opacity: 0.3, tilt: [-0.85, 0.45, 0.35] as const },
    ].map(({ r, color, opacity, tilt }) => {
      const group = new Group();
      group.rotation.set(tilt[0], tilt[1], tilt[2]);
      group.add(orbitRing(r, color, opacity));
      system.add(group);
      return group;
    });

    // Luxury Material Presets
    const goldMat = new MeshStandardMaterial({
      color: GOLD,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });
    const royalMat = new MeshStandardMaterial({
      color: ROYAL_DARK,
      metalness: 0.6,
      roughness: 0.3,
    });
    const glassMat = new MeshStandardMaterial({
      color: GOLD_LIGHT,
      metalness: 0.9,
      roughness: 0.15,
    });

    const crystals: Crystal[] = [
      {
        mesh: new Mesh(new IcosahedronGeometry(0.38, 0), goldMat),
        orbit: 0,
        radius: 3.5,
        speed: 0.35,
        phase: 0.5,
        spinX: 1.2,
        spinY: 0.8,
      },
      {
        mesh: new Mesh(new OctahedronGeometry(0.32, 0), royalMat),
        orbit: 1,
        radius: 4.3,
        speed: -0.28,
        phase: 2.2,
        spinX: -0.9,
        spinY: 1.1,
      },
      {
        mesh: new Mesh(new TetrahedronGeometry(0.28, 0), goldMat),
        orbit: 2,
        radius: 2.7,
        speed: 0.48,
        phase: 4.1,
        spinX: 1.4,
        spinY: -1.0,
      },
      {
        mesh: new Mesh(new TorusGeometry(0.22, 0.07, 16, 32), glassMat),
        orbit: 1,
        radius: 4.3,
        speed: -0.28,
        phase: 5.2,
        spinX: 1.1,
        spinY: 1.3,
      },
    ];

    crystals.forEach((c) => {
      orbits[c.orbit].add(c.mesh);
      c.mesh.position.set(Math.cos(c.phase) * c.radius, Math.sin(c.phase) * c.radius, 0);
    });

    // ---- Ambient Golden & Sapphire Particle Dust ---------------------------
    const COUNT = 140;
    const particlePositions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      particlePositions[i * 3] = MathUtils.randFloatSpread(2.2);
      particlePositions[i * 3 + 1] = MathUtils.randFloatSpread(2.2);
      particlePositions[i * 3 + 2] = MathUtils.randFloatSpread(1.4);
    }
    const particleGeometry = new BufferGeometry();
    particleGeometry.setAttribute("position", new Float32BufferAttribute(particlePositions, 3));
    const dots = dotTexture();
    const particleMaterial = new PointsMaterial({
      color: GOLD_LIGHT,
      size: 0.12,
      map: dots,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const particles = new Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ---- Layout & Projection -----------------------------------------------
    let halfW = 1;
    let halfH = 1;
    const layout = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      halfH = Math.tan(MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
      halfW = halfH * camera.aspect;
      const unitsPerPx = (2 * halfH) / height;

      const photo = root.querySelector<HTMLElement>("[data-hero-photo]");
      if (photo) {
        const box = boxWithin(photo, root);
        const sideBySide = width >= 1024;
        const cx = box.x + box.width / 2 + (sideBySide ? box.width * 0.04 : 0);
        const cy = box.y + box.height / 2;
        system.position.set((cx / width - 0.5) * 2 * halfW, -(cy / height - 0.5) * 2 * halfH, 0);
        const targetDiameterPx = sideBySide
          ? box.width * 1.36
          : Math.min(box.width * 1.45, width * 1.25);
        system.scale.setScalar((targetDiameterPx * unitsPerPx) / (2 * 4.3));
      }

      particles.scale.set(halfW, halfH, 1);
      renderer.render(scene, camera);
    };

    // ---- Animation Loop & Parallax -----------------------------------------
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer && !reduceMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let elapsed = 0;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;

      crystals.forEach((c) => {
        const angle = c.phase + elapsed * c.speed;
        c.mesh.position.set(Math.cos(angle) * c.radius, Math.sin(angle) * c.radius, 0);
        c.mesh.rotation.x += dt * c.spinX;
        c.mesh.rotation.y += dt * c.spinY;
      });

      tilt.x += (pointer.y * 0.3 - tilt.x) * Math.min(dt * 3.5, 1);
      tilt.y += (pointer.x * 0.45 - tilt.y) * Math.min(dt * 3.5, 1);
      system.rotation.x = tilt.x;
      system.rotation.y = tilt.y + Math.sin(elapsed * 0.2) * 0.12;

      particles.rotation.z = elapsed * 0.015;
      particles.position.x = pointer.x * -0.25;
      particles.position.y = pointer.y * 0.2;

      goldPointLight.position.x = 4 + pointer.x * 2;
      goldPointLight.position.y = 5 - pointer.y * 2;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(root);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(mount);
    const photoEl = root.querySelector<HTMLElement>("[data-hero-photo]");
    if (photoEl) resizeObserver.observe(photoEl);
    document.fonts?.ready.then(layout);

    layout();
    start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);

      dots.dispose();
      goldMat.dispose();
      royalMat.dispose();
      glassMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />;
}
