"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
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


export default function TwoFactorPage() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await authClient.twoFactor.verifyTotp({ code });

            if (result.error) {
                setError("Codul de autentificare este greșit. Încearcă din nou.");
                setLoading(false);
                return;
            }

            if (result.data && "twoFactorRedirect" in result.data) {
                return;
            }
            router.push("/products");
            router.refresh();

        } catch (error) {
            setError(
                "Autentificarea a eșuat. Încearcă din nou."
            );
            setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
            <div className="halo pointer-events-none absolute top-0 left-1/2 size-[30rem] -translate-x-1/2 animate-drift" />

            <Card className="animate-rise relative w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="font-heading text-xl">
                        Verificare în doi pași
                    </CardTitle>
                    <CardDescription>
                        Introdu codul din aplicația de autentificare.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Cod de verificare</Label>
                            <Input
                                id="code"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                placeholder="123456"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive" className="animate-appear">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" size="lg" disabled={loading} className="mt-1">
                            {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                            {loading ? "Se verifică…" : "Verifică"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}