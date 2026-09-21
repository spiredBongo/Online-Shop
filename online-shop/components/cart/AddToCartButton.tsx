"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "./CartContext";
import { products } from "@/db/schemas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Product = typeof products.$inferSelect;

export default function AddToCartButton({
  product,
  className,
  size = "sm",
}: {
  product: Product;
  className?: string;
  size?: "sm" | "lg";
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  }

  const disabled = product.stock === 0;

  return (
    <Button
      size={size}
      variant={added ? "secondary" : "default"}
      disabled={disabled}
      onClick={handleAdd}
      className={cn("transition-all", className)}
    >
      {added ? (
        <>
          <Check className="animate-pop" />
          Adăugat
        </>
      ) : (
        <>
          <Plus />
          {disabled ? "Indisponibil" : "Adaugă în coș"}
        </>
      )}
    </Button>
  );
}
