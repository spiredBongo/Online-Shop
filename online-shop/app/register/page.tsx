'use client'
import { signUp } from "@/lib/auth-client";
import { SubmitEvent, useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";


export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter(); 
    
   async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        
        e.preventDefault();
        
        try{

            setLoading(true);
            const result =  await signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name
            });

            if(result.error) {
                setError(result.error.message ?? "An error occurred");
            } else {
                setError("");
                router.push("/login");
            }
            
            
        }catch(err) {
            
            if(err instanceof Error) {
                setError("An error occurred: " + err.message);
            } else {
                setError("An unknown error occurred");
            }
            
        }finally {
            setLoading(false);
        }
        
        
    }
    
        
    return(
        <>
        <form onSubmit={handleSubmit}>

            <label>Email</label>
            <input placeholder="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /> 

            <label>Password</label>
            <input placeholder="password" value={formData.password} type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} /> 

            <label>Name</label>
            <input placeholder="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            <br />
            <br />

            <button type="submit" disabled={loading}>Submit</button>
        </form>
        </>
    )
}