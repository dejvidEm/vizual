"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { portfolioImages } from "@/lib/portfolio-images";

const IMG_BEFORE = portfolioImages[0];
const IMG_AFTER = portfolioImages[3];

export function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.preventDefault();
      updateFromClientX(e.clientX);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="before-after"
      className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="relative mx-auto max-w-5xl">
          <div
            ref={containerRef}
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Porovnanie fotky pred a po úprave"
            className="relative aspect-[4/3] w-full touch-none overflow-hidden rounded-2xl bg-neutral-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setPosition((p) => Math.max(0, p - 2));
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setPosition((p) => Math.min(100, p + 2));
              }
            }}
          >
            {/* Po — profi vizuál (spodná vrstva) */}
            <Image
              src={IMG_AFTER.src}
              alt={IMG_AFTER.alt}
              fill
              draggable={false}
              className="pointer-events-none object-cover [user-drag:none] [-webkit-user-drag:none]"
              sizes="(max-width: 1280px) 100vw, 1024px"
              priority
            />

            {/* Pred — základná fotka (vrchná vrstva, orezaná zľava) */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}
            >
              <Image
                src={IMG_BEFORE.src}
                alt={IMG_BEFORE.alt}
                fill
                draggable={false}
                className="object-cover [user-drag:none] [-webkit-user-drag:none]"
                sizes="(max-width: 1280px) 100vw, 1024px"
              />
            </div>

            {/* Transparentná vrstva: zachytí myš/touch, obrázky pod ňou nie sú „ťahateľné“ */}
            <div
              className="absolute inset-0 z-20 cursor-ew-resize touch-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onDragStart={(e) => e.preventDefault()}
            />

            {/* Deliaca čiara + úchyt (nad overlay, len vizuál) */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 z-30 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            />
            <div
              className="pointer-events-none absolute top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/95 text-foreground shadow-lg backdrop-blur-sm"
              style={{ left: `${position}%` }}
            >
              <GripVertical className="h-5 w-5 opacity-70" aria-hidden />
            </div>

            {/* Popisky */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-30 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Pred
            </div>
            <div className="pointer-events-none absolute right-4 bottom-4 z-30 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Po
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
