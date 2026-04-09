import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium rounded-full",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07060e]",
    "disabled:pointer-events-none disabled:opacity-40",
    "cursor-pointer select-none whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[#6558e0] text-white",
          "hover:bg-[#5449cc]",
          "active:scale-[0.97]",
          "focus-visible:ring-[#6558e0]",
          "btn-primary-glow",
        ],
        secondary: [
          "bg-transparent text-[#f0eeff]",
          "border border-[rgba(255,255,255,0.14)]",
          "hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.22)]",
          "active:scale-[0.97]",
          "focus-visible:ring-white/20",
        ],
        ghost: [
          "text-[#a89ec0]",
          "hover:text-[#f0eeff] hover:bg-[rgba(255,255,255,0.05)]",
          "active:scale-[0.97]",
          "focus-visible:ring-white/20",
        ],
        outline: [
          "border border-[#6558e0] text-[#9b8ff8]",
          "hover:bg-[rgba(101,88,224,0.08)]",
          "active:scale-[0.97]",
          "focus-visible:ring-[#6558e0]",
        ],
        destructive: [
          "bg-red-600 text-white hover:bg-red-700",
          "active:scale-[0.97]",
        ],
        link: [
          "text-[#9b8ff8] underline-offset-4 hover:underline",
          "p-0 h-auto rounded-none",
        ],
      },
      size: {
        sm:   "text-xs",
        md:   "text-sm",
        lg:   "text-base",
        xl:   "text-base font-semibold",
        icon: "p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Spinner = () => (
  <svg className="animate-spin h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  sm:   { height: "34px",  paddingLeft: "16px",  paddingRight: "16px"  },
  md:   { height: "42px",  paddingLeft: "22px",  paddingRight: "22px"  },
  lg:   { height: "48px",  paddingLeft: "26px",  paddingRight: "26px"  },
  xl:   { height: "52px",  paddingLeft: "32px",  paddingRight: "32px"  },
  icon: { height: "42px",  width: "42px"                               },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = "md", asChild = false, loading = false,
     leftIcon, rightIcon, children, disabled, style, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);
    const sizeStyle = SIZE_STYLES[size ?? "md"] ?? {};
    const combinedStyle = { ...sizeStyle, ...style };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; style?: React.CSSProperties }>;
      return React.cloneElement(child, {
        ...child.props,
        className: cn(classes, child.props.className),
        style: { ...sizeStyle, ...child.props.style },
      });
    }

    return (
      <button ref={ref} className={classes} style={combinedStyle} disabled={disabled ?? loading} aria-busy={loading} {...props}>
        {loading ? <Spinner /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
