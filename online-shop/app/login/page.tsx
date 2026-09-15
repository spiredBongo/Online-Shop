'use client'
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e : React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn.email({
                email,
                password
            });

            if(result.error) {
                setError("Email or password is incorrect. Please try again.");
                setLoading(false);
                return;
            }

            router.push("/products");
            router.refresh();

        } catch (error) {
            setError("Login failed. Please try again." + (error instanceof Error ? ` Error: ${error.message}` : ""));
            setLoading(false);
        }
    }
  
  return (<>
    <form onSubmit={handleSubmit}>

            <label>Email</label>
            <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /> 

            <label>Password</label>
            <input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} /> 

            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            <br />
            <br />

            <button type="submit" disabled={loading}>Submit</button>
        </form>
  </>)
}