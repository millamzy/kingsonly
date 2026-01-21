"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export type WishlistItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
};

type WishlistContextType = {
    items: WishlistItem[];
    addToWishlist: (product: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(items));
    }, [items]);

    const addToWishlist = (product: WishlistItem) => {
        setItems((prev) => {
            if (prev.some(item => item.id === product.id)) return prev;
            toast.success("Added to favorites");
            return [...prev, product];
        });
    };

    const removeFromWishlist = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.info("Removed from favorites");
    };

    const isInWishlist = (id: string) => {
        return items.some(item => item.id === id);
    };

    return (
        <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount: items.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
