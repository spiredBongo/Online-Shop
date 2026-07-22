"use client";
import { createContext, useContext } from "react";
import { products } from "@/db/schemas";

type Product = typeof products.$inferSelect;

type CartType = {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartType | null>(null);
export default CartContext;

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart trebuie folosit în interiorul CartProvider");
  return context;
}