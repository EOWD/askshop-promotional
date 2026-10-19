"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

import { PULSE_EVENT } from "@/components/home/pulse";

type Kind =
  | "capsuleA"
  | "capsuleB"
  | "capsuleC"
  | "softgel"
  | "tablet"
  | "berry"
  | "leaf"
  | "almond"
  | "oat"
  | "strawberry"
  | "bottle"
  | "shaker"
  | "scoop";

type Body = {
  kind: Kind;
  /** 0 or 1 for a strand, -1 for a rung piece. */
  strand: number;
  u: number;
  rungT: number;
  jitter: THREE.Vector3;
  scatter: THREE.Vector3;
  spin: THREE.Vector3;
  rot: THREE.Euler;
  scale: number;
  bob: number;
  push: THREE.Vector3;
};

/** Half a capsule: a hemisphere on a short cylinder, open at the seam (y = 0). */
function halfCapsule(r: number, length: number) {
  const pts: THREE.Vector2[] = [];
  const body = length - r;
  for (let i = 0; i <= 12; i++) {
    const t = -Math.PI / 2 + (i / 12) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.max(0.0001, r * Math.cos(t)), -body + r * Math.sin(t)));
  }
  pts.push(new THREE.Vector2(r, 0));
  return new THREE.LatheGeometry(pts, 32);
}

function leafGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, -0.42);
  s.bezierCurveTo(0.26, -0.22, 0.26, 0.2, 0, 0.42);
  s.bezierCurveTo(-0.26, 0.2, -0.26, -0.22, 0, -0.42);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.015, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 16 });
  g.center();
  return g;
}

const lathe = (pts: [number, number][], seg = 32) =>
  new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(Math.max(0.0001, x), y)), seg);

/** Infant formula: a baby bottle as three parts (frosted body, collar, silicone teat). */
function bottleParts() {
  const body = lathe([[0, -0.34], [0.15, -0.34], [0.17, -0.3], [0.17, 0.12], [0.15, 0.17], [0.13, 0.2]]);
  const collar = new THREE.CylinderGeometry(0.145, 0.145, 0.1, 32).translate(0, 0.25, 0);
  const teat = lathe([[0.11, 0.3], [0.07, 0.34], [0.04, 0.42], [0.035, 0.49], [0, 0.5]]);
  return { body, collar, teat };
}

/** Sports nutrition: a protein shaker (frosted cup, dark cap with spout). */
function shakerParts() {
  const cup = lathe([[0, -0.36], [0.16, -0.36], [0.19, 0.24], [0.19, 0.26]]);
  const cap = mergeGeometries([
    new THREE.CylinderGeometry(0.2, 0.2, 0.12, 32).translate(0, 0.32, 0),
    new THREE.CylinderGeometry(0.05, 0.06, 0.08, 16).translate(0.08, 0.42, 0),
  ])!;
  return { cup, cap };
}

/** Sports nutrition: a measuring scoop (flat-bottomed cup, long handle) with a mound of powder. */
function scoopParts() {
  const cup = lathe([[0, -0.11], [0.13, -0.11], [0.15, 0.07], [0.155, 0.08]]);
  const shell = mergeGeometries([cup, new THREE.BoxGeometry(0.46, 0.035, 0.07).translate(0.38, 0.0, 0)])!;
  const powder = new THREE.SphereGeometry(0.15, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.4, 1).translate(0, 0.06, 0);
  return { shell, powder };
}

/** Healthy food: a strawberry with a green calyx. */
function strawberryParts() {
  const fruit = lathe([[0, -0.22], [0.07, -0.18], [0.14, -0.06], [0.165, 0.05], [0.14, 0.14], [0.06, 0.18], [0, 0.18]]);
  const calyx = new THREE.ConeGeometry(0.13, 0.05, 7).translate(0, 0.2, 0);
  return { fruit, calyx };
}

