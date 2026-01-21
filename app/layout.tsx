import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KINGSONLY | Wear the Crown",
  description: "Premium streetwear for the modern royalty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-black text-white selection:bg-yellow-500 selection:text-black`}
      >
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
        <Toaster dir="auto" invert richColors />
      </body>
    </html>
  );
}
