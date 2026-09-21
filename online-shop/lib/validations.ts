import { z } from "zod";

const name = z.string().min(3).max(100);
const slug = z.string().regex(/^[a-z-0-9-]+$/).min(3).max(100);
const description = z.string().min(3).max(500).optional();
// Coloana din DB e `doublePrecision`, iar prețurile reale au zecimale (5499.99),
// deci validarea nu trebuie să ceară întregi.
const price = z.coerce.number().positive();
const stock = z.coerce.number().int().nonnegative();
const categoryId = z.coerce.number().int().positive();


export const ProductSchemaValidation = z.object({
    name,
    slug,
    description,
    price,
    stock,
    categoryId,
});

export const ProductUpdateSchemaValidation = ProductSchemaValidation
        .omit({ slug: true })
        .partial();

export const IdForProductDelete = z.coerce.number().int().positive();

export type Product = z.infer<typeof ProductSchemaValidation>;
