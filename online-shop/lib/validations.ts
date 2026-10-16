import { z } from "zod";

const name = z.string().trim().min(3).max(100);
const slug = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .min(3)
  .max(100);
const description = z.string().trim().min(3).max(500);

const price = z.coerce.number().positive().max(999999.99).multipleOf(0.01);

const stock = z.coerce.number().int().positive();

const categoryId = z.coerce.number().int().positive();

export const ProductSchemaValidation = z.object({
  name,
  slug,
  description,
  price,
  stock,
  categoryId,
});

export const ProductFiltersSchemaValidation = z.object({
  cat: z.coerce.number().int().positive().optional(),
  sort: z.enum(["name", "asc", "desc"]).optional(),
});

export const AccountSchemaValidation = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.email().max(256),
});

export const ProductUpdateSchemaValidation = ProductSchemaValidation.omit({
  slug: true,
}).partial();

export const IdForProductDelete = z.coerce.number().int().positive();

export const IdForUpdateProduct = z.coerce.number().int().positive();

export type Product = z.infer<typeof ProductSchemaValidation>;
