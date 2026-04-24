import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col" style={{ background: "#040408" }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
