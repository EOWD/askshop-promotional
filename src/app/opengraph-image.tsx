import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share image, generated at build time for every route. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "linear-gradient(135deg, #06050e 0%, #14122a 60%, #1e1b4b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, display: "flex" }}>
            Ask<span style={{ color: "#818cf8" }}>Shop</span>
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 40, color: "rgba(255,255,255,0.72)", maxWidth: 900 }}>
          {site.tagline}
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "rgba(255,255,255,0.4)" }}>
          Dedicated native apps and an AI shopping marketplace, built on Shopify.
        </div>
        <div style={{ position: "absolute", bottom: 56, left: 96, fontSize: 24, color: "rgba(255,255,255,0.35)" }}>
          {site.domain}
        </div>
      </div>
    ),
    { ...size }
  );
}
