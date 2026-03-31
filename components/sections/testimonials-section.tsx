"use client";

import Image from "next/image";
import { portfolioImages } from "@/lib/portfolio-images";

const BANNER = portfolioImages[7];

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Vizuály, ktoré robia lepší prvý dojem. Lepšie produktové fotky zvyšujú dôveru, hodnotu produktu aj celkový dojem zo značky. Presne to rozhoduje o tom, či zákazník pokračuje ďalej alebo odíde.
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
        <Image
          src={BANNER.src}
          alt={BANNER.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