/** Deterministic PRNG so every load builds the same helix. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Supplements are one part of nutrition: about a third of the helix, the rest is formula, sports and food.
const WEIGHTS: [Kind, number][] = [
  ["capsuleA", 0.08],
  ["capsuleB", 0.05],
  ["capsuleC", 0.05],
  ["softgel", 0.08],
  ["tablet", 0.06],
  ["bottle", 0.08],
  ["shaker", 0.08],
  ["scoop", 0.07],
  ["berry", 0.12],
  ["strawberry", 0.09],
  ["oat", 0.08],
  ["leaf", 0.09],
  ["almond", 0.07],
];

function pickKind(r: number): Kind {
  let acc = 0;
  for (const [k, w] of WEIGHTS) {
    acc += w;
    if (r < acc) return k;
  }
  return "berry";
}

/**
 * A slowly turning double helix made of nutrition: capsules, softgels and tablets
 * woven with blueberries, leaves and almonds. The pointer pushes pieces aside, the
 * assistant demo bursts it apart, and scrolling lifts and twists it.
 */
export function CapsuleField({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const small = window.innerWidth < 768;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: small ? "low-power" : "high-performance" });
    } catch {
      el.dataset.fallback = "true";
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry32(7);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xefeae4, 10, 22);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0, 13);

    const key = new THREE.DirectionalLight(0xfff1e6, 2.2);
    key.position.set(4, 6, 8);
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.35));

    // ---- Materials ----
    const plastic = (color: number) =>
      new THREE.MeshPhysicalMaterial({ color, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12, sheen: 0.4 });
    // Terracotta, not the action orange: saturated orange is reserved for things you can press.
    const terracotta = plastic(0xe0875e);
    const cream = plastic(0xf7f2ea);
    const ink = plastic(0x2a2a2d);
    const mats = {
      tablet: new THREE.MeshPhysicalMaterial({ color: 0xebe4d8, roughness: 0.62, clearcoat: 0.2 }),
      softgel: new THREE.MeshPhysicalMaterial({
        color: 0xf0a040,
        roughness: 0.08,
        transmission: 0.9,
        thickness: 0.6,
        ior: 1.45,
        attenuationColor: new THREE.Color(0xd9761a),
        attenuationDistance: 0.6,
        clearcoat: 1,
      }),
      berry: new THREE.MeshPhysicalMaterial({ color: 0x2c3566, roughness: 0.42, sheen: 0.35, sheenColor: new THREE.Color(0x8d98c4), sheenRoughness: 0.6 }),
      leaf: new THREE.MeshPhysicalMaterial({ color: 0x6f9a52, roughness: 0.5, clearcoat: 0.4, side: THREE.DoubleSide }),
      almond: new THREE.MeshPhysicalMaterial({ color: 0xb98556, roughness: 0.75 }),
      oat: new THREE.MeshPhysicalMaterial({ color: 0xdcc79c, roughness: 0.85 }),
      strawberry: new THREE.MeshPhysicalMaterial({ color: 0xc8434a, roughness: 0.32, clearcoat: 0.6 }),
      calyx: new THREE.MeshPhysicalMaterial({ color: 0x5f8a45, roughness: 0.55, side: THREE.DoubleSide }),
      // Translucent rather than true transmission: dozens of glass bodies stall mid-range GPUs.
      frosted: new THREE.MeshPhysicalMaterial({ color: 0xfbf8f3, roughness: 0.22, clearcoat: 1, transparent: true, opacity: 0.82, depthWrite: false }),
      teat: new THREE.MeshPhysicalMaterial({ color: 0xe8c39a, roughness: 0.3, clearcoat: 0.6 }),
      powder: new THREE.MeshPhysicalMaterial({ color: 0xefe6d4, roughness: 0.95 }),
      scoop: new THREE.MeshPhysicalMaterial({ color: 0xf7f2ea, roughness: 0.3, clearcoat: 1, side: THREE.DoubleSide }),
    };

    // ---- Geometry ----
    const halfA = halfCapsule(0.22, 0.36);
    const halfB = halfCapsule(0.228, 0.4);
    halfB.rotateX(Math.PI);
    const geos = {
      tablet: new THREE.SphereGeometry(0.3, 32, 16).scale(1, 0.42, 1),
      softgel: new THREE.SphereGeometry(0.22, 32, 24).scale(1, 1.55, 1),
      berry: new THREE.SphereGeometry(0.21, 32, 24).scale(1, 0.88, 1),
      leaf: leafGeometry(),
      almond: new THREE.SphereGeometry(0.3, 24, 16).scale(0.62, 0.42, 1.05),
      oat: new THREE.SphereGeometry(0.22, 20, 10).scale(1, 0.14, 0.72),
    };
    const bottle = bottleParts();
    const shaker = shakerParts();
    const scoop = scoopParts();
    const berryFruit = strawberryParts();

    // ---- Bodies on the helix ----
    const strandCount = small ? 26 : 74;
    const rungs = small ? 7 : 20;
    const perRung = small ? 2 : 3;
    const bodies: Body[] = [];
    const make = (strand: number, u: number, rungT: number, spread: number): Body => ({
      kind: pickKind(rand()),
      strand,
      u,
      rungT,
      jitter: new THREE.Vector3((rand() - 0.5) * spread, (rand() - 0.5) * spread, (rand() - 0.5) * spread),
      scatter: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() * 0.5).normalize(),
      spin: new THREE.Vector3((rand() - 0.5) * 0.9, (rand() - 0.5) * 0.9, (rand() - 0.5) * 0.9),
      rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      scale: 0.75 + rand() * 0.6,
      bob: rand() * Math.PI * 2,
      push: new THREE.Vector3(),
    });
    for (let s = 0; s < 2; s++) for (let i = 0; i < strandCount; i++) bodies.push(make(s, i / (strandCount - 1), 0, 0.22));
    // Rung pieces stay small so bottles and shakers ride the strands, not the middle.
    for (const b of bodies) if (b.strand === -1 && ["bottle", "shaker", "scoop"].includes(b.kind)) b.kind = "berry";
    for (let r = 0; r < rungs; r++)
      for (let j = 0; j < perRung; j++) bodies.push(make(-1, (r + 0.5) / rungs, (j + 1) / (perRung + 1), 0.2));

    // ---- Instanced meshes per kind ----
    type Group = { bodies: Body[]; meshes: THREE.InstancedMesh[] };
    const groups: Group[] = [];
    const addGroup = (kind: Kind, parts: [THREE.BufferGeometry, THREE.Material][]) => {
      const owned = bodies.filter((b) => b.kind === kind);
      if (!owned.length) return;
      const meshes = parts.map(([g, m]) => new THREE.InstancedMesh(g, m, owned.length));
      meshes.forEach((m) => scene.add(m));
      groups.push({ bodies: owned, meshes });
    };
    addGroup("capsuleA", [[halfA, terracotta], [halfB, cream]]);
    addGroup("capsuleB", [[halfA, cream], [halfB, cream]]);
    addGroup("capsuleC", [[halfA, ink], [halfB, terracotta]]);
    addGroup("softgel", [[geos.softgel, mats.softgel]]);
    addGroup("tablet", [[geos.tablet, mats.tablet]]);
    addGroup("berry", [[geos.berry, mats.berry]]);
    addGroup("leaf", [[geos.leaf, mats.leaf]]);
    addGroup("almond", [[geos.almond, mats.almond]]);
    addGroup("oat", [[geos.oat, mats.oat]]);
    addGroup("strawberry", [[berryFruit.fruit, mats.strawberry], [berryFruit.calyx, mats.calyx]]);
    addGroup("bottle", [[bottle.body, mats.frosted], [bottle.collar, terracotta], [bottle.teat, mats.teat]]);
    addGroup("shaker", [[shaker.cup, mats.frosted], [shaker.cap, ink]]);
    addGroup("scoop", [[scoop.shell, mats.scoop], [scoop.powder, mats.powder]]);

    // ---- Interaction state ----
    const pointer = new THREE.Vector2(0, 0);
    const pointerWorld = new THREE.Vector3(999, 999, 0);
    let pointerActive = false;
    let pulse = 0;
    let visible = true;
    let progress = 0;

    const onPointer = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerActive = true;
    };
    const onLeave = () => {
      pointerActive = false;
    };
    const onPulse = () => {
      pulse = 1;
      if (reduce) frame(0);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener(PULSE_EVENT, onPulse);

    let radius = 3.6;
    let span = 12;
    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
      // Fit the helix to the visible width so strands frame the content rather than cross it.
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      radius = Math.min(4.4, halfH * camera.aspect * 0.86);
      span = halfH * 2.6;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) loop();
    });
    io.observe(el);

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();
    const a = new THREE.Vector3();
    const b2 = new THREE.Vector3();
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const turns = 2.1;
    const place = (b: Body, t: number, dt: number) => {
      const phase = t * 0.16 + progress * 1.6;
      const theta = b.u * turns * Math.PI * 2 + phase;
      const y = (b.u - 0.5) * span + progress * 3.5;
      a.set(Math.cos(theta) * radius, y, Math.sin(theta) * radius * 0.7 - 1.5);
      b2.set(Math.cos(theta + Math.PI) * radius, y, Math.sin(theta + Math.PI) * radius * 0.7 - 1.5);
      if (b.strand === 0) pos.copy(a);
      else if (b.strand === 1) pos.copy(b2);
      else pos.copy(a).lerp(b2, b.rungT);
      pos.addScaledVector(b.jitter, 1 + Math.sin(t * 0.8 + b.bob) * 0.25);
      pos.addScaledVector(b.scatter, pulse * 3.2);
      if (pointerActive) {
        const dx = pos.x - pointerWorld.x;
        const dy = pos.y - pointerWorld.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 4) {
          const f = (1 - d2 / 4) * 0.12;
          b.push.x += dx * f;
          b.push.y += dy * f;
          b.push.z += f * 0.6;
        }
      }
      b.push.multiplyScalar(0.94);
      pos.add(b.push);
      // Phones: keep the headline band clear by sliding pieces there out to the edges.
      if (small && pos.y > 2.4 && Math.abs(pos.x) < radius) pos.x = Math.sign(pos.x || 1) * (radius + 0.15);
      const swirl = 1 + pulse * 4;
      b.rot.x += b.spin.x * dt * swirl;
      b.rot.y += b.spin.y * dt * swirl;
      b.rot.z += b.spin.z * dt * swirl;
      q.setFromEuler(b.rot);
      scl.setScalar(b.scale);
      m.compose(pos, q, scl);
    };

    const clock = new THREE.Clock();
    let raf = 0;
    const frame = (dt: number) => {
      const t = clock.elapsedTime;
      const rect = el.getBoundingClientRect();
      progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));

      ray.setFromCamera(pointer, camera);
      ray.ray.intersectPlane(plane, pointerWorld);

      camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, progress * 2, 0);

      for (const g of groups) {
        g.bodies.forEach((b, i) => {
          place(b, t, dt);
          g.meshes.forEach((mesh) => mesh.setMatrixAt(i, m));
        });
        g.meshes.forEach((mesh) => (mesh.instanceMatrix.needsUpdate = true));
      }

      pulse *= 0.955;
      renderer.render(scene, camera);
    };

    const loop = () => {
      cancelAnimationFrame(raf);
      const tick = () => {
        if (!visible || document.hidden) return;
        frame(Math.min(clock.getDelta(), 0.05));
        raf = requestAnimationFrame(tick);
      };
      clock.getDelta();
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (!document.hidden && visible && !reduce) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) frame(0);
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener(PULSE_EVENT, onPulse);
      document.removeEventListener("visibilitychange", onVisibility);
      [
        halfA,
        halfB,
        ...Object.values(geos),
        ...Object.values(bottle),
        ...Object.values(shaker),
        ...Object.values(scoop),
        ...Object.values(berryFruit),
      ].forEach((g) => g.dispose());
      [terracotta, cream, ink, ...Object.values(mats)].forEach((mat) => mat.dispose());
      groups.forEach((g) => g.meshes.forEach((mesh) => mesh.dispose()));
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={className} aria-hidden />;
}
