import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/cart/CartProvider";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: {
    default: "EmberShop — tehnologie aleasă cu cap",
    template: "%s · EmberShop",
  },
  description:
    "Laptopuri, telefoane, monitoare și audio. Livrare rapidă, retur în 30 de zile.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`dark ${geist.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
