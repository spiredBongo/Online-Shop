import { getProductBySlug } from "@/db/queries";

export default async function ProductPage({
    params,
} :  { params: Promise<{productPage : string}>   
}) {  

    const { productPage } = await params;
    const products = await getProductBySlug(productPage); 
  
    if (!products) return <div>Produsul nu a fost găsit</div>;
    return (
  <div>
    <h1>Product Details</h1>
    <h2>{products.name}</h2>
    <p>{products.description}</p>
    <p>Price: {products.price.toFixed(2)} lei</p>
    <p>Stock: {products.stock}</p>
  </div>
);
}