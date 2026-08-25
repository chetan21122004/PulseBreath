import { ImageResponse } from "next/og";

export const alt =
  "PulseBreath Physiotherapy — specialist cardiac and pulmonary rehabilitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "#1e2e3d",
        background:
          "linear-gradient(135deg, #f8fbfb 0%, #e6f3f1 45%, #f8e9ee 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: 999,
          top: -170,
          right: -90,
          background: "rgba(176, 64, 96, 0.16)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: 999,
          bottom: -180,
          left: -80,
          background: "rgba(47, 143, 132, 0.18)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: 1010,
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "72px 82px",
          border: "2px solid rgba(30, 46, 61, 0.10)",
          borderRadius: 34,
          background: "rgba(255, 255, 255, 0.82)",
          boxShadow: "0 28px 80px rgba(30, 46, 61, 0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 64, fontWeight: 800 }}>
          <span style={{ color: "#b04060" }}>PULSE</span>
          <span>BREATH</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 7,
            color: "#51616d",
          }}
        >
          PHYSIOTHERAPY
        </div>
        <div style={{ display: "flex", marginTop: 50, fontSize: 37, lineHeight: 1.25 }}>
          Specialist cardiac and pulmonary rehabilitation
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 25, color: "#2f8f84" }}>
          Supervised care with Dr. Deepali Shah (PT)
        </div>
      </div>
    </div>,
    size,
  );
}

