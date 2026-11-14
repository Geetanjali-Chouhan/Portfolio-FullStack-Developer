"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full border border-[#C5A46D] bg-[#0B1428] text-[#DFCA9F] shadow-gold transition-all duration-300 hover:scale-110 hover:bg-[#142B50] hover:text-white"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
