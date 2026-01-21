"use client";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function NewArrivals() {
    const newProducts = [
        {
            id: 101,
            name: "Phantom Parka",
            price: "$3,200",
            category: "Outerwear",
            image: "/images/jacket.png",
            tag: "Just Dropped"
        },
        {
            id: 102,
            name: "Nebula Strides",
            price: "$1,450",
            category: "Footwear",
            image: "/images/sneakers.png",
            tag: "Selling Fast"
        },
        {
            id: 103,
            name: "Eclipse Hoodie",
            price: "$920",
            category: "Tops",
            image: "/images/hero.png",
            tag: "New"
        },
        {
            id: 104,
            name: "Obsidian Vest",
            price: "$1,100",
            category: "Outerwear",
            image: "/images/jacket.png",
            tag: "Limited"
        },
    ];

    return (
        <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-b from-yellow-500/10 to-transparent blur-[100px] pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="inline-block px-3 py-1 mb-6 border border-yellow-500/30 rounded-full bg-yellow-500/10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">Season 04 Drop</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 leading-[0.85] italic">
                        New <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-800">Arrivals</span>
                    </h1>

                    <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed uppercase tracking-widest font-medium border-l border-yellow-500 pl-6">
                        Fresh form the lab. The latest innovations in cut, fabric, and silhouette.
                        Be the first to wear the future.
                    </p>
                </div>
            </section>

            {/* Featured New Item */}
            <section className="px-6 pb-24">
                <div className="max-w-[1400px] mx-auto">
                    <div className="relative w-full h-[60vh] md:h-[80vh] bg-gray-900 overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"></div>
                        <div className="absolute inset-0 bg-black/40"></div>

                        <div className="absolute bottom-10 left-6 md:bottom-20 md:left-20 max-w-lg">
                            <p className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-2">Headline Drop</p>
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">The Void Walker Coat</h2>
                            <button className="bg-white text-black px-8 py-4 uppercase font-black tracking-widest text-xs hover:bg-yellow-500 transition-colors">
                                Shop This Look
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product List */}
            <section className="px-6 pb-32">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
                        <h3 className="text-2xl font-bold uppercase tracking-widest">Latest Drops</h3>
                        <span className="text-gray-500 text-xs font-mono">04 ITEMS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {newProducts.map((product) => (
                            <div key={product.id} className="relative">
                                {/* Custom 'New' Badge override or addition if specific logic needed */}
                                <div className="absolute z-10 top-4 right-4 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                                    {product.tag}
                                </div>
                                <ProductCard
                                    id={String(product.id)}
                                    image={product.image}
                                    title={product.name}
                                    price={product.price}
                                    category={product.category}
                                    variant="dark"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
