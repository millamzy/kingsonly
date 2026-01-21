"use client";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

type Product = {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
};

type ShopClientProps = {
    products: Product[];
};



export default function ShopClient({ products }: ShopClientProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || "";

    const categories = ["All", "Outerwear", "Footwear", "Tops", "Accessories"];

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
            <Navbar />

            {/* Header Section */}
            <section className="pt-32 pb-12 px-6 border-b border-white/10">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                        The Collection
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed uppercase tracking-widest font-medium">
                        Discover the latest drops. Engineered for those who define their own path.
                        Limited edition releases available now.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-[80px] z-30 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2 md:gap-8">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-xs font-bold uppercase tracking-widest hover:text-yellow-500 transition-colors ${activeCategory === cat ? 'text-yellow-500' : 'text-gray-400'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-yellow-500 transition-colors bg-white/5 px-4 py-2 rounded-full md:bg-transparent md:p-0">
                        <Filter className="w-3 h-3" /> Filter & Sort <ChevronDown className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <section className="px-6 py-12 md:py-24">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            title={product.name}
                            price={product.price}
                            category={product.category}
                            variant="dark"
                        />
                    ))}

                    {/* Duplicate for fullness */}
                    {filteredProducts.length > 0 && filteredProducts.map((product) => (
                        <ProductCard
                            key={`dup-${product.id}`}
                            id={product.id}
                            image={product.image}
                            title={product.name}
                            price={product.price}
                            category={product.category}
                            variant="dark"
                        />
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-500 uppercase tracking-widest">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
