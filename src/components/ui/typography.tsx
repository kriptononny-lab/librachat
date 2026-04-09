import * as React from "react";
import { cn } from "@/lib/utils";

// ===================================================
// Heading
// ===================================================
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  level?: 1 | 2 | 3 | 4;
}

const headingStyles: Record<number, string> = {
  1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]",
  2: "text-3xl md:text-4xl font-bold tracking-tight leading-tight",
  3: "text-2xl md:text-3xl font-semibold tracking-tight leading-snug",
  4: "text-xl md:text-2xl font-semibold leading-snug",
};

export function Heading({
  as,
  level = 1,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? (`h${level}` as HeadingLevel);
  return (
    <Tag
      className={cn(
        headingStyles[level] ?? headingStyles[1],
        "text-[var(--color-neutral-900)]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ===================================================
// Text
// ===================================================
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  muted?: boolean;
  balance?: boolean;
}

const textSizeMap = {
  xs:  "text-xs",
  sm:  "text-sm",
  md:  "text-base",
  lg:  "text-lg",
  xl:  "text-xl",
};

export function Text({
  as: Tag = "p",
  size = "md",
  muted = false,
  balance = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        textSizeMap[size],
        "leading-relaxed",
        muted
          ? "text-[var(--color-neutral-500)]"
          : "text-[var(--color-neutral-700)]",
        balance && "text-balance",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ===================================================
// Label / Caption
// ===================================================
interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  uppercase?: boolean;
}

export function Label({ uppercase = true, className, children, ...props }: LabelProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold tracking-widest",
        "text-[var(--color-brand-500)]",
        uppercase && "uppercase",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ===================================================
// Gradient Text
// ===================================================
export function GradientText({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-300)]",
        "bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
