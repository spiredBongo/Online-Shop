"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";

export default function DeleteOneProductButton({
  productId,
  productName,
}: {
  productId: number;
  productName?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    // Confirmarea trebuie cerută ÎNAINTE de ștergere, nu după.
    const label = productName ? `„${productName}”` : "acest produs";
    if (!confirm(`Sigur vrei să ștergi ${label}?`)) return;

    setLoading(true);

    try {
      const response = await deleteProduct(productId);

      if (!response.success) {
        console.error("Ștergerea a eșuat:", response.errors);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Eroare la ștergerea produsului:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      disabled={loading}
      onClick={handleDelete}
      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      aria-label={
        productName ? `Șterge ${productName}` : "Șterge produsul"
      }
    >
      {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
    </Button>
  );
}
