import Link from "next/link";
import { LayoutDashboard, Package } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  
  return (
    <div className="shell py-12">
      <div className="animate-rise flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Panou de administrare
        </h1>
        <Badge variant="outline" className="border-primary/30 text-primary">
          admin
        </Badge>

        <div className="ml-auto flex items-center gap-1">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin">
              <LayoutDashboard />
              Sumar
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/products">
              <Package />
              Produse
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {children}
    </div>
  );
}
