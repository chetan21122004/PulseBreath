import { Header } from "@/components/pulse-landing/Header";
import { Footer } from "@/components/pulse-landing/Footer";
import { MobileBottomNav } from "@/components/pulse-landing/MobileBottomNav";
import { WhatsAppFab } from "@/components/pulse-landing/WhatsAppFab";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header />
      <main className="max-lg:pb-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom,0px))]">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppFab />
    </div>
  );
}
