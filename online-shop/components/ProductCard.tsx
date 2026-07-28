import { products } from "@/db/schemas";
import styles from "./ProductCard.module.css";
import Link from "next/link";

type Product = typeof products.$inferSelect;

export default function ProductCard({ product }: { product: Product }) {
  return (
<>
        
    <Link href={`/products/${product.slug}`} className = {styles.link}>
        <div className={styles.card}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
        </div>        
    </Link>
</>
  );
} 