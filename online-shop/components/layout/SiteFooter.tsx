import Link from "next/link";
import { Flame } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const groups = [
  {
    title: "Magazin",
    links: [
      { href: "/products", label: "Toate produsele" },
      { href: "/products?sort=asc", label: "Cele mai ieftine" },
      { href: "/products?sort=desc", label: "Premium" },
    ],
  },
  {
    title: "Companie",
    links: [
      { href: "/despre", label: "Despre noi" },
      { href: "/cariere", label: "Cariere" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-card/40">
      <div className="shell py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Flame className="size-4" />
              </span>
              <span className="font-heading text-base font-semibold tracking-tight">
                Ember<span className="text-primary">Shop</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Tehnologie aleasă cu cap. Livrare rapidă în toată țara și retur în
              30 de zile, fără întrebări.
            </p>
          </div>

          <div className="flex gap-16">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-xs text-muted-foreground">
          Shop creat de Bogdan Bosoancă, 2024. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
