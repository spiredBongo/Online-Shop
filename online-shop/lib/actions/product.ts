"use server";

import { IdForProductDelete, ProductSchemaValidation, ProductUpdateSchemaValidation } from "@/lib/validations";
import { requireAdmin } from "../auth";
import { db } from "@/db/index";
import { products } from "@/db/schemas";
import { treeifyError } from "zod/v4/core";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createProduct(productData: unknown) {
    "use server";
    await requireAdmin();

    const result = ProductSchemaValidation.safeParse(productData);

    if (!result.success) {
        return { success: false, errors: treeifyError(result.error) };
    }

    const [newProduct] = await db
        .insert(products)
        .values(result.data)
        .returning()

        revalidatePath("/products");
        revalidatePath("/admin/products");

    return { success: true, product: newProduct };
}   

export async function updateProduct(productId: number, productData: unknown) {
    "use server";

    await requireAdmin();

    const result = ProductUpdateSchemaValidation.safeParse(productData);

    if (!result.success) {
        return { success: false, errors: treeifyError(result.error) };
    }

    const [updatedProduct] = await db
        .update(products)
        .set(result.data)
        .where(eq(products.id, productId))
        .returning();

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, product: updatedProduct };
}

export async function deleteProduct(productId: number) {
    "use server";

    await requireAdmin();

    const result = IdForProductDelete.safeParse(productId);

    if (!result.success) {
        return { success: false, errors: treeifyError(result.error) };
    }

    const deleted = await 
        db
        .delete(products)
        .where(eq(products.id, result.data))
        .returning();

    if (deleted.length === 0) {
        return { success: false, errors: { productId: "Product not found" } };
    }

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true };
}
