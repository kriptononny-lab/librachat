export default function Loading() {
  return (
    <div className="container-site py-20" style={{ animation: "pulse 2s infinite" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div
          style={{
            height: "56px",
            borderRadius: "12px",
            background: "rgba(167,139,250,0.08)",
            marginBottom: "16px",
          }}
        />
        <div
          style={{
            height: "28px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            marginBottom: "12px",
            width: "75%",
          }}
        />
        <div
          style={{
            height: "28px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.04)",
            width: "50%",
          }}
        />
      </div>
    </div>
  );
}
