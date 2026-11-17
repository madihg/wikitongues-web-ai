import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Wikitongues AI: speakers teach AI models their own language";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Build-time social share card. Generated as a static PNG during export.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fbf8f2",
        padding: "80px",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: 34, fontWeight: 600, color: "#26211c" }}>
          Wikitongues
        </span>
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#ffffff",
            backgroundColor: "#3814a5",
            padding: "4px 14px",
            borderRadius: "8px",
            letterSpacing: "0.08em",
          }}
        >
          AI
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 600,
            color: "#26211c",
            lineHeight: 1.1,
          }}
        >
          Speakers teach AI models their own language.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#3814a5",
            fontWeight: 600,
          }}
        >
          Tested with Igala.
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#544a40" }}>
        How it works, what the speakers decided, and how to take part.
      </div>
    </div>,
    { ...size },
  );
}
