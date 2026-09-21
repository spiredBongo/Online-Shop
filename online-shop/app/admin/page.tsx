import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CircleAlert,
  Package,
  Tags,
} from "lucide-react";
import { getCategoriesByName, getProducts } from "@/db/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

export default async function AdminDashboard() {
  const [allProducts, allCategories] = await Promise.all([
    getProducts(),
    getCategoriesByName(),
  ]);

  const inventoryValue = allProducts.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const lowStock = allProducts.filter((product) => product.stock <= 5);

  const stats = [
    { icon: Package, label: "Produse", value: String(allProducts.length) },
    { icon: Tags, label: "Categorii", value: String(allCategories.length) },
    { icon: Boxes, label: "Valoare stoc", value: formatPrice(inventoryValue) },
    {
      icon: CircleAlert,
      label: "Stoc redus",
      value: String(lowStock.length),
      alert: lowStock.length > 0,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            style={{ "--i": i } as React.CSSProperties}
            className="lift"
          >
            <CardContent className="flex items-center gap-3">
              <span
                className={
                  stat.alert
                    ? "flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive"
                    : "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                }
              >
                <stat.icon className="size-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="truncate font-heading text-lg font-semibold tabular-nums">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {lowStock.length > 0 && (
        <Card className="animate-rise">
          <CardContent>
            <h2 className="font-heading text-sm font-medium">
              Produse care trebuie reaprovizionate
            </h2>
            <ul className="mt-3 divide-y">
              {lowStock.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="truncate">{product.name}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {product.stock} buc.
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Button asChild className="group">
        <Link href="/admin/products">
          Gestionează produsele
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}
