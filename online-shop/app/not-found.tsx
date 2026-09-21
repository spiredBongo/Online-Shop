import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4">
      <div className="halo pointer-events-none absolute size-[28rem] animate-drift" />

      <div className="animate-rise relative flex flex-col items-center text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Compass className="size-6" />
        </span>
        <p className="mt-6 font-heading text-6xl font-semibold tracking-tight text-foreground/20">
          404
        </p>
        <h1 className="mt-2 font-heading text-xl font-semibold tracking-tight">
          Pagina nu există
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Link-ul e greșit sau pagina a fost mutată. Hai înapoi la produse.
        </p>
        <div className="mt-6 flex gap-2">
          <Button asChild>
            <Link href="/products">Vezi produsele</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Acasă</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
