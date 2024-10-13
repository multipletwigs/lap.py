import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About nightly.inks :)";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: "10px 20px",
          justifyContent: "space-between",
          fontFamily: 'Inter, "Material Icons"',
          fontSize: 28,
          backgroundColor: "white",
        }}
      >
        <div>👋 Hello! This is nightly.ink 🌙✨</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>📄 Welcome to my thoughts!</div>
          <div style={{ fontSize: 18, color: "#666" }}>
            Maybe you'll find rambling, don't think there's a lot of wisdom
            there{" "}
          </div>
        </div>
      </div>
    ),
  );
}
