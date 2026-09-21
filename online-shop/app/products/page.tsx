import type { Metadata } from "next";
import { PackageOpen } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FilterButtons from "./FilterButtons";
import { Separator } from "@/components/ui/separator";
import { getCategoriesByName, getProducts } from "@/db/queries";

export const metadata: Metadata = {
  title: "Produse",
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const { cat, sort } = await searchParams;

  const [allProducts, allCategories] = await Promise.all([
    getProducts({ categoryId: cat ? Number(cat) : undefined, sort }),
    getCategoriesByName(),
  ]);

  const activeCategory = allCategories.find((c) => String(c.id) === cat);

  return (
    <div className="shell py-12">
      <header className="animate-rise">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {activeCategory ? activeCategory.name : "Toate produsele"}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {allProducts.length}{" "}
          {allProducts.length === 1 ? "produs disponibil" : "produse disponibile"}
        </p>
      </header>

      <Separator className="my-6" />

      <FilterButtons categories={allCategories} />

      {allProducts.length === 0 ? (
        <div className="animate-appear mt-16 flex flex-col items-center gap-3 text-center">
          <div className="rounded-full bg-muted p-4">
            <PackageOpen className="size-6 text-muted-foreground" />
          </div>
          <p className="font-heading text-base font-medium">
            Niciun produs găsit
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Încearcă altă categorie sau resetează filtrele.
          </p>
        </div>
      ) : (
        <div
          /* `key` forțează re-rularea animației la fiecare schimbare de filtru */
          key={`${cat ?? "all"}-${sort ?? "name"}`}
          className="stagger mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {allProducts.map((product, i) => (
            <div key={product.id} style={{ "--i": i } as React.CSSProperties}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
