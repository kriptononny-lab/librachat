"use client";

import { HeroDraftProvider } from "@/context/hero-draft-context";
import { ReactNode } from "react";

export function PageDraftWrapper({ children }: { children: ReactNode }) {
  return <HeroDraftProvider>{children}</HeroDraftProvider>;
}
