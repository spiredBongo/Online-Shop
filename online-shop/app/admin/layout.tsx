import { requireAdmin } from "@/lib/auth";



export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireAdmin();
console.log("AdminLayout loaded");
  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}