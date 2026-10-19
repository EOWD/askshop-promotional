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
          background: "#f4f0e6",
          color: "#17251d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: "#2f6b45",
              color: "#fbf9f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 700,
            }}
          >T</div>
          <div style={{ fontSize: 72, fontWeight: 700, display: "flex" }}>
            Tap<span style={{ color: "#2f6b45" }}>merce</span>
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 40, color: "#17251d", maxWidth: 900 }}>
          {site.tagline}
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#4b5850" }}>
          An AI assistant for your website, your own app, and AI marketplace listings.
        </div>
        <div style={{ position: "absolute", bottom: 56, left: 96, fontSize: 24, color: "#7a847c" }}>
          {site.domain}
        </div>
      </div>
    ),
    { ...size }
  );
}
