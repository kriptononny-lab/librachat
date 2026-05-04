"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  ChevronDown,
  MessageSquare,
  FileText,
  PenLine,
  Code2,
  BookOpen,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from "@/lib/constants";

// Маппинг имён иконок → компоненты
const ICON_MAP: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={18} />,
  FileText: <FileText size={18} />,
  PenLine: <PenLine size={18} />,
  Code2: <Code2 size={18} />,
  BookOpen: <BookOpen size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  Lightbulb: <Lightbulb size={18} />,
};

// Хук определения мобильного экрана — mobile-first (по умолчанию мобильный)

// ===================================================
// Десктопный дропдаун
// ===================================================
function NavItem({ item }: { item: (typeof MAIN_NAV)[number] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  if (!item.children) {
    return (
      <Link
        href={item.href}
        style={{
          fontSize: "14px",
          fontWeight: 500,
          padding: "6px 4px",
          color: isActive ? "#F0EEFF" : "#9CA3B8",
          textDecoration: "none",
          transition: "color 150ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EEFF")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = isActive ? "#F0EEFF" : "#9CA3B8")
        }
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "14px",
          fontWeight: 500,
          padding: "6px 4px",
          color: isActive ? "#F0EEFF" : "#9CA3B8",
          background: "none",
          border: "none",
          cursor: "pointer",
          transition: "color 150ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EEFF")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = isActive ? "#F0EEFF" : "#9CA3B8")
        }
      >
        {item.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex" }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              paddingTop: "4px",
            }}
          >
            {/* Стрелка */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%) translateY(-6px) rotate(45deg)",
                width: "12px",
                height: "12px",
                background: "#0D0D1A",
                border: "1px solid rgba(255,255,255,0.1)",
                borderBottom: "none",
                borderRight: "none",
                zIndex: 1,
              }}
            />

            <div
              style={{
                minWidth: "260px",
                background: "#0D0D1A",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "8px",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(167,139,250,0.08)",
                position: "relative",
                zIndex: 2,
              }}
            >
              {item.children.map((child, i) => (
                <Link
                  key={child.href + i}
                  href={child.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(167,139,250,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {/* Иконка */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      flexShrink: 0,
                      background: "rgba(167,139,250,0.1)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#C4B5FD",
                    }}
                  >
                    {child.icon ? ICON_MAP[child.icon] : <MessageSquare size={18} />}
                  </div>

                  {/* Текст */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#F0EEFF",
                        lineHeight: 1.3,
                      }}
                    >
                      {child.label}
                    </span>
                    {child.description && (
                      <span
                        style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.4 }}
                      >
                        {child.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}

              {/* Нижняя полоска — акцент */}
              <div
                style={{
                  margin: "8px 12px 4px",
                  paddingTop: "8px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link
                  href={item.href}
                  style={{
                    fontSize: "12px",
                    color: "#A78BFA",
                    textDecoration: "none",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C4B5FD")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A78BFA")}
                >
                  Смотреть всё →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===================================================
// Мобильное меню — без анимации, максимально надёжно
// ===================================================
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      {/* Затемнение */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }}
      />

      {/* Панель */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(300px, 85vw)",
          display: "flex",
          flexDirection: "column",
          background: "#080810",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1,
          overflowY: "auto",
        }}
      >
        {/* Шапка */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        >
          <Logo size="sm" />
          <button
            onClick={onClose}
            style={{
              padding: "8px",
              borderRadius: "10px",
              color: "#9CA3B8",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Навигация */}
        <nav
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {MAIN_NAV.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: isActive ? "#fff" : "#9CA3B8",
                    background: isActive ? "rgba(167,139,250,0.15)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div
                    style={{
                      marginLeft: "12px",
                      paddingLeft: "12px",
                      borderLeft: "1px solid rgba(255,255,255,0.07)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        style={{
                          display: "block",
                          padding: "8px 10px",
                          fontSize: "13px",
                          color: "#6B7280",
                          textDecoration: "none",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <Link
            href="https://ai.librachat.kz/auth"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#F0EEFF",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            Войти
          </Link>
          <Link
            href="https://ai.librachat.kz/auth"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              background: "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)",
              boxShadow: "0 4px 16px rgba(167,139,250,0.4)",
            }}
          >
            Начать бесплатно
          </Link>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// Header (главный компонент)
// ===================================================
export interface HeaderProps {
  loginText?: string;
  loginUrl?: string;
  registerText?: string;
  registerUrl?: string;
}

export function Header({
  loginText = "Войти",
  loginUrl = "https://ai.librachat.kz/auth",
  registerText = "Начать бесплатно",
  registerUrl = "https://ai.librachat.kz/auth",
}: HeaderProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleClose = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll(); // проверяем сразу при монтировании
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          transition: "all 300ms ease",
          padding: scrolled ? "12px 0" : "16px 0",
          background: scrolled ? "rgba(8,8,16,0.92)" : "rgba(4,4,8,0.4)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div className="container-site">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <Logo />

            <nav
              className="desktop-nav"
              style={{
                alignItems: "center",
                gap: "24px",
                flex: 1,
                justifyContent: "center",
              }}
            >
              {MAIN_NAV.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>

            <div
              className="desktop-nav-right"
              style={{ alignItems: "center", gap: "8px", flexShrink: 0 }}
            >
              <Button variant="ghost" size="md" asChild>
                <Link href={loginUrl}>{loginText}</Link>
              </Button>
              <Button variant="primary" size="md" asChild>
                <Link href={registerUrl}>{registerText}</Link>
              </Button>
            </div>

            {/* CTA кнопка для мобиля — всегда видна */}
            <Link
              href={registerUrl}
              className="mobile-cta-btn"
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px",
                borderRadius: "999px",
                background: "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                flexShrink: 0,
                boxShadow: "0 2px 12px rgba(167,139,250,0.35)",
              }}
            >
              Начать
            </Link>

            <button
              className="mobile-burger-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                borderRadius: "10px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Menu size={22} color="#9CA3B8" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={handleClose} />
    </>
  );
}
