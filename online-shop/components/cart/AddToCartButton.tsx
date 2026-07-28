"use client";
import { useCart } from "./CartContext";
import { products } from "@/db/schemas";
import styles from "./CartButton.module.css";


type Product = typeof products.$inferSelect;

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, removeFromCart } = useCart();


  return (
<>
    <button className={styles.button} onClick={() => addToCart(product)}>
      Add to Cart
    </button>
    
    <button className = {styles.button} onClick = {() => removeFromCart(product.id)}>
      Remove From Cart
      </button>
</>    
  );
}