"use client";

const DEFAULT_ITEMS = [
  "Без VPN",
  "Без галлюцинаций",
  "Понимает русский",
  "Без карты",
  "1 480+ пользователей",
  "Помнит контекст",
  "Работает офлайн",
  "Данные в России",
  "iOS и Android",
  "Отвечает за 3 сек",
];

function MarqueeRow({
  reverse = false,
  items: itemsProp,
}: {
  reverse?: boolean;
  items: string[];
}) {
  const items = [...itemsProp, ...itemsProp];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: "0",
          animation: `marquee${reverse ? "-reverse" : ""} 28s linear infinite`,
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "0", flexShrink: 0 }}
          >
            <span
              style={{
                padding: "0 28px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#6B7280",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >
              {item}
            </span>
            <span
              style={{ color: "rgba(167,139,250,0.3)", fontSize: "10px", flexShrink: 0 }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarqueeSection({
  texts = {},
}: {
  texts?: Record<string, string | unknown>;
}) {
  const rawItems = texts["marqueeItems"];
  const ITEMS: string[] = Array.isArray(rawItems)
    ? (rawItems as string[])
    : DEFAULT_ITEMS;
  return (
    <div
      style={{
        padding: "18px 0",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(8,8,16,0.6)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <MarqueeRow items={ITEMS} />
    </div>
  );
}
