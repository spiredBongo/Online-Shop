"use client"
import { useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react";


export default function CartCounter() {
    const { items } = useCart();

    return (
        <>  
            <ShoppingCart size={20} />
            <div>
                {items.length}
            </div>
        </>
    )
}


