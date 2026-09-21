import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getCategoryById, getProductBySlug } from "@/db/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatPrice, initials } from "@/lib/format";

type Props = { params: Promise<{ productPage: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productPage } = await params;
  const product = await getProductBySlug(productPage);

  if (!product) return { title: "Produs inexistent" };

  return {
    title: product.name,
    description: product.description ?? undefined,
  };
}

const guarantees = [
  { icon: Truck, label: "Livrare în 24h" },
  { icon: RotateCcw, label: "Retur în 30 de zile" },
  { icon: ShieldCheck, label: "Garanție 2 ani" },
];

export default async function ProductDetailPage({ params }: Props) {
  const { productPage } = await params;
  const product = await getProductBySlug(productPage);

  if (!product) notFound();

  const category = product.categoryId
    ? await getCategoryById(product.categoryId)
    : null;

  const inStock = product.stock > 0;

  return (
    <div className="shell py-12">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="group -ml-2 text-muted-foreground"
      >
        <Link href="/products">
          <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Înapoi la produse
        </Link>
      </Button>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* ----------------------------- vizual ----------------------------- */}
        <div className="animate-appear relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-muted to-card ring-1 ring-foreground/10">
          <div className="halo pointer-events-none absolute inset-0 animate-drift opacity-50" />
          <div className="dotted-veil absolute inset-0 opacity-50" />
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="relative size-full object-cover"
            />
          ) : (
            <span className="relative font-heading text-7xl font-semibold text-foreground/15">
              {initials(product.name)}
            </span>
          )}
        </div>

        {/* ------------------------------ detalii ------------------------------ */}
        <div className="animate-slide-right flex flex-col">
          {category && (
            <Link href={`/products?cat=${category.id}`}>
              <Badge
                variant="outline"
                className="transition-colors hover:border-primary/40 hover:text-primary"
              >
                {category.name}
              </Badge>
            </Link>
          )}

          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-3 text-pretty text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <span className="font-heading text-4xl font-semibold tabular-nums text-primary">
              {formatPrice(product.price)}
            </span>
            {inStock ? (
              <Badge variant="secondary" className="gap-1">
                <PackageCheck />
                {product.stock} în stoc
              </Badge>
            ) : (
              <Badge variant="destructive">Stoc epuizat</Badge>
            )}
          </div>

          <div className="mt-8">
            <AddToCartButton product={product} size="lg" className="w-full sm:w-auto sm:px-8" />
          </div>

          <Separator className="my-8" />

          <ul className="grid gap-3 sm:grid-cols-3">
            {guarantees.map((guarantee) => (
              <li
                key={guarantee.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <guarantee.icon className="size-4 shrink-0 text-primary" />
                {guarantee.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
