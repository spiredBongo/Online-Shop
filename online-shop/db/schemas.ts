import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  doublePrecision,
  check,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    price: doublePrecision("price").notNull(),
    stock: integer("stock").notNull().default(0),
    imageUrl: text("image_url"),
    categoryId: integer("category_id").references(() => categories.id),
  },
  (table) => [
    check("products_price_positive", sql`${table.price} > 0`),
    check("products_stock_non_negative", sql`${table.stock} >= 0`),
  ],
);
