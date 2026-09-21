"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {/* bara de sub link-ul activ, animată din centru */}
      <span
        className={cn(
          "absolute inset-x-2 -bottom-px h-px origin-center bg-primary transition-transform duration-300 ease-out",
          active ? "scale-x-100" : "scale-x-0"
        )}
      />
    </Link>
  );
}
