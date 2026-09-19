"use client";

import { deleteProduct } from "@/lib/actions/product";
import { useRouter } from "next/navigation";

export default function DeleteOneProductButton({ productId } : {productId: number}) {
    
    const router = useRouter();

    async function handleDelete() {

        try {
            const response = await deleteProduct(productId);

            if(!confirm("Are you sure you want to delete this product?")) {
                return;
            }

            if (!response.success) {
                console.error("Failed to delete product:", response.errors);
                return;
            }
            
            router.refresh();
        } catch (error) {
            console.error("An error occurred while deleting the product:", error);
        }
    }

    return (
        <button onClick={handleDelete}>Delete Product</button>
    );
}