"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { createProduct, updateProduct } from "@/lib/actions/product";
import { products, categories } from "@/db/schemas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = typeof products.$inferSelect;
type Category = typeof categories.$inferSelect;

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    stock: product?.stock?.toString() ?? "",
    categoryId: product?.categoryId?.toString() ?? "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors("");

    try {
      const response = product
        ? await updateProduct(product.id, formData)
        : await createProduct(formData);

      if (!response.success) {
        setErrors("A apărut o eroare la trimiterea formularului.");
      } else {
        setErrors("");
        router.push("/admin/products");
      }
    } catch (error) {
      setErrors(
        "A apărut o eroare. " + (error instanceof Error ? error.message : "")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="group -ml-2 text-muted-foreground"
      >
        <Link href="/admin/products">
          <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Înapoi la produse
        </Link>
      </Button>

      <Card className="animate-rise">
        <CardHeader>
          <CardTitle className="font-heading text-lg">
            {product ? "Editează produsul" : "Produs nou"}
          </CardTitle>
          <CardDescription>
            Câmpurile marcate sunt folosite și pentru adresa publică a
            produsului.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nume</Label>
              <Input
                id="name"
                placeholder="MacBook Air M3"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="macbook-air-m3"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descriere</Label>
              <Input
                id="description"
                placeholder="Subțire, silențios, baterie pe toată ziua."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Preț (RON)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="5499.99"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stoc</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  placeholder="10"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categorie</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Alege o categorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {errors && (
              <Alert variant="destructive" className="animate-appear">
                <AlertDescription>{errors}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-2 pt-1">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Save />}
                {loading ? "Se salvează…" : "Salvează"}
              </Button>
              <Button asChild type="button" variant="ghost">
                <Link href="/admin/products">Anulează</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
