import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Smartphone, Monitor, Chrome, Check, Download, Star, Zap, Shield, WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Скачать LibraChat",
  description: "Скачайте LibraChat для iOS, Android или используйте в браузере. Работает без VPN.",
};

const PLATFORMS = [
  {
    icon: Smartphone,
    title: "iOS",
    subtitle: "iPhone и iPad",
    badge: "App Store",
    version: "iOS 15.0+",
    href: "https://librachat.kz/auth",
    primary: true,
  },
  {
    icon: Smartphone,
    title: "Android",
    subtitle: "Смартфоны и планшеты",
    badge: "Google Play",
    version: "Android 8.0+",
    href: "https://librachat.kz/auth",
    primary: false,
  },
  {
    icon: Monitor,
    title: "Веб-версия",
    subtitle: "Любой браузер",
    badge: "Открыть",
    version: "Без установки",
    href: "https://librachat.kz/auth",
    primary: false,
  },
  {
    icon: Chrome,
    title: "Расширение",
    subtitle: "Chrome / Edge",
    badge: "Скоро",
    version: "В разработке",
    href: "#",
    primary: false,
    soon: true,
  },
];

const FEATURES = [
  { icon: WifiOff, text: "Работает без VPN" },
  { icon: Zap,     text: "Синхронизация между устройствами" },
  { icon: Shield,  text: "Данные зашифрованы" },
  { icon: Star,    text: "Одна подписка — все платформы" },
];

export default function DownloadPage() {
  return (
    <div style={{ display:"flex", minHeight:"100dvh", flexDirection:"column", background:"#07060e" }}>
      <Header />
      <main style={{ flex:1, paddingTop:"68px" }}>

        {/* Hero */}
        <section style={{ padding:"80px 0 72px", textAlign:"center" }}>
          <div className="container-site" style={{ maxWidth:"640px" }}>
            <div className="section-badge" style={{ marginBottom:"20px" }}>ПРИЛОЖЕНИЯ</div>
            <h1 style={{ fontSize:"clamp(32px, 5vw, 60px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.1, color:"#f2f0ff", marginBottom:"20px" }}>
              LibraChat везде, где ты работаешь
            </h1>
            <p style={{ fontSize:"18px", color:"#a89ec0", lineHeight:1.7, marginBottom:"32px" }}>
              Скачай на телефон, открой в браузере — всё синхронизируется. Без VPN, без настроек.
            </p>
            <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"16px" }}>
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} style={{ display:"flex", alignItems:"center", gap:"7px", fontSize:"14px", color:"#a89ec0" }}>
                  <Icon size={15} color="#9b8ff8" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Платформы */}
        <section style={{ padding:"0 0 120px" }}>
          <div className="container-site">
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"20px" }}>
              {PLATFORMS.map(({ icon: Icon, title, subtitle, badge, version, href, primary, soon }) => (
                <div key={title} style={{
                  display:"flex", flexDirection:"column", gap:"20px", padding:"32px 28px",
                  borderRadius:"20px",
                  background: primary ? "rgba(101,88,224,0.08)" : "rgba(14,13,25,0.92)",
                  border: primary ? "1px solid rgba(101,88,224,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  opacity: soon ? 0.6 : 1,
                }}>
                  <div style={{ width:"52px", height:"52px", borderRadius:"16px", background:"rgba(101,88,224,0.12)", border:"1px solid rgba(101,88,224,0.22)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon size={24} color="#9b8ff8" />
                  </div>
                  <div>
                    <h3 style={{ fontSize:"20px", fontWeight:800, color:"#f2f0ff", marginBottom:"4px" }}>{title}</h3>
                    <p style={{ fontSize:"14px", color:"#a89ec0" }}>{subtitle}</p>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"13px", color:"#a89ec0" }}>
                      <Check size={13} color="#9b8ff8" />
                      {version}
                    </div>
                  </div>
                  <Link href={href}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                      padding:"13px 20px", borderRadius:"999px",
                      background: primary ? "#6558e0" : "transparent",
                      color: primary ? "#fff" : "#f2f0ff",
                      fontSize:"15px", fontWeight:600, textDecoration:"none",
                      border: primary ? "none" : "1px solid rgba(255,255,255,0.16)",
                      boxShadow: primary ? "0 4px 20px rgba(101,88,224,0.4)" : "none",
                      cursor: soon ? "not-allowed" : "pointer",
                      pointerEvents: soon ? "none" : "auto",
                    }}>
                    {soon ? "Скоро" : <><Download size={15} /> {badge}</>}
                  </Link>
                </div>
              ))}
            </div>

            {/* QR / дополнительно */}
            <div style={{ marginTop:"60px", padding:"40px", borderRadius:"24px", background:"rgba(14,13,25,0.88)", border:"1px solid rgba(255,255,255,0.07)", textAlign:"center" }}>
              <p style={{ fontSize:"16px", fontWeight:600, color:"#f2f0ff", marginBottom:"8px" }}>
                Уже есть аккаунт?
              </p>
              <p style={{ fontSize:"14px", color:"#a89ec0", marginBottom:"20px" }}>
                Войдите на любом устройстве — все чаты и настройки синхронизируются автоматически
              </p>
              <Link href="https://librachat.kz/auth"
                style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"13px 28px", borderRadius:"999px", background:"#6558e0", color:"#fff", fontSize:"15px", fontWeight:600, textDecoration:"none", boxShadow:"0 4px 20px rgba(101,88,224,0.4)" }}>
                <Zap size={16} />
                Войти в аккаунт
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
