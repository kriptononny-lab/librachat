"use client";

import { useState, useEffect } from "react";

interface ScrollState {
  scrollY: number;
  scrollDirection: "up" | "down" | null;
  isAtTop: boolean;
  isAtBottom: boolean;
}

/**
 * Хук для отслеживания скролла страницы
 * Используется для шапки (прячется/появляется при скролле)
 */
export function useScroll(threshold = 0): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      const isAtTop = scrollY <= threshold;
      const isAtBottom =
        scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;

      setState({ scrollY, scrollDirection: direction, isAtTop, isAtBottom });
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return state;
}
