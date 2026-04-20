import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { FOOTER_NAV, SITE_CONFIG } from "@/lib/constants";

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.7 8.02c-.12.56-.46.7-.93.43l-2.55-1.88-1.23 1.18c-.14.13-.25.25-.51.25l.18-2.59 4.7-4.25c.2-.18-.05-.28-.31-.1L8.17 14.6 5.65 13.8c-.55-.17-.56-.55.12-.81l8.85-3.41c.46-.17.86.11.02 1.22z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.71-1.033-1.005-1.49-.9-1.49.524v1.51c0 .42-.133.67-1.228.67-1.812 0-3.827-1.098-5.24-3.133C5.37 11.598 5 9.224 5 8.761c0-.47.127-.673.597-.673h1.744c.447 0 .618.194.79.65.873 2.52 2.335 4.726 2.938 4.726.225 0 .328-.103.328-.668V10.28c-.065-1.2-.703-1.302-.703-1.73 0-.22.18-.44.466-.44h2.742c.374 0 .506.2.506.628v3.376c0 .374.165.506.267.506.225 0 .413-.132.825-.544 1.274-1.43 2.18-3.63 2.18-3.63.12-.25.32-.482.767-.482h1.744c.525 0 .64.27.525.637-.22.964-2.35 4.02-2.35 4.02-.187.3-.254.433 0 .77.188.255.8.783 1.21 1.258.754.862 1.33 1.587 1.487 2.085.165.492-.09.742-.596.742z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.13C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.13C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://t.me/", icon: <TelegramIcon />, label: "Telegram" },
  { href: SITE_CONFIG.social.vk, icon: <VkIcon />, label: "ВКонтакте" },
  { href: SITE_CONFIG.social.youtube, icon: <YoutubeIcon />, label: "YouTube" },
];

const NAV_COLUMNS = [
  { title: "Продукт", links: FOOTER_NAV.product },
  { title: "Компания", links: FOOTER_NAV.company },
  { title: "Решения", links: FOOTER_NAV.learn },
  { title: "Поддержка", links: FOOTER_NAV.legal },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ marginTop: "auto", background: "#040408", position: "relative" }}>
      {/* Градиентный переход — вместо жёсткой линии */}
      <div
        style={{
          height: "80px",
          background:
            "linear-gradient(to bottom, transparent, rgba(4,4,8,0.6) 60%, #040408 100%)",
          marginTop: "-80px",
          pointerEvents: "none",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Тонкая акцентная линия с фиолетовым свечением */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.3) 30%, rgba(167,139,250,0.5) 50%, rgba(167,139,250,0.3) 70%, transparent 100%)",
        }}
      />

      <div className="container-site" style={{ padding: "56px 0 40px" }}>
        {/* Основная сетка */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {/* Бренд */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Logo />
            <p
              style={{
                fontSize: "14px",
                color: "#4B556A",
                lineHeight: 1.65,
                maxWidth: "220px",
              }}
            >
              ИИ-ассистент нового поколения для работы, учёбы и творчества.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4B556A",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                    transition: "all 200ms ease",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Навигационные колонки */}
          {NAV_COLUMNS.slice(0, 3).map((col) => (
            <div
              key={col.title}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(167,139,250,0.4)",
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {col.title}
              </p>
              {col.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "#4B556A",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    lineHeight: 1.4,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Колонка поддержки — контакты */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(167,139,250,0.4)",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Поддержка
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#100A1E",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Email
              </p>
              <a
                href="mailto:support@librachat.kz"
                style={{ fontSize: "13px", color: "#4B556A", textDecoration: "none" }}
              >
                support@librachat.kz
              </a>
              <a
                href="mailto:business@librachat.kz"
                style={{ fontSize: "13px", color: "#4B556A", textDecoration: "none" }}
              >
                business@librachat.kz
              </a>
              <p
                style={{
                  fontSize: "11px",
                  color: "#100A1E",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginTop: "6px",
                }}
              >
                Телефон
              </p>
              <a
                href="tel:+77478703783"
                style={{ fontSize: "13px", color: "#4B556A", textDecoration: "none" }}
              >
                +7 747 870 37 83
              </a>
              <p style={{ fontSize: "12px", color: "#100A1E", lineHeight: 1.4 }}>
                Пн–Пт, 9:00–18:00 (GMT+6)
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "13px", color: "#100A1E" }}>
            © {year} LibraChat. Все права защищены.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link
              href="/privacy"
              style={{
                fontSize: "13px",
                color: "#100A1E",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: "13px",
                color: "#100A1E",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
