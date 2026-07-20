import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <body>
        <header>
                <div>
                <Link href="/products"><button>Products</button></Link>
                <Link href = "/"><button>Back to Home</button></Link>
                </div>
        </header>
     
        {children}

         <footer>
          <Link href="/despre" ><button>Despre noi</button></Link>
          <Link href="/contact" ><button>Contact</button></Link>
          <Link href="/cariere" ><button>Cariere</button></Link>
      </footer>
      </body>
    </html>
  );
}