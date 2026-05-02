"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { setPendingPrompt } from "@/lib/handoff";

interface HeroDraftContextValue {
  draft: string;
  setDraft: (text: string) => void;
}

const HeroDraftContext = createContext<HeroDraftContextValue>({
  draft: "",
  setDraft: () => {},
});

export function HeroDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState("");

  const setDraft = useCallback((text: string) => {
    setDraftState(text);
    // Синхронизируем с localStorage / cookie при каждом изменении
    setPendingPrompt(text);
  }, []);

  return (
    <HeroDraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </HeroDraftContext.Provider>
  );
}

export function useHeroDraft() {
  return useContext(HeroDraftContext);
}
