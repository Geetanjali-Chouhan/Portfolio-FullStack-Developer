"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-100 h-1 bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-linear-to-r from-[#142B50] via-[#C5A46D] to-[#DFCA9F] transition-all duration-100 shadow-[0_0_10px_#C5A46D]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
