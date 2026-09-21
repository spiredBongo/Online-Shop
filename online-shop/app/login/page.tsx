"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn.email({ email, password });

      if (result.error) {
        setError("Emailul sau parola sunt greșite. Încearcă din nou.");
        setLoading(false);
        return;
      }

      router.push("/products");
      router.refresh();
    } catch (error) {
      setError(
        "Autentificarea a eșuat. Încearcă din nou." +
          (error instanceof Error ? ` Eroare: ${error.message}` : "")
      );
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
      <div className="halo pointer-events-none absolute top-0 left-1/2 size-[30rem] -translate-x-1/2 animate-drift" />

      <Card className="animate-rise relative w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Bine ai revenit</CardTitle>
          <CardDescription>
            Intră în cont ca să îți vezi comenzile.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="nume@exemplu.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Parolă</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive" className="animate-appear">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" size="lg" disabled={loading} className="mt-1">
              {loading ? <Loader2 className="animate-spin" /> : <LogIn />}
              {loading ? "Se conectează…" : "Autentifică-te"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Nu ai cont?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Creează unul
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
