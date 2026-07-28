"use client"

import CartContext from "./CartContext"
import { useState } from "react"
import { products } from "@/db/schemas"
import { CartItem } from "@/components/cart/CartContext"

type Product = typeof products.$inferSelect;


export default function CartProvider({
    children,
}: {
    children : React.ReactNode
}) {

    const [items, setItems] = useState<CartItem[]>([]);

    function increaseQuantity(id : number) {
           setItems((prev) => prev.map((item) => 
            item.product.id === id ? {...item, quantity : item.quantity + 1} : item   
        )) 
    }

    function decreaseQuantity(id : number) {    
        const item = items.find((i) => i.product.id === id);

        if( item && item.quantity === 1) {
            removeFromCart(id);        
        }
            setItems((prev) => prev.map((item) => 
                item.product.id === id  ? {...item, quantity : item.quantity - 1} : item   
        )) 
}

    function addToCart(product : Product) {
        if(items.find((prod) => prod.product.id === product.id)) {
            increaseQuantity(product.id);            
        }else {
            setItems((prev) => [...prev, { product, quantity: 1 }]);
        }
    }

    function removeFromCart(id : number) {
        setItems((prev) => prev.filter((item) => item.product.id !== id));
    }

    return <CartContext.Provider value = {{items, addToCart, removeFromCart, increaseQuantity, decreaseQuantity}}>{children}</CartContext.Provider>
}