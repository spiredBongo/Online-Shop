import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { getCategoriesByName, getProducts } from "@/db/queries";
import DeleteOneProductButton from "@/components/admin/DeleteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format";

export default async function AdminProductsPage() {
  const [allProducts, allCategories] = await Promise.all([
    getProducts(),
    getCategoriesByName(),
  ]);

  const categoryName = new Map(allCategories.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-medium">Produse</h2>
          <p className="text-sm text-muted-foreground">
            {allProducts.length} în catalog
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus />
            Adaugă produs
          </Link>
        </Button>
      </div>

      <Card className="animate-rise gap-0 py-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produs</TableHead>
                <TableHead>Categorie</TableHead>
                <TableHead className="text-right">Preț</TableHead>
                <TableHead className="text-right">Stoc</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      /{product.slug}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.categoryId
                      ? categoryName.get(product.categoryId) ?? "—"
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPrice(product.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        product.stock === 0
                          ? "destructive"
                          : product.stock <= 5
                            ? "outline"
                            : "secondary"
                      }
                      className="tabular-nums"
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button asChild variant="ghost" size="icon-sm">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          aria-label={`Editează ${product.name}`}
                        >
                          <Pencil />
                        </Link>
                      </Button>
                      <DeleteOneProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
