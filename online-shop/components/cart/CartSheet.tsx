"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/format";

export default function CartSheet() {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Face bulina să "pocnească" de fiecare dată când se schimbă numărul.
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (count > 0) setPulse((p) => p + 1);
  }, [count]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label={`Coș (${count} produse)`}
        >
          <ShoppingCart />
          {count > 0 && (
            <span
              key={pulse}
              className="absolute -top-1.5 -right-1.5 flex size-4.5 animate-pop items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground tabular-nums"
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="gap-0">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-primary" />
            Coșul tău
          </SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Încă nu ai adăugat nimic."
              : `${count} ${count === 1 ? "produs" : "produse"} în coș.`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="rounded-full bg-muted p-4">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Coșul este gol. Aruncă un ochi pe produse.
            </p>
          </div>
        ) : (
          <div className="stagger flex-1 divide-y overflow-y-auto">
            {items.map((item, i) => (
              <div
                key={item.product.id}
                style={{ "--i": i } as React.CSSProperties}
                className="flex items-start gap-3 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {item.product.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatPrice(item.product.price)} / buc.
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    <Button
                      size="icon-xs"
                      variant="outline"
                      onClick={() => decreaseQuantity(item.product.id)}
                      aria-label="Scade cantitatea"
                    >
                      <Minus />
                    </Button>
                    <span className="w-7 text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon-xs"
                      variant="outline"
                      onClick={() => increaseQuantity(item.product.id)}
                      aria-label="Crește cantitatea"
                    >
                      <Plus />
                    </Button>
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Elimină din coș"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>

                <span className="text-sm font-medium tabular-nums">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="border-t bg-card">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-heading text-lg font-semibold tabular-nums text-primary">
                {formatPrice(total)}
              </span>
            </div>
            <Separator />
            <Button size="lg" className="w-full">
              Finalizează comanda
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
