"use client";

const audiences = [
  {
    title: "E-shopy a online predaj",
    forWho:
      "Majitelia e-shopov, predajcovia na marketplace aj dropshipping.",
    solves:
      "Slabá fotka zabíja prvý dojem a konverziu. Pomôžem ti mať produktové vizuály, ktoré vyzerajú dôveryhodne a predávajú — bez drahého štúdia.",
  },
  {
    title: "Značky a brandy",
    forWho: "Menšie a stredné značky, ktoré chcú rásť a pôsobiť prémiovejšie.",
    solves:
      "Nekonzistentný alebo „lacný“ vizuál oslabuje dôveru. Vizuály zladené so značkou a produktom posilňujú image a hodnotu ponuky.",
  },
  {
    title: "Startupy a výrobcovia",
    forWho: "Výrobcovia, startupy a tí, čo majú produkt, ale nie rozpočet na veľké fotenie.",
    solves:
      "Chýba čas, peniaze alebo tím na štúdio. Z obyčajnej fotky spravím profi zábery, ktoré ti otvoria dvere k prvým a ďalším predajom.",
  },
];

export function CollectionSection() {
  return (
    <section id="accessories" className="bg-background">
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Pre koho je táto služba
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Od e-shopov po výrobcov — ak predávaš produkt online, vizuál je tvoja najsilnejšia karta.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-border pt-14 md:mt-16 md:grid-cols-3 md:gap-10 md:pt-16 lg:gap-14">
          {audiences.map((item) => (
            <div key={item.title} className="flex flex-col">
              <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {item.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                Pre koho
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {item.forWho}
              </p>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                Aký problém rieši
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.solves}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
