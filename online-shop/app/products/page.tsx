import { db } from "../../db/index";
import { products } from "../../db/schemas";
import ProductCard from "../../components/ProductCard";

export default async function ProductPage() {

    const allProducts = await db.select().from(products);

    return (
    <>

        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-4xl font-bold">
                    Welcome to the Products Page!
                </h1>
            </main>

         
           {allProducts.map((product) => (
             <ProductCard key = {product.id} product = {product} />
           ))}

            
        </div>
    </>
    );
}
