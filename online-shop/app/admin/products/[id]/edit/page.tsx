import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getCategoriesByName, getProductById } from "@/db/queries";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProductById(Number(id)),
    getCategoriesByName(),
  ]);

  if (!product) notFound();

  return <ProductForm product={product} categories={categories} />;
}
