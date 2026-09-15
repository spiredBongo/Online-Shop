import Link from "next/link";
import styles from "./layout.module.css";
import CartProvider from "@/components/cart/CartProvider";
import CartCounter from "@/components/cart/CartCounter";
import LogoutButton  from "@/components/auth/LogoutButton";
import { getCurrentUser } from "@/lib/auth";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const loggedInUser = await getCurrentUser();   
  

  return (
    <html lang="en">
      <body>
        
        <CartProvider>

        <header>
                {loggedInUser ? <h1>Welcome, {loggedInUser.name}!</h1> : <h1>Welcome to our Online Shop!</h1>}
                <div> 
                <Link href="/products"><button className = {styles.button}>Products</button></Link>
                <Link href = "/"><button className = {styles.button}>Back to Home</button></Link>
                <Link href="/login"><button className = {styles.button}>Login</button></Link>
                <Link href="/register"><button className = {styles.button}>Register</button></Link>
                <LogoutButton />
                </div>
                <CartCounter />
        </header>
     
        {children}

         <footer> 
          <Link href="/despre" ><button className = {styles.button}>Despre noi</button></Link>
          <Link href="/contact" ><button className = {styles.button}>Contact</button></Link>
          <Link href="/cariere" ><button className = {styles.button}>Cariere</button></Link>
          
          Shop created by Bogdan Bosoanca, 2024. All rights reserved.
      </footer>
          </CartProvider>
      </body>
    </html>
  );
}