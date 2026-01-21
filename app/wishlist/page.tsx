"use client";

import { useWishlist } from "@/app/context/WishlistContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function WishlistPage() {
    const { items } = useWishlist();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
            <Navbar />

            <div className="pt-32 pb-12 px-6 max-w-[1400px] mx-auto min-h-[60vh]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Your Favorites</h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm">
                            {items.length} {items.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                    {items.length > 0 && (
                        <Link href="/shop" className="text-sm font-bold uppercase tracking-widest hover:text-yellow-500 transition-colors">
                            Continue Shopping
                        </Link>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20 border border-white/10 rounded-lg bg-zinc-900/50">
                        <p className="text-gray-400 mb-6 uppercase tracking-widest">Your wishlist is empty.</p>
                        <Link href="/shop" className="inline-block px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-yellow-500 transition-colors">
                            Browse Collection
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {items.map((item) => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.name}
                                price={`$${item.price.toFixed(2)}`}
                                category={item.category}
                                variant="dark"
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
