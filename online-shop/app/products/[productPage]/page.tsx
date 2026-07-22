import { db } from "@/db/index";
import { products } from "@/db/schemas";
import { eq } from "drizzle-orm";

export default async function ProductPage({
    params,
} :  { params: Promise<{productPage : string}>   
}) {

    const { productPage } = await params;
    const result = await db.select().from(products).where(eq(products.slug, productPage));
    const product = result[0];

    return (
  <div>
    <h1>Product Details</h1>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>Price: {product.price.toFixed(2)} lei</p>
    <p>Stock: {product.stock}</p>
  </div>
);
}