"use client";

const steps = [
  { label: "Krok 1", value: "Formulár, fotky, rozsah" },
  { label: "Krok 2", value: "Vyber štýl" },
  { label: "Krok 3", value: "Hotové vizuály" },
  { label: "Krok 4", value: "Pripravené na predaj" },
];

export function EditorialSection() {
  return (
    <section id="process" className="bg-background">
      <div className="px-6 pb-12 pt-8 text-center md:px-12 md:pb-16 lg:px-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Ako to funguje
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          Jednoduchý proces od dopytu po vizuály, ktoré môžeš hneď použiť.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {step.label}
            </p>
            <p className="font-medium text-foreground text-lg md:text-xl">
              {step.value}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-6 py-10 text-center md:px-12 lg:px-20">
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          <span className="font-medium text-foreground">1.</span> Vyplň formulár, nahraj fotku alebo fotky, popíš predstavu (štýl, čo má značka vyjadriť). Vyber počet produktov a počet fotiek na produkt.{" "}
          <span className="font-medium text-foreground">2.</span> Vyber štýl — minimal, luxury, lifestyle, clean studio alebo vizuál na mieru.{" "}
          <span className="font-medium text-foreground">3.</span> Dostaneš hotové vizuály pripravené pre e-shop, kampane, marketplace aj sociálne siete.{" "}
          <span className="font-medium text-foreground">4.</span> Všetko je pripravené na predaj a ďalšie použitie v komunikácii značky.
        </p>
      </div>
    </section>
  );
}
