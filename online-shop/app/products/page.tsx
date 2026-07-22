import { db } from "../../db/index";
import { products } from "../../db/schemas";
import ProductCard from "../../components/ProductCard";
import styles from "./products.module.css";
import AddToCartButton from "@/components/cart/AddToCartButton";
import CheckCart from "@/components/cart/CheckCart";
 
export default async function ProductPage() {

    const allProducts = await db.select().from(products);

    return (
    <>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-4xl font-bold">
                    Welcome to the Products Page!
                </h1>
            </main>
        
        <div className = {styles.grid}>

            
        {allProducts.map((product) => (
        <div key={product.id}>
            <ProductCard product={product} />
            <AddToCartButton product={product} />
        </div>
            ))}

        </div>

    <CheckCart />

    </>
    );
}
