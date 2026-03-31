"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MAILTO = "mailto:kontakt@vasadomena.sk";

export function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vision, setVision] = useState("");
  const [productCount, setProductCount] = useState("1");
  const [photosPerProduct, setPhotosPerProduct] = useState("1");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = [
      `Meno / značka: ${name}`,
      `Email: ${email}`,
      `Telefón: ${phone || "—"}`,
      `Počet produktov: ${productCount}`,
      `Počet fotiek na produkt: ${photosPerProduct}`,
      "",
      "Predstava / čo potrebujem:",
      vision || "—",
    ].join("\n");

    const subject = encodeURIComponent("Dopyt – AI produktové vizuály");
    const bodyEncoded = encodeURIComponent(body);
    window.location.href = `${MAILTO}?subject=${subject}&body=${bodyEncoded}`;
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-lg">
        <h2 className="text-center text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Chceš takto vyzerať aj svoje produkty?
        </h2>
        <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          Vyplň formulár — napíš predstavu, koľko produktov a koľko fotiek na produkt potrebuješ. Fotky môžeš priložiť v odpovednom e-maile.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Meno alebo názov značky</Label>
            <Input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ján Novák / Tvoja značka"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">E-mail</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vas@email.sk"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Telefón (voliteľné)</Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+421 …"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-products">Počet produktov</Label>
              <Input
                id="contact-products"
                name="productCount"
                type="number"
                min={1}
                required
                value={productCount}
                onChange={(e) => setProductCount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-photos">Fotiek na produkt</Label>
              <Input
                id="contact-photos"
                name="photosPerProduct"
                type="number"
                min={1}
                required
                value={photosPerProduct}
                onChange={(e) => setPhotosPerProduct(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-vision">Predstava, štýl, čo má vizuál vyjadriť</Label>
            <Textarea
              id="contact-vision"
              name="vision"
              rows={4}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Napr. minimalistický e-shop, luxusná kozmetika, teplé tóny…"
            />
          </div>

          <Button type="submit" className="w-full rounded-full" size="lg">
            Odoslať dopyt
          </Button>
        </form>
      </div>
    </section>
  );
}
