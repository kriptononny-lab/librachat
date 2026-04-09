"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="container-site flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
      <h1
        className="text-2xl font-bold"
        style={{ color: "var(--color-neutral-900)" }}
      >
        Что-то пошло не так
      </h1>
      <p
        className="mt-3 text-base max-w-md"
        style={{ color: "var(--color-neutral-500)" }}
      >
        Произошла непредвиденная ошибка. Попробуйте обновить страницу.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Попробовать снова</Button>
        <Button variant="secondary" onClick={() => (window.location.href = "/")}>
          На главную
        </Button>
      </div>
      {error.digest && (
        <p
          className="mt-6 text-xs font-mono"
          style={{ color: "var(--color-neutral-400)" }}
        >
          Error ID: {error.digest}
        </p>
      )}
    </main>
  );
}
