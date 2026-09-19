import { requireAdmin } from "@/lib/auth"
import { getProducts } from "@/db/queries";
import Link from "next/dist/client/link";
import DeleteOneProductButton from "@/components/admin/DeleteButton";
import { Delete } from "lucide-react";




export default async function ProductsPage() {

    await requireAdmin();

    const allProducts   = await getProducts();

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();


    }  

    return(
        <>
        <div>
            <main>
                <h1>Admin Products Page</h1>
                <Link href="/admin/products/new">Add a new product</Link>
                {allProducts.map((product) => (
                    <div key={product.id}>
                        <h2>Name :{product.name}</h2>
                        <p>ID: {product.id}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Category ID: {product.categoryId}</p>
                        <DeleteOneProductButton productId={product.id} />
                    </div>
                ))}
            </main>
        </div>
        </>
        )
}