"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight, Send, BarChart2, FileText, Languages, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_PHRASES = [
  "Я закрою все лишние вкладки\nв твоём браузере.",
  "Я первый ИИ, который понимает\nроссийский бизнес.",
  "Я твой — без VPN.",
  "Курсовая без галлюцинаций.\nЯ твой надёжный друг.",
  "Я твой первый,\nс кем можно без промптов.",
  "Надёжный друг\nс бесконечным запасом знаний.",
];

const DEMO_PROMPTS = [
  "Проанализируй этот Excel-отчёт и дай рекомендации...",
  "Напиши контент-план на месяц для Instagram...",
  "Переведи и адаптируй под российский рынок...",
  "Сделай саммари из этой лекции за 30 секунд...",
  "Составь SEO-описание для карточки на Wildberries...",
];

const QUICK_ACTIONS = [
  { icon: BarChart2, label: "Анализ данных" },
  { icon: FileText,  label: "Написать текст" },
  { icon: Languages, label: "Перевести" },
  { icon: PenLine,   label: "Написать код" },
];

function AnimatedInput() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed]  = useState("");
  const [typing, setTyping]         = useState(true);
  const [charIdx, setCharIdx]       = useState(0);

  useEffect(() => {
    const current = DEMO_PROMPTS[phraseIdx];
    if (typing) {
      if (charIdx < current.length) {
        const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 36);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 16);
        return () => clearTimeout(t);
      } else {
        setPhraseIdx(i => (i + 1) % DEMO_PROMPTS.length);
        setTyping(true);
      }
    }
  }, [charIdx, typing, phraseIdx]);

  return (
    <div style={{
      background: "rgba(12,11,22,0.98)",
      border: "1px solid rgba(101,88,224,0.35)",
      borderRadius: "20px",
      boxShadow: "0 0 0 1px rgba(101,88,224,0.08), 0 24px 64px rgba(0,0,0,0.55), 0 0 100px rgba(101,88,224,0.07)",
      overflow: "hidden",
    }}>
      {/* Теги */}
      <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"14px 20px 12px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["LibraChat","Pro","Без VPN","Помнит всё"].map((t,i) => (
          <span key={t} style={{ padding:"3px 10px", borderRadius:"999px", fontSize:"12px", fontWeight:500,
            ...(i===0
              ? { background:"rgba(101,88,224,0.2)", color:"#a89ec0", border:"1px solid rgba(101,88,224,0.35)" }
              : { color:"#3d3858", border:"1px solid rgba(255,255,255,0.06)" }) }}>
            {t}
          </span>
        ))}
      </div>

      {/* Ввод */}
      <div style={{ padding:"20px 20px 16px", display:"flex", alignItems:"flex-start", gap:"12px", minHeight:"72px" }}>
        <div style={{ flex:1, fontSize:"16px", lineHeight:"1.6", color:"#a89ec0", minHeight:"26px" }}>
          {displayed}
          <span style={{ display:"inline-block", width:"2px", height:"18px", background:"#6558e0", marginLeft:"2px", verticalAlign:"middle", animation:"typing-cursor 0.9s step-end infinite" }} />
        </div>
        <button style={{ width:"42px", height:"42px", borderRadius:"12px", background:"#6558e0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:"none", cursor:"pointer", boxShadow:"0 4px 16px rgba(101,88,224,0.45)" }}>
          <Send size={16} color="white" />
        </button>
      </div>

      {/* Быстрые действия */}
      <div style={{ padding:"0 20px 18px", display:"flex", flexWrap:"wrap", gap:"8px" }}>
        {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
          <span key={label} style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"7px 14px", borderRadius:"999px", fontSize:"13px", border:"1px solid rgba(255,255,255,0.08)", color:"#a89ec0", cursor:"pointer" }}>
            <Icon size={14} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function RotatingHeadline() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_PHRASES.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position:"relative", overflow:"hidden", minHeight:"2.5em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity:0, y:28 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-22 }}
          transition={{ duration:0.42, ease:[0.4,0,0.2,1] }}
          style={{
            display:"block",
            background:"linear-gradient(135deg, #9b8ff8 0%, #6558e0 100%)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            whiteSpace:"pre-line",
          }}
        >
          {HERO_PHRASES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function HeroSection() {
  return (
    <section style={{ minHeight:"100dvh", display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:"88px", paddingBottom:"60px" }}>
      <div className="container-site">
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", maxWidth:"760px", margin:"0 auto" }}>

          {/* Бейдж */}
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} style={{ marginBottom:"32px" }}>
            <div className="section-badge">
              <span className="badge-dot" />
              ИИ-АССИСТЕНТ НОВОГО ПОКОЛЕНИЯ С РОДНЫМ МЕНТАЛИТЕТОМ
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.55, delay:0.08 }}
            style={{ fontSize:"clamp(38px, 5.5vw, 70px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1.1, color:"#f0eeff", marginBottom:"18px" }}
          >
            Привет, я LibraChat.
          </motion.h1>

          {/* Ротируемая фраза */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.4, delay:0.18 }}
            style={{ fontSize:"clamp(26px, 4vw, 50px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:"24px", width:"100%" }}
          >
            <RotatingHeadline />
          </motion.div>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.28 }}
            style={{ fontSize:"17px", lineHeight:1.75, color:"#a89ec0", maxWidth:"520px", marginBottom:"48px" }}
          >
            Используй меня даже тогда, когда нужно обработать большой объём данных или сделать честный документ без галлюцинаций и выдумок.
          </motion.p>

          {/* ── ВИДЖЕТ — ГЛАВНЫЙ АКЦЕНТ ── */}
          <motion.div
            initial={{ opacity:0, y:28 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.65, delay:0.36 }}
            style={{ width:"100%", maxWidth:"700px", marginBottom:"32px" }}
            className="hero-widget-aura"
          >
            <AnimatedInput />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.52 }}
            style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"12px", marginBottom:"56px", width:"100%", padding:"0 16px" }}
          >
            <Button size="xl" asChild>
              <Link href="https://librachat.kz/auth" style={{ minWidth:"200px", maxWidth:"320px", flex:"1 1 auto" }}>Начать бесплатно</Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link href="/business" className="inline-flex items-center gap-2" style={{ minWidth:"180px", maxWidth:"280px", flex:"1 1 auto" }}>
                Для бизнеса <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.5, delay:0.68 }}
            style={{ width:"100%", maxWidth:"700px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:"1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { value:"Без VPN", label:"начать пользоваться легко" },
              { value:"1 480",   label:"тестировщиков подтвердили преимущества" },
              { value:"30 сек",  label:"среднее время регистрации" },
            ].map((s, i) => (
              <div key={s.label} style={{ display:"flex", flexDirection:"column", gap:"6px", padding:"24px 12px", textAlign:"center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <span style={{ fontSize:"22px", fontWeight:700, color:"#c9920a" }}>{s.value}</span>
                <span style={{ fontSize:"12px", lineHeight:1.45, color:"#a89ec0" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
