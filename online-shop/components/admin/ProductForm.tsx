'use client'

import { createProduct, updateProduct } from "@/lib/actions/product";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link  from "next/link";
import {products} from "@/db/schemas"

type Product = typeof products.$inferSelect;

export default function ProductForm({product} : {product?: Product}) {

    const [formData, setFormData] = useState({
        name : "",
        slug : "",
        description : "",
        price : "",
        stock : "",
        categoryId : "",
    });
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        
        event.preventDefault();
        setLoading(true);
        setErrors("");

         try {

              const response = product
                    ? await updateProduct(product.id, formData)
                    : await createProduct(formData);

            if (!response.success) {
                setErrors("An error occurred while submitting the form.");
            }else {
                setErrors("");
                router.push("/admin/products");
            }

        }catch (error) {
        setErrors("An error occurred while submitting the form." + (error instanceof Error ? error.message : ""));
        setLoading(false);
        }finally {
            setLoading(false);
        }

    }



    return(
        <>
        <div>
            <Link href="/admin/products">Back to Products</Link>
        </div>
           <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input placeholder="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <label>Slug</label>
                <input placeholder="slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} />
                <label>Description</label>
                <input placeholder="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                <label>Price</label>
                <input placeholder="price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                <label>Stock</label>
                <input placeholder="stock" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                <label>Category ID</label>
                <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
                    <option value="">Select a category</option>
                    <option value="1">Accesorii</option>
                    <option value="2">Audio</option>
                    <option value="3">Laptop</option>
                    <option value="4">Monitoare</option>
                    <option value="5">Telefoane</option>
                </select>
                <button type="submit" disabled={loading}>Submit</button>
                {errors && <p>{errors}</p>}
                
           </form>

        </>
    )

   
}