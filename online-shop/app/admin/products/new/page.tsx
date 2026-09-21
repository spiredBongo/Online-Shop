import ProductForm from "@/components/admin/ProductForm";
import { getCategoriesByName } from "@/db/queries";

export default async function AddProductPage() {
  const categories = await getCategoriesByName();

  return <ProductForm categories={categories} />;
}
