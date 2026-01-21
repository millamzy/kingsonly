"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext"; // Assuming we have this
import { Heart, ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

type ProductDetailsProps = {
    product: {
        id: string;
        name: string;
        description: string | null;
        price: number;
        images: string | null;
        category: { name: string } | null;
        colors: string[];
        sizes: string[];
    };
};

export default function ProductDetails({ product }: ProductDetailsProps) {
    const defaultAvailableColors = ["Black", "White", "Gray"];
    const defaultAvailableSizes = ["S", "M", "L", "XL"];
    const colors = product.colors && product.colors.length > 0 ? product.colors : defaultAvailableColors;
    const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : defaultAvailableSizes;

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images || "/images/jacket.png",
        }, selectedColor, selectedSize, quantity);
    };

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.images || "/images/jacket.png",
                category: product.category?.name || "Uncategorized",
            });
        }
    };

    return (
        <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
            <Navbar />

            <div className="pt-32 pb-12 px-6 max-w-[1400px] mx-auto">
                <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
                    <ChevronLeft className="w-4 h-4" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Section */}
                    <div className="relative aspect-[3/4] lg:aspect-square w-full bg-zinc-900 rounded-lg overflow-hidden border border-white/10 group">
                        <Image
                            src={product.images || "/images/jacket.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <button
                            onClick={toggleWishlist}
                            className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-white hover:text-red-500 transition-all z-10 group/heart"
                        >
                            <Heart className={`w-6 h-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`} />
                        </button>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col h-full justify-center">
                        <div className="mb-8">
                            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                                {product.category?.name || "Uncategorized"}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-mono text-white mb-6">
                                ${Number(product.price).toFixed(2)}
                            </p>
                            <p className="text-gray-400 leading-relaxed max-w-md">
                                {product.description || "No description available for this premium item."}
                            </p>
                        </div>

                        <div className="space-y-8 border-t border-white/10 pt-8">
                            {/* Color Selection */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Select Color</h3>
                                <div className="flex gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all
                                                ${selectedColor === color
                                                    ? "bg-white text-black border-white"
                                                    : "bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white"}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Select Size</h3>
                                <div className="flex gap-3">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center border text-xs font-bold uppercase tracking-wider transition-all
                                                ${selectedSize === size
                                                    ? "bg-yellow-500 text-black border-yellow-500"
                                                    : "bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white"}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-xl font-mono w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="mt-4 text-sm font-bold uppercase tracking-wider text-yellow-500">
                                    Total: ${(Number(product.price) * quantity).toFixed(2)}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-4 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-yellow-500 transition-colors text-sm"
                                >
                                    Add to Cart - ${(Number(product.price) * quantity).toFixed(2)}
                                </button>
                                <Link
                                    href="/cart"
                                    className="flex-1 flex items-center justify-center border border-white/20 py-4 font-bold uppercase text-xs tracking-[0.2em] text-white hover:bg-white hover:text-black transition-colors"
                                >
                                    View Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
