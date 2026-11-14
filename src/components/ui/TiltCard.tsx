"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  scale?: number;
};

export function TiltCard({
  children,
  className,
  containerClassName,
  maxTilt = 9,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Calculate tilt angles based on mouse offset from center
      const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * maxTilt;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
      setGlare({
        x: xPercent,
        y: yPercent,
        opacity: 0.16,
      });
    },
    [maxTilt, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      style={{ perspective: 1000 }}
      className={cn("h-full", containerClassName)}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.12s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className={cn(
          "relative h-full rounded-2xl border border-line bg-card shadow-card transition-shadow duration-300 hover:border-royal-300 hover:shadow-lift will-change-transform",
          className
        )}
      >
        {/* Dynamic glare light reflection that tracks mouse position */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 360px at ${glare.x}% ${glare.y}%, rgba(59, 130, 246, 0.25), rgba(255, 255, 255, 0.15) 30%, transparent 75%)`,
          }}
        />

        {children}
      </div>
    </div>
  );
}

