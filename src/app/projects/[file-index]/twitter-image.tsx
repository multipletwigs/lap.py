import { ImageResponse } from "next/og";
import metadata, { Category } from "../(project-md)/directory";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About nightly.ink :)";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function NotFound() {
  return (
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
      <div>
        <div>📄 Page does not seem to exist sadly... 😢</div>
        <div style={{ fontSize: 18, color: "#666" }}>
          🚶‍♂️ Maybe it went for a walk? 🤔 Or got lost in the 🌌 cosmos?
        </div>
      </div>
    </div>
  );
}

// Image generation
export default async function Image({
  params,
}: {
  params: { "file-index": string };
}) {
  const page_metadata: any = Object.keys(metadata).find(
    (category) => metadata[category as Category][params["file-index"]],
  );

  if (!page_metadata) {
    return <NotFound />;
  }

  // Now fetch the correct metadata based on the found category
  const metadataDetails =
    metadata[page_metadata as Category][params["file-index"]];

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
        <div>
          <div>📄 {metadataDetails.title}</div>
          <div style={{ fontSize: 18, color: "#666" }}>
            {metadataDetails.description}{" "}
          </div>
        </div>
      </div>
    ),
  );
}
