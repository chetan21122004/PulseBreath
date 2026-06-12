import { Header } from "@/components/pulse-landing/Header";
import { Footer } from "@/components/pulse-landing/Footer";
import { WhatsAppFab } from "@/components/pulse-landing/WhatsAppFab";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
