import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ModalProvider } from "@/context/ModalContext";
import NavigationShell from "@/components/NavigationShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://poppyproductions.com"),
  title: "Poppy Productions | Award-Winning Film, Video & Digital Productions",
  description:
    "Poppy Productions is a premier creative production house working with visionary talent to bring unforgettable visual stories to life.",
  keywords: [
    "Poppy Productions",
    "Film Production",
    "Commercial Production",
    "Cinematography",
    "Brand Films",
    "Melbourne Film Production",
  ],
  authors: [{ name: "Poppy Productions" }],
  openGraph: {
    title: "Poppy Productions | Award-Winning Film & Video Productions",
    description:
      "A premier creative production house working with visionary talent to bring unforgettable visual stories to life.",
    url: "https://poppyproductions.com",
    siteName: "Poppy Productions",
    images: [
      {
        url: "/assets/posters/hero_poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Poppy Productions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0A0A0A] text-white antialiased selection:bg-poppy selection:text-white">
        <SmoothScroll>
          <ModalProvider>
            <NavigationShell>{children}</NavigationShell>
          </ModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
