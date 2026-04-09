"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, ChevronDown,
  MessageSquare, FileText, PenLine, Code2,
  BookOpen, TrendingUp, Lightbulb,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAIN_NAV } from "@/lib/constants";

// Маппинг имён иконок → компоненты
const ICON_MAP: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={18} />,
  FileText:      <FileText size={18} />,
  PenLine:       <PenLine size={18} />,
  Code2:         <Code2 size={18} />,
  BookOpen:      <BookOpen size={18} />,
  TrendingUp:    <TrendingUp size={18} />,
  Lightbulb:     <Lightbulb size={18} />,
};

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
          fontSize: "14px", fontWeight: 500, padding: "6px 4px",
          color: isActive ? "#f0eeff" : "#a89ec0",
          textDecoration: "none", transition: "color 150ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#f0eeff")}
        onMouseLeave={e => (e.currentTarget.style.color = isActive ? "#f0eeff" : "#a89ec0")}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div style={{ position: "relative" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        fontSize: "14px", fontWeight: 500, padding: "6px 4px",
        color: isActive ? "#f0eeff" : "#a89ec0",
        background: "none", border: "none", cursor: "pointer",
        transition: "color 150ms ease",
      }}
        onMouseEnter={e => (e.currentTarget.style.color = "#f0eeff")}
        onMouseLeave={e => (e.currentTarget.style.color = isActive ? "#f0eeff" : "#a89ec0")}
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
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
              position: "absolute", top: "calc(100% + 10px)",
              left: "50%", transform: "translateX(-50%)",
              zIndex: 50, paddingTop: "4px",
            }}
          >
            {/* Стрелка */}
            <div style={{
              position: "absolute", top: "0", left: "50%",
              transform: "translateX(-50%) translateY(-6px) rotate(45deg)",
              width: "12px", height: "12px",
              background: "#1e1d2e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderBottom: "none", borderRight: "none",
              zIndex: 1,
            }} />

            <div style={{
              minWidth: "260px",
              background: "#1e1d2e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "8px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(101,88,224,0.08)",
              position: "relative", zIndex: 2,
            }}>
              {item.children.map((child, i) => (
                <Link
                  key={child.href + i}
                  href={child.href}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "10px", textDecoration: "none", transition: "background 150ms ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(101,88,224,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Иконка */}
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    background: "rgba(101,88,224,0.1)", border: "1px solid rgba(101,88,224,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#9b8ff8",
                  }}>
                    {child.icon ? ICON_MAP[child.icon] : <MessageSquare size={18} />}
                  </div>

                  {/* Текст */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#f0eeff", lineHeight: 1.3 }}>
                      {child.label}
                    </span>
                    {child.description && (
                      <span style={{ fontSize: "12px", color: "#6b6480", lineHeight: 1.4 }}>
                        {child.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}

              {/* Нижняя полоска — акцент */}
              <div style={{
                margin: "8px 12px 4px",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Link href={item.href} style={{
                  fontSize: "12px", color: "#6558e0", textDecoration: "none", fontWeight: 500,
                  display: "flex", alignItems: "center", gap: "4px",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#9b8ff8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6558e0")}
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
// Мобильное меню
// ===================================================
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => { onClose(); }, [pathname, onClose]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Затемнение */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position:"fixed", inset:0, zIndex:65, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}
          />

          {/* Панель */}
          <motion.div
            key="panel"
            initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
            transition={{ type:"spring", damping:28, stiffness:300 }}
            style={{
              position:"fixed", top:0, right:0, bottom:0, zIndex:70,
              width:"280px", display:"flex", flexDirection:"column",
              background:"#13121f", borderLeft:"1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Шапка */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <Logo size="sm" />
              <button onClick={onClose} aria-label="Закрыть меню"
                style={{ padding:"8px", borderRadius:"10px", color:"#a89ec0", background:"transparent", border:"none", cursor:"pointer" }}>
                <X size={20} />
              </button>
            </div>

            {/* Навигация */}
            <nav style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:"2px" }}>
              {MAIN_NAV.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <div key={item.href}>
                    <Link href={item.href} style={{
                      display:"flex", alignItems:"center", padding:"10px 12px",
                      borderRadius:"10px", fontSize:"14px", fontWeight:500, textDecoration:"none",
                      color: isActive ? "#fff" : "#a89ec0",
                      background: isActive ? "rgba(101,88,224,0.12)" : "transparent",
                      transition:"color 150ms, background 150ms",
                    }}>
                      {item.label}
                    </Link>
                    {item.children && (
                      <div style={{ marginLeft:"12px", paddingLeft:"12px", marginTop:"2px", borderLeft:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", gap:"0" }}>
                        {item.children.map(child => (
                          <Link key={child.href + child.label} href={child.href} style={{
                            display:"block", padding:"7px 8px", fontSize:"13px",
                            color:"#4a4560", textDecoration:"none", transition:"color 150ms",
                          }}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA внизу */}
            <div style={{ padding:"16px", borderTop:"1px solid rgba(255,255,255,0.08)", display:"flex", flexDirection:"column", gap:"8px" }}>
              <Link href="https://librachat.kz/auth" style={{
                display:"flex", alignItems:"center", justifyContent:"center",
                padding:"12px", borderRadius:"999px", fontSize:"14px", fontWeight:600,
                color:"#f2f0ff", textDecoration:"none",
                border:"1px solid rgba(255,255,255,0.16)", background:"transparent",
              }}>Войти</Link>
              <Link href="https://librachat.kz/auth" style={{
                display:"flex", alignItems:"center", justifyContent:"center",
                padding:"12px", borderRadius:"999px", fontSize:"14px", fontWeight:600,
                color:"#fff", textDecoration:"none",
                background:"#6558e0", boxShadow:"0 4px 16px rgba(101,88,224,0.4)",
              }}>Начать бесплатно</Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ===================================================
// Header (главный компонент)
// ===================================================
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
          transition: "all 300ms ease",
          padding: scrolled ? "12px 0" : "16px 0",
          background: scrolled ? "rgba(14,14,19,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div className="container-site">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
            {/* Логотип */}
            <Logo />

            {/* Десктопная навигация */}
            <nav className="desktop-nav" style={{ alignItems: "center", gap: "24px", flex: 1, justifyContent: "center" }}>
              {MAIN_NAV.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>

            {/* Правая часть */}
            <div className="desktop-nav-right" style={{ alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <Button variant="ghost" size="md" asChild>
                <Link href="https://librachat.kz/auth">Войти</Link>
              </Button>
              <Button variant="primary" size="md" asChild>
                <Link href="https://librachat.kz/auth">Начать бесплатно</Link>
              </Button>
            </div>

            {/* Бургер (мобильный) — скрыт на десктопе */}
            <button
              onClick={() => setMenuOpen(true)}
              className="mobile-burger-btn"
              aria-label="Открыть меню"
              style={{ position: "relative", zIndex: 100, pointerEvents: "auto" }}
            >
              <Menu size={22} color="#a89ec0" />
            </button>
          </div>
        </div>
      </header>
      {/* Мобильное меню */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
