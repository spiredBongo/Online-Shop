import { db } from "./index";
import { products, categories } from "./schemas";
import { eq, and, asc, desc, ilike} from "drizzle-orm";


export async function getCategoriesByName() {
    return db.select()
    .from(categories)
    .orderBy(asc(categories.name));
}

type GetProductsOptions = {
    categoryId?: number;
    sort?: string;
    search?: string;
}

export async function getProducts({categoryId, sort, search} : GetProductsOptions = {}) {
        const conditions = [];

        if(categoryId) {
            conditions.push(eq(products.categoryId, categoryId));
        }

        if(search) {
            conditions.push(ilike(products.name, `%${search}$%`));
        }

        const orderBy = sort === 'asc' ? asc(products.price)
            : sort === 'desc' ? desc(products.price)
            : asc(products.name);
            
        return db.select()
        .from(products)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(orderBy);
}

export async function getProductBySlug(slug : string) {
        const result = await db.select()
        .from(products)
        .where(eq(products.slug, slug));
    

        return result[0] ?? null;
}

export async function getCategoryById(categoryId : number) {
    const result = await db.select()
    .from(categories)
    .where(eq(categories.id, categoryId));
    
    return result[0] ?? null;
}
