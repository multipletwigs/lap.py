import { ImageResponse } from "next/og";
import { getMDXData } from "@/lib/mdx";

// Route segment config
export const runtime = "nodejs";

// Image metadata
export const alt = "About Acme";
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
        height: "100vh",
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
  params: Promise<{ "file-index": string }>;
}) {
  const { "file-index": fileIndex } = await params;

  try {
    // Now fetch the correct metadata based on the found category
    const { metadata: metadataDetails } = getMDXData(
      "src/app/thoughts/(thoughts)",
      fileIndex,
    );

    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
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
            <div>📄 {metadataDetails.displayTitle}</div>
            <div style={{ fontSize: 18, color: "#666" }}>
              {metadataDetails.description}{" "}
            </div>
          </div>
        </div>
      ),
    );
  } catch (e) {
    return new ImageResponse(<NotFound />);
  }
}
