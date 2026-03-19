"use client";

import { useEffect, useRef } from "react";

export function GlobeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const resize = () => {
      const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
      canvas.width = size * window.devicePixelRatio;
      canvas.height = size * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    // Generate globe dots
    const DOT_COUNT = 1500;
    const dots: { lat: number; lon: number; size: number }[] = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      // Use fibonacci sphere for even distribution
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = ((Math.PI * (1 + Math.sqrt(5))) * i);
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const lat = Math.asin(y);
      const lon = Math.atan2(z, x);
      dots.push({ lat, lon, size: Math.random() * 1.5 + 0.5 });
    }

    // Connection arcs (simulated commerce routes)
    const arcs = [
      { from: { lat: 0.7, lon: -1.3 }, to: { lat: 0.9, lon: 0.2 } },   // NYC → London
      { from: { lat: 0.9, lon: 0.2 }, to: { lat: 0.4, lon: 1.8 } },    // London → Tokyo
      { from: { lat: 0.4, lon: 1.8 }, to: { lat: -0.6, lon: 2.5 } },   // Tokyo → Sydney
      { from: { lat: 0.6, lon: -2.1 }, to: { lat: 0.7, lon: -1.3 } },  // SF → NYC
      { from: { lat: 0.2, lon: 1.3 }, to: { lat: -0.1, lon: 0.6 } },   // Dubai → Nairobi
      { from: { lat: 0.9, lon: 0.2 }, to: { lat: 0.1, lon: -0.8 } },   // London → Sao Paulo
    ];

    const project = (lat: number, lon: number, rot: number) => {
      const x = Math.cos(lat) * Math.sin(lon + rot);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon + rot);
      return { x, y, z };
    };

    const animate = () => {
      const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.38;

      ctx.clearRect(0, 0, size, size);

      // Globe glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.5);
      glow.addColorStop(0, "rgba(99, 102, 241, 0.08)");
      glow.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // Globe outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw dots
      for (const dot of dots) {
        const p = project(dot.lat, dot.lon, rotation);
        if (p.z < 0) continue; // back side

        const sx = cx + p.x * r;
        const sy = cy - p.y * r;
        const opacity = 0.1 + p.z * 0.5;

        ctx.beginPath();
        ctx.arc(sx, sy, dot.size * (0.5 + p.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.fill();
      }

      // Draw arcs
      const time = Date.now() * 0.001;
      for (const arc of arcs) {
        const from = project(arc.from.lat, arc.from.lon, rotation);
        const to = project(arc.to.lat, arc.to.lon, rotation);
        if (from.z < -0.2 && to.z < -0.2) continue;

        const fx = cx + from.x * r;
        const fy = cy - from.y * r;
        const tx = cx + to.x * r;
        const ty = cy - to.y * r;

        // Arc control point (elevated)
        const mx = (fx + tx) / 2;
        const my = (fy + ty) / 2 - 40;

        const opacity = Math.min(from.z + 0.5, to.z + 0.5, 1) * 0.6;
        if (opacity <= 0) continue;

        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(mx, my, tx, ty);
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Animated pulse along arc
        const t = ((time * 0.5 + arcs.indexOf(arc) * 0.3) % 1);
        const px = (1 - t) * (1 - t) * fx + 2 * (1 - t) * t * mx + t * t * tx;
        const py = (1 - t) * (1 - t) * fy + 2 * (1 - t) * t * my + t * t * ty;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.fill();

        // Glow on pulse
        const pulseGlow = ctx.createRadialGradient(px, py, 0, px, py, 12);
        pulseGlow.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.5})`);
        pulseGlow.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = pulseGlow;
        ctx.fillRect(px - 12, py - 12, 24, 24);
      }

      rotation += 0.003;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ maxWidth: 600, maxHeight: 600 }}
    />
  );
}
