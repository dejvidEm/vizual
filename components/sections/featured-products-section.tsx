"use client";

import { FadeImage } from "@/components/fade-image";
import { portfolioImages } from "@/lib/portfolio-images";

const features = [
  {
    title: "Profi svetlo a tieň",
    description: "Prémiový dojem",
    body: "Tvoj produkt bude vyzerať ako z reklamy veľkých značiek.",
    image: portfolioImages[5].src,
    imageAlt: portfolioImages[5].alt,
  },
  {
    title: "Neobmedzené pozadia",
    description: "Na mieru značke",
    body: "Minimal, luxury, lifestyle alebo vizuál šitý na mieru tvojej značke.",
    image: portfolioImages[6].src,
    imageAlt: portfolioImages[6].alt,
  },
  {
    title: "Bez drahého fotenia",
    description: "Mobil stačí",
    body: "Stačí mobilná fotka. Žiadne štúdio, fotograf ani produkčný tím.",
    image: portfolioImages[7].src,
    imageAlt: portfolioImages[7].alt,
  },
  {
    title: "Rýchle dodanie",
    description: "Pripravené na predaj",
    body: "Hotové vizuály pre e-shop, reklamu aj sociálne siete.",
    image: portfolioImages[8].src,
    imageAlt: portfolioImages[8].alt,
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="benefits" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          V čom sú tieto vizuály iné
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Tvoj produkt bude vyzerať ako z reklamy veľkých značiek — minimalistické, luxusné alebo lifestyle pozadie, úplne podľa teba.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-2 lg:grid-cols-4 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="group">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200">
              {feature.image ? (
                <FadeImage
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-200" />
              )}
            </div>

            {/* Content */}
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {feature.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        
      </div>
    </section>
  );
}
