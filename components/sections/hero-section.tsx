"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroMainProductImage, portfolioImages } from "@/lib/portfolio-images";

/* Hero stred: upscaled LV Fleur du Désert; boky: portfólio */
const HERO_CENTER = heroMainProductImage;
const sideImages = [
  { src: portfolioImages[0].src, alt: portfolioImages[0].alt, position: "left" as const, span: 1 },
  { src: portfolioImages[1].src, alt: portfolioImages[1].alt, position: "left" as const, span: 1 },
  { src: portfolioImages[2].src, alt: portfolioImages[2].alt, position: "right" as const, span: 1 },
  { src: portfolioImages[12].src, alt: portfolioImages[12].alt, position: "right" as const, span: 1 },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Text + CTA fade out early (0 → ~20 % scrollu)
  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  // Tmavý overlay pri štarte; počas scrolu pomaly mizne (celý rozsah 0–1)
  const darkOverlayFade = Math.max(0, 1 - scrollProgress);
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations
  const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
  const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
  const sideWidth = imageProgress * 22; // 0% to 22%
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24; // 0px to 24px
  const gap = imageProgress * 16; // 0px to 16px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <div className="absolute inset-0 bg-neutral-300" />
              <Image
                src={HERO_CENTER.src}
                alt={HERO_CENTER.alt}
                fill
                className="object-cover"
                priority
              />
              
              {/* Tmavý overlay — silnejší pri štarte, pri scrolle pomaly mizne */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ opacity: darkOverlayFade }}
                aria-hidden
              >
                <div className="absolute inset-0 bg-black/58 md:bg-black/52" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.97] via-black/[0.55] to-black/[0.12] md:from-black/[0.9] md:via-black/[0.45] md:to-black/[0.08]" />
              </div>

              {/* Nadpis + CTA — miznú skôr ako overlay */}
              <div
                className="absolute inset-0 flex items-end justify-center overflow-hidden pb-8 md:items-center md:pb-0"
                style={{ opacity: textOpacity }}
              >
                <div className="relative z-10 w-full max-w-4xl px-5 text-center md:max-w-5xl md:px-10 lg:max-w-6xl xl:max-w-7xl">
                  <h1 className="text-balance text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-[3.5rem] xl:leading-[1.08]">
                    Premeň obyčajnú fotku produktu na profi vizuál, ktorý predáva
                  </h1>
                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Link
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/90"
                    >
                      Získať ukážku zdarma
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Tagline Section */}
      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Profi vzhľad bez štúdia.
          <br />
          Úspora času aj nákladov.
        </p>
      </div>
    </section>
  );
}
