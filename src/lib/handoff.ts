/**
 * handoff.ts — передача черновика промпта из лендинга в приложение
 *
 * Три канала:
 *  1. localStorage  — черновик живёт между скроллами/секциями
 *  2. Cookie        — переживает редирект на поддомен ai.librachat.kz
 *  3. Query param   — fallback, если cookie заблокированы
 */

const LS_KEY = "librachat_pending_prompt";
const COOKIE_NAME = "lc_prompt";
const APP_AUTH_URL = "https://ai.librachat.kz/auth";
const COOKIE_DOMAIN = ".librachat.kz";

/** Сохранить черновик во все хранилища */
export function setPendingPrompt(text: string): void {
  if (typeof window === "undefined") return;

  // 1. localStorage
  try {
    if (text.trim()) {
      localStorage.setItem(LS_KEY, text);
    } else {
      localStorage.removeItem(LS_KEY);
    }
  } catch {
    // Safari Private / quota exceeded — игнорируем
  }

  // 2. Cookie на корневом домене — доступна ai.librachat.kz
  try {
    if (text.trim()) {
      const encoded = encodeURIComponent(text);
      // 30 минут хватит чтобы пройти auth
      const expires = new Date(Date.now() + 30 * 60 * 1000).toUTCString();
      document.cookie = `${COOKIE_NAME}=${encoded}; domain=${COOKIE_DOMAIN}; path=/; expires=${expires}; SameSite=Lax`;
    } else {
      // Удалить cookie
      document.cookie = `${COOKIE_NAME}=; domain=${COOKIE_DOMAIN}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  } catch {
    // Заблокировано — не страшно, есть query fallback
  }
}

/** Прочитать сохранённый черновик из localStorage */
export function getPendingPrompt(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(LS_KEY) ?? "";
  } catch {
    return "";
  }
}

/** Построить URL для перехода в приложение, опционально с промптом */
export function buildAuthUrl(text?: string): string {
  const prompt = text?.trim() ?? getPendingPrompt();
  if (!prompt) return APP_AUTH_URL;
  return `${APP_AUTH_URL}?prompt=${encodeURIComponent(prompt)}`;
}

/**
 * Основная функция для CTA-кнопок:
 * сохраняет черновик и делает переход
 */
export function navigateToApp(text?: string): void {
  if (typeof window === "undefined") return;
  const prompt = text?.trim() ?? getPendingPrompt();
  if (prompt) setPendingPrompt(prompt);
  window.location.href = buildAuthUrl(prompt);
}
