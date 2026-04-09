import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "full";
}

const sizeMap = {
  sm:   "max-w-3xl",
  md:   "max-w-5xl",
  lg:   "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  as: Tag = "div",
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "container-site",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
