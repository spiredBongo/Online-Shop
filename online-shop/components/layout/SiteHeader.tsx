import Link from "next/link";
import { Flame } from "lucide-react";
import NavLink from "./NavLink";
import CartSheet from "@/components/cart/CartSheet";
import LogoutButton from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/auth";

export default async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="shell flex h-16 items-center gap-2">
        <Link
          href="/"
          className="group mr-2 flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-12">
            <Flame className="size-4" />
          </span>
          <span className="font-heading text-base font-semibold tracking-tight">
            Ember<span className="text-primary">Shop</span>
          </span>
        </Link>

        <nav className="hidden items-center sm:flex">
          <NavLink href="/">Acasă</NavLink>
          <NavLink href="/products">Produse</NavLink>
          <NavLink href="/despre">Despre</NavLink>
          {user?.role === "admin" && <NavLink href="/admin">Admin</NavLink>}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-muted-foreground md:inline">
                Salut,{" "}
                <span className="font-medium text-foreground">{user.name}</span>
              </span>
              <Separator
                orientation="vertical"
                className="hidden h-5 md:block"
              />
              <LogoutButton />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Autentificare</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Cont nou</Link>
              </Button>
            </>
          )}
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
