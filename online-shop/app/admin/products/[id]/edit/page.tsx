import { getProductById } from "@/db/queries";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }


  return (
    <div>
      <h1>Editează produsul</h1>
      <ProductForm product={product} />
    </div>
  );
}