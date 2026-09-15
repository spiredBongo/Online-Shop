'use client'
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogout() {
        setLoading(true);
        setError("");
        
        try {
            const result = await signOut();
            
            if(result.error) {
                setError("Failed to logout");
                return;
            }
            
            router.push("/");
            router.refresh();
            
        } catch (error) {
            setError("Logout failed. Please try again." + (error instanceof Error ? ` Error: ${error.message}` : ""));
        
        } finally {
            setLoading(false);
        }
}

    return(
        <>
        
        <button type="button" disabled={loading} onClick={handleLogout}>
            Log-out
        </button>
        
        </>
    )
}