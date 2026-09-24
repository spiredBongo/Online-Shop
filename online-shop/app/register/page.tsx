"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { signUp } from "@/lib/auth-client";
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

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (result.error) {
        setError(result.error.message ?? "A apărut o eroare.");
      } else {
        setError("");
        router.push("/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("A apărut o eroare: " + err.message);
      } else {
        setError("A apărut o eroare necunoscută.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
      <div className="halo pointer-events-none absolute top-0 left-1/2 size-[30rem] -translate-x-1/2 animate-drift" />

      <Card className="animate-rise relative w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Creează un cont</CardTitle>
          <CardDescription>
            Durează mai puțin de un minut.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nume</Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Ion Popescu"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="nume@exemplu.ro"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Parolă</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="minim 8 caractere"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {error && (
              <Alert variant="destructive" className="animate-appear">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" size="lg" disabled={loading} className="mt-1">
              {loading ? <Loader2 className="animate-spin" /> : <UserPlus />}
              {loading ? "Se creează…" : "Creează contul"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Ai deja cont?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Autentifică-te
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
