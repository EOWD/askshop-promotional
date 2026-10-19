"use client";

import dynamic from "next/dynamic";

// three.js loads in its own chunk after hydration, so the hero text and demo are interactive first.
export const HeroField = dynamic(() => import("@/components/home/CapsuleField").then((m) => m.CapsuleField), {
  ssr: false,
});
