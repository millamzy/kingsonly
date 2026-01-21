"use client";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState("All");

    const products = [
        {
            id: 1,
            name: "Shadow Bomber",
            price: "$2,500",
            category: "Outerwear",
            image: "/images/jacket.png",
        },
        {
            id: 2,
            name: "Midas Kicks",
            price: "$1,200",
            category: "Footwear",
            image: "/images/sneakers.png",
        },
        {
            id: 3,
            name: "Void Runner",
            price: "$980",
            category: "Footwear",
            image: "/images/sneakers.png",
        },
        {
            id: 4,
            name: "Onyx Leather",
            price: "$3,100",
            category: "Outerwear",
            image: "/images/jacket.png",
        },
        {
            id: 5,
            name: "Stealth Hoodie",
            price: "$850",
            category: "Tops",
            image: "/images/hero.png",
        },
        {
            id: 6,
            name: "Urban Cargo",
            price: "$650",
            category: "Bottoms",
            image: "/images/jacket.png",
        },
        {
            id: 7,
            name: "Viper Windbreaker",
            price: "$1,800",
            category: "Outerwear",
            image: "/images/hero.png",
        },
        {
            id: 8,
            name: "Cobalt Runners",
            price: "$1,050",
            category: "Footwear",
            image: "/images/sneakers.png",
        },
    ];

    const categories = ["All", "Outerwear", "Footwear", "Tops", "Accessories"];

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(product => product.category === activeCategory);

    // Filter duplicates as well if we want the "fullness" to respect filters, 
    // or we can remove the duplication logic in favor of just showing the filtered list.
    // The user didn't ask to keep the duplicates, but I'll replicate the logic for filtered list too if they want 'fullness',
    // but actually, filtered lists usually scale down. Let's just filter the main list and maybe double it if it's "All" 
    // to keep the visual density the user saw before, OR just show what we have.
    // Let's standardly just show the filtered items. 
    // Actually, the original code duplicated the entire list. 
    // To match the previous visual weight, I'll duplicate the *filtered* list.

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
                            image={product.image}
                            title={product.name}
                            price={product.price}
                            category={product.category}
                            variant="dark"
                        />
                    ))}

                    {/* Duplicate for fullness - only if we have enough items to warrant it or just always double it for the 'vibe' */}
                    {filteredProducts.length > 0 && filteredProducts.map((product) => (
                        <ProductCard
                            key={`dup-${product.id}`}
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
