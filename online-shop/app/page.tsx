import Link from "next/link";
import { ArrowRight, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoriesByName, getProducts } from "@/db/queries";

const perks = [
  {
    icon: PackageCheck,
    title: "Livrare în 24h",
    text: "Comenzile plasate până la 15:00 pleacă în aceeași zi.",
  },
  {
    icon: RotateCcw,
    title: "Retur 30 de zile",
    text: "Te-ai răzgândit? Îl trimiți înapoi, fără explicații.",
  },
  {
    icon: ShieldCheck,
    title: "Garanție 2 ani",
    text: "Produse originale, cu garanție de la producător.",
  },
];

export default async function Home() {
  const [featured, categories] = await Promise.all([
    getProducts({ sort: "desc" }),
    getCategoriesByName(),
  ]);

  return (
    <>
      {/* ------------------------------- hero ------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="halo pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 animate-drift" />
        <div className="dotted-veil pointer-events-none absolute inset-0 opacity-40" />

        <div className="shell relative py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="animate-rise border-primary/30 text-primary"
            >
              Colecția de toamnă a ajuns
            </Badge>

            <h1
              className="animate-rise text-warm-gradient mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Tehnologie aleasă cu cap
            </h1>

            <p
              className="animate-rise mx-auto mt-5 max-w-xl text-base text-pretty text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Laptopuri, telefoane, monitoare și audio — selectate una câte una,
              fără umplutură. Prețuri corecte, livrare rapidă.
            </p>

            <div
              className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Button asChild size="lg" className="group">
                <Link href="/products">
                  Vezi produsele
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/despre">Despre noi</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ categorii ------------------------------ */}
      <section className="shell">
        <div className="stagger flex flex-wrap justify-center gap-2">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/products?cat=${category.id}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Badge
                variant="outline"
                className="h-8 px-4 text-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------ avantaje ------------------------------ */}
      <section className="shell mt-20">
        <div className="stagger grid gap-4 sm:grid-cols-3">
          {perks.map((perk, i) => (
            <div
              key={perk.title}
              style={{ "--i": i } as React.CSSProperties}
              className="lift rounded-xl bg-card p-5 ring-1 ring-foreground/10"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <perk.icon className="size-4.5" />
              </span>
              <h3 className="mt-4 font-heading text-sm font-medium">
                {perk.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{perk.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- recomandate ----------------------------- */}
      <section className="shell mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Recomandate
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Cele mai dorite produse din magazin.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="group shrink-0">
            <Link href="/products">
              Toate
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="stagger mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((product, i) => (
            <div key={product.id} style={{ "--i": i } as React.CSSProperties}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
