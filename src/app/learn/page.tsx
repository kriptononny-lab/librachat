import type { Metadata } from "next";
import { LearnClient } from "./learn-client";

export const metadata: Metadata = {
  title: "Обучение и кейсы",
  description: "Статьи, гайды и кейсы от команды LibraChat. Учитесь быстрее с реальными примерами.",
};

export default function LearnPage() {
  return <LearnClient />;
}
