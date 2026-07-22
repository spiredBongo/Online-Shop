import Link from "next/link";
import styles from "./layout.module.css";
import CartProvider from "@/components/cart/CartProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <body>
        <CartProvider>

        <header>
                <div>
                <Link href="/products"><button className = {styles.button}>Products</button></Link>
                <Link href = "/"><button className = {styles.button}>Back to Home</button></Link>
                </div>
        </header>
     
        {children}

         <footer>
          <Link href="/despre" ><button className = {styles.button}>Despre noi</button></Link>
          <Link href="/contact" ><button className = {styles.button}>Contact</button></Link>
          <Link href="/cariere" ><button className = {styles.button}>Cariere</button></Link>
      </footer>
          </CartProvider>
      </body>
    </html>
  );
}