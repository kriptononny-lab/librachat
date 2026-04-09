import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="container-site flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
      <p
        className="text-8xl font-bold"
        style={{ color: "var(--color-brand-100)" }}
      >
        404
      </p>
      <h1
        className="mt-4 text-2xl font-bold"
        style={{ color: "var(--color-neutral-900)" }}
      >
        Страница не найдена
      </h1>
      <p
        className="mt-3 text-base max-w-md"
        style={{ color: "var(--color-neutral-500)" }}
      >
        Такой страницы не существует или она была перемещена.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </main>
  );
}
