"use client"

import CartContext from "./CartContext"
import { useState } from "react"
import { products } from "@/db/schemas"

type Product = typeof products.$inferSelect;

export default function CartProvider({
    children,
}: {
    children : React.ReactNode
}) {

    const [items, setItems] = useState<Product[]>([]);

    function addToCart(product : Product) {
        setItems((prev) => [...prev, product]);
    }

    function removeFromCart(id : number) {
        setItems((prev) => prev.filter((p) => p.id !== id));
    }

    return <CartContext.Provider value = {{items, addToCart, removeFromCart}}>{children}</CartContext.Provider>
}