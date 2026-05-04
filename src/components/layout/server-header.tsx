import { fetchHomePage } from "@/lib/strapi";
import { Header } from "./header";

export async function ServerHeader() {
  const page = await fetchHomePage();
  return (
    <Header
      loginText={page?.headerLoginText ?? "Войти"}
      loginUrl={page?.headerRegisterUrl ?? "https://ai.librachat.kz/auth"}
      registerText={page?.headerRegisterText ?? "Начать бесплатно"}
      registerUrl={page?.headerRegisterUrl ?? "https://ai.librachat.kz/auth"}
    />
  );
}
