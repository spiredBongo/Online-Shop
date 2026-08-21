"use client" 
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { categories } from "@/db/schemas";


type Category = typeof categories.$inferSelect;


export default function FilterButtons( {categories} : {categories : Category[]} ) {
        const router = useRouter();
        const searchParams = useSearchParams();

        function setCategory(id : number) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("cat", String(id));
            router.push(`/products?${params.toString()}`); 
        }

        return(
            <div>
                {categories.map((c) =>  (
                    <button key={c.id} onClick = {() => setCategory(c.id)}> {c.name } </button>
                ))}
            </div>
        )
}