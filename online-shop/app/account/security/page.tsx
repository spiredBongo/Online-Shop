"use client";

import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
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

type Step = "password" | "scan" | "done";

export default function SecurityPage() {
    const [step, setStep] = useState<Step>("password");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [totpURI, setTotpURI] = useState("");
    const [backupCodes, setBackupCodes] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Pasul 1: parola -> primim QR-ul si codurile de rezerva
    async function handleEnable(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await authClient.twoFactor.enable({ password, method: "totp" });

            if (result.error || !result.data || result.data.method !== "totp") {
                setError("Parola este greșită sau 2FA nu a putut fi pornit.");
                setLoading(false);
                return;
            }

            setTotpURI(result.data.totpURI);
            setBackupCodes(result.data.backupCodes);
            setPassword("");
            setStep("scan");
        } catch (error) {
            console.error(error);
            setError("A apărut o eroare. Încearcă din nou.");
        } finally {
            setLoading(false);
        }
    }

    // Pasul 2: primul cod din aplicatie -> 2FA devine activ
    async function handleVerify(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await authClient.twoFactor.verifyTotp({ code });

            if (result.error) {
                setError("Cod invalid sau expirat. Încearcă din nou.");
                setLoading(false);
                return;
            }

            setStep("done");
        } catch (error) {
            console.error(error);
            setError("Verificarea a eșuat. Încearcă din nou.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="shell flex justify-center py-16">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="font-heading text-xl">
                        Verificare în doi pași
                    </CardTitle>
                    <CardDescription>
                        Protejează-ți contul cu un cod din aplicația de autentificare.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    {step === "password" && (
                        <form onSubmit={handleEnable} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Parola ta</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                                Activează
                            </Button>
                        </form>
                    )}

                    {step === "scan" && (
                        <form onSubmit={handleVerify} className="grid gap-4">
                            <p className="text-sm text-muted-foreground">
                                1. Scanează codul QR cu Google Authenticator (sau altă aplicație
                                de autentificare).
                            </p>

                            <div className="flex justify-center rounded-lg bg-white p-4">
                                <QRCodeSVG value={totpURI} size={180} />
                            </div>

                            <p className="text-sm text-muted-foreground">
                                2. Salvează codurile de rezervă într-un loc sigur. Sunt singura
                                cale de intrare dacă pierzi telefonul. Fiecare merge o singură
                                dată.
                            </p>

                            <ul className="grid grid-cols-2 gap-1 rounded-lg border p-3 font-mono text-sm">
                                {backupCodes.map((backupCode) => (
                                    <li key={backupCode}>{backupCode}</li>
                                ))}
                            </ul>

                            <p className="text-sm text-muted-foreground">
                                3. Introdu primul cod afișat de aplicație, ca să confirmi.
                            </p>

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
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                                Confirmă
                            </Button>
                        </form>
                    )}

                    {step === "done" && (
                        <Alert>
                            <AlertDescription>
                                Verificarea în doi pași este activă. La următoarea autentificare
                                vei fi întrebat de cod.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
