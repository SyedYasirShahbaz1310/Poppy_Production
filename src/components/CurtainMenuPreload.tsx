"use client";

import { useEffect } from "react";

const MENU_BG_WEBP = "/assets/images/menu_bg_extracted_aerial.webp";
const MENU_BG_JPG = "/assets/images/menu_bg_extracted_aerial.jpg";

export default function CurtainMenuPreload() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Pre-fetch & pre-decode directly into GPU cache upon initial page boot
    const imgWebp = new window.Image();
    imgWebp.src = MENU_BG_WEBP;
    if ("decode" in imgWebp) {
      imgWebp.decode().catch(() => {});
    }

    const imgJpg = new window.Image();
    imgJpg.src = MENU_BG_JPG;
    if ("decode" in imgJpg) {
      imgJpg.decode().catch(() => {});
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: -9999,
        left: -9999,
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <img
        src={MENU_BG_WEBP}
        alt=""
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
