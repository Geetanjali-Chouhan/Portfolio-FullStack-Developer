"use client";

import { useEffect, useRef } from "react";
import {
  BufferGeometry,
  CanvasTexture,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  MathUtils,
  OctahedronGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TetrahedronGeometry,
  WebGLRenderer,
} from "three";

const ROYAL = 0x2563eb;
const NAVY = 0x172554;
const SKY = 0x60a5fa;

const CAMERA_Z = 10;
const FOV = 40;

/** Wireframe of a polyhedron (edges only), with the source geometry released. */
function wireframe(source: BufferGeometry, color: number, opacity: number) {
  const edges = new EdgesGeometry(source);
  source.dispose();
  return new LineSegments(edges, new LineBasicMaterial({ color, transparent: true, opacity }));
}

/** A flat circle outline in the XY plane. */
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
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.9)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

/** Position of `el` inside `root`, ignoring CSS transforms (so intro animations don't skew it). */
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

type Satellite = {
  mesh: LineSegments;
  orbit: number;
  radius: number;
  speed: number;
  phase: number;
  spin: number;
};

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const root = mount?.parentElement;
    if (!mount || !root) return;

    // Browsers/devices without WebGL just keep the regular (non-3D) hero.
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
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

    // ---- Orbit system around the portrait ---------------------------------
    const system = new Group();
    scene.add(system);

    const orbits: Group[] = [
      { r: 3.3, color: ROYAL, opacity: 0.4, tilt: [1.1, 0.25, 0.0] as const },
      { r: 4.1, color: SKY, opacity: 0.55, tilt: [0.45, -0.7, 0.9] as const },
      { r: 2.6, color: NAVY, opacity: 0.25, tilt: [-0.9, 0.5, 0.3] as const },
    ].map(({ r, color, opacity, tilt }) => {
      const group = new Group();
      group.rotation.set(tilt[0], tilt[1], tilt[2]);
      group.add(orbitRing(r, color, opacity));
      system.add(group);
      return group;
    });

    const satellites: Satellite[] = [
      { mesh: wireframe(new IcosahedronGeometry(0.46, 0), ROYAL, 0.95), orbit: 0, radius: 3.3, speed: 0.42, phase: 0.4, spin: 1 },
      { mesh: wireframe(new OctahedronGeometry(0.4, 0), NAVY, 0.9), orbit: 1, radius: 4.1, speed: -0.3, phase: 2.4, spin: -1.2 },
      { mesh: wireframe(new TetrahedronGeometry(0.36, 0), ROYAL, 0.9), orbit: 2, radius: 2.6, speed: 0.55, phase: 4.2, spin: 1.5 },
      { mesh: wireframe(new IcosahedronGeometry(0.26, 0), SKY, 1), orbit: 1, radius: 4.1, speed: -0.3, phase: 5.3, spin: 0.9 },
    ];
    satellites.forEach((s) => {
      orbits[s.orbit].add(s.mesh);
      // Start on their orbit so a still frame (reduced motion) is already composed.
      s.mesh.position.set(Math.cos(s.phase) * s.radius, Math.sin(s.phase) * s.radius, 0);
    });

    // ---- Ambient particles --------------------------------------------------
    const COUNT = 110;
    const particlePositions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      particlePositions[i * 3] = MathUtils.randFloatSpread(2);
      particlePositions[i * 3 + 1] = MathUtils.randFloatSpread(2);
      particlePositions[i * 3 + 2] = MathUtils.randFloatSpread(1.2);
    }
    const particleGeometry = new BufferGeometry();
    particleGeometry.setAttribute("position", new Float32BufferAttribute(particlePositions, 3));
    const dots = dotTexture();
    const particleMaterial = new PointsMaterial({
      color: ROYAL,
      size: 0.11,
      map: dots,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const particles = new Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ---- Layout: anchor the orbit system to the portrait frame --------------
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
        // Side-by-side layout (lg+): hug the portrait closely and lean slightly right so
        // satellites don't sweep across the intro text. Stacked layout: let the rings
        // peek out past the photo's edges (the hero clips whatever leaves the viewport).
        const sideBySide = width >= 1024;
        const cx = box.x + box.width / 2 + (sideBySide ? box.width * 0.04 : 0);
        const cy = box.y + box.height / 2;
        system.position.set((cx / width - 0.5) * 2 * halfW, -(cy / height - 0.5) * 2 * halfH, 0);
        const targetDiameterPx = sideBySide
          ? box.width * 1.32
          : Math.min(box.width * 1.4, width * 1.2);
        system.scale.setScalar((targetDiameterPx * unitsPerPx) / (2 * 4.1));
      }

      particles.scale.set(halfW, halfH, 1);
      renderOnce();
    };

    // ---- Animation ------------------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer && !reduceMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    function renderOnce() {
      renderer.render(scene, camera);
    }

    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let elapsed = 0;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp after tab switches
      last = now;
      elapsed += dt;

      satellites.forEach((s) => {
        const angle = s.phase + elapsed * s.speed;
        s.mesh.position.set(Math.cos(angle) * s.radius, Math.sin(angle) * s.radius, 0);
        s.mesh.rotation.x += dt * 0.9 * s.spin;
        s.mesh.rotation.y += dt * 1.1 * s.spin;
      });

      // Ease toward the pointer for a soft parallax tilt.
      tilt.x += (pointer.y * 0.28 - tilt.x) * Math.min(dt * 3, 1);
      tilt.y += (pointer.x * 0.4 - tilt.y) * Math.min(dt * 3, 1);
      system.rotation.x = tilt.x;
      system.rotation.y = tilt.y + Math.sin(elapsed * 0.25) * 0.12;

      particles.rotation.z = elapsed * 0.012;
      particles.position.x = pointer.x * -0.25;
      particles.position.y = pointer.y * 0.18;

      renderOnce();
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

    // Don't burn battery while the hero is off-screen or the tab is hidden.
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
    document.fonts?.ready.then(layout); // text reflow can move the portrait

    layout();
    start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);

      scene.traverse((object) => {
        const disposable = object as unknown as {
          geometry?: BufferGeometry;
          material?: { dispose(): void };
        };
        disposable.geometry?.dispose();
        disposable.material?.dispose();
      });
      dots.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />;
}
