"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart, ShoppingBag } from "lucide-react";

interface ProductCardProps {
    id: string;
    image: string;
    title: string;
    price: string;
    category: string;
    variant?: 'dark' | 'light';
}

export default function ProductCard({ id, image, title, price, category, variant = 'dark' }: ProductCardProps) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(id);
    const textColor = variant === 'dark' ? 'text-white' : 'text-black';
    const subTextColor = variant === 'dark' ? 'text-gray-500' : 'text-gray-600';
    const buttonBorder = variant === 'dark' ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white';

    const handleAddToCart = () => {
        const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        addToCart({
            id,
            name: title,
            price: numericPrice,
            image
        });
    };

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(id);
        } else {
            const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
            addToWishlist({
                id,
                name: title,
                price: numericPrice,
                image,
                category
            });
        }
    };

    return (
        <div className="group relative">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-none bg-gray-200 relative">
                <Link href={`/shop/${id}`} className="block w-full h-full">
                    <Image
                        src={image}
                        alt={title}
                        width={800}
                        height={1000}
                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-black uppercase tracking-[0.2em] text-sm border-2 border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
                            View Details
                        </span>
                    </div>

                    <div className="absolute top-4 left-4 bg-yellow-500 px-3 py-1 text-[10px] font-black text-black uppercase tracking-widest z-10">
                        {category}
                    </div>
                </Link>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist();
                    }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white text-white hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </button>
            </div>

            <Link href={`/shop/${id}`} className="block mt-4 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-bold uppercase tracking-tighter ${textColor}`}>
                        {title}
                    </h3>
                    <p className="text-lg font-mono text-yellow-500">{price}</p>
                </div>
                <p className={`text-xs uppercase tracking-widest ${subTextColor}`}>Limited Edition</p>
            </Link>

            <button
                onClick={handleAddToCart}
                className={`mt-4 w-full flex items-center justify-center gap-2 border py-4 font-bold uppercase text-xs tracking-[0.1em] transition-all duration-300 ${buttonBorder}`}
            >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
        </div>
    );
}
