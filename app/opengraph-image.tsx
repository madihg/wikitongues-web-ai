import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Wikitongues AI - the Igala pilot";
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
        backgroundColor: "#fafaf8",
        padding: "80px",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: 34, fontWeight: 600, color: "#1a1a1a" }}>
          Wikitongues
        </span>
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#ffffff",
            backgroundColor: "#0c6b6b",
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
            color: "#1a1a1a",
            lineHeight: 1.1,
          }}
        >
          Teaching AI to speak the world&#8217;s underserved languages.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#0c6b6b",
            fontWeight: 600,
          }}
        >
          Starting with Igala.
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#595959" }}>
        A tutor and the first public benchmark, led by the community.
      </div>
    </div>,
    { ...size },
  );
}
