import ProductCard from "../../components/ProductCard";
import styles from "./products.module.css";
import AddToCartButton from "@/components/cart/AddToCartButton";
import CheckCart from "@/components/cart/CheckCart";
import FilterButtons from "./FilterButtons";
import { getProducts, getCategoriesByName } from "@/db/queries";
 
export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const { cat, sort } = await searchParams;

  const allProducts = await getProducts({
    categoryId: cat ? Number(cat) : undefined,
    sort,
  });
    const allCategories = await getCategoriesByName();

    return (
    <>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-4xl font-bold">
                    Welcome to the Products Page!
                </h1>
            </main>
        
        <div className = {styles.grid}>

        <FilterButtons categories={allCategories}/>
        {allProducts.map((product) => (
        <div key={product.id}>
            <ProductCard product={product} />
            <AddToCartButton product={product} />
        </div>
            ))}

        </div>

    <CheckCart />

    </>
    );
}
