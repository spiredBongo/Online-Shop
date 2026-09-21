import Link from "next/link";
import { products } from "@/db/schemas";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatPrice, initials } from "@/lib/format";

type Product = typeof products.$inferSelect;

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <Badge variant="destructive">Stoc epuizat</Badge>;
  if (stock <= 5)
    return (
      <Badge variant="outline" className="border-primary/40 text-primary">
        Ultimele {stock}
      </Badge>
    );
  return (
    <Badge variant="secondary" className="text-muted-foreground">
      În stoc
    </Badge>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="lift group/product h-full gap-0 py-0">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Produsele din seed nu au imagini — desenăm un panou cu inițiale. */}
        <div className="relative flex h-40 items-center justify-center overflow-hidden bg-linear-to-br from-muted to-card">
          <div className="dotted-veil absolute inset-0 opacity-60" />
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="relative size-full object-cover transition-transform duration-500 group-hover/product:scale-105"
            />
          ) : (
            <span className="relative font-heading text-4xl font-semibold text-foreground/15 transition-transform duration-500 group-hover/product:scale-110">
              {initials(product.name)}
            </span>
          )}
          <div className="absolute top-3 right-3">
            <StockBadge stock={product.stock} />
          </div>
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-1 py-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-sm font-medium transition-colors group-hover/product:text-primary">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {product.description}
          </p>
        )}
        <p className="mt-2 font-heading text-lg font-semibold tabular-nums">
          {formatPrice(product.price)}
        </p>
      </CardContent>

      <CardFooter>
        <AddToCartButton product={product} className="w-full" />
      </CardFooter>
    </Card>
  );
}
