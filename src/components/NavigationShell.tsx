"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useModal } from "@/context/ModalContext";

export default function NavigationShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openMenu, openSearch, openShowreel } = useModal();

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-poppy selection:text-white">
      <Header
        onOpenMenu={openMenu}
        onOpenSearch={openSearch}
        onOpenShowreel={openShowreel}
      />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
