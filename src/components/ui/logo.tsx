import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizes = {
  sm: { icon: 28, textSize: "15px" },
  md: { icon: 34, textSize: "18px" },
  lg: { icon: 44, textSize: "24px" },
};

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const s = sizes[size];
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none",
        className
      )}
      aria-label="LibraChat — на главную"
    >
      <Image
        src="/logo.png"
        alt="LibraChat"
        width={s.icon}
        height={s.icon}
        style={{ objectFit: "contain", flexShrink: 0 }}
        priority
      />
      <span
        style={{
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "#fff",
          fontSize: s.textSize,
          transition: "opacity 150ms ease",
        }}
        className="group-hover:opacity-90"
      >
        Libra<span className="text-gradient">Chat</span>
      </span>
    </Link>
  );
}
