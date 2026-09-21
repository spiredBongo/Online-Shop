"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const result = await signOut();
      if (result.error) return;

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Deconectarea a eșuat:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={loading}
      onClick={handleLogout}
      className="text-muted-foreground"
    >
      {loading ? <Loader2 className="animate-spin" /> : <LogOut />}
      <span className="hidden sm:inline">Ieși din cont</span>
    </Button>
  );
}
