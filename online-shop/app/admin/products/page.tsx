import { requireAdmin } from "@/lib/auth"
import { db } from "@/db/index"
import { getProducts } from "@/db/queries";
import { products } from "@/db/schemas";




export default async function ProductsPage() {

    await requireAdmin();

    const allProducts   = await getProducts();

    return(
        <>
        <div>
            <main>
                <h1>Admin Products Page</h1>
                <p>Here you can manage your products.</p>
                {allProducts.map((product) => (
                    <div key={product.id}>
                        <h2>Name :{product.name}</h2>
                        <p>ID: {product.id}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Category ID: {product.categoryId}</p>
                    </div>
                ))}
            </main>
        </div>
        </>
        )
}