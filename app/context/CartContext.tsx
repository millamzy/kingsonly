"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: { id: string; name: string; price: number; image: string }, color?: string, size?: string, quantity?: number) => void;
    removeFromCart: (id: string, color?: string, size?: string) => void;
    clearCart: () => void;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage whenever items change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: { id: string; name: string; price: number; image: string }, color?: string, size?: string, quantity: number = 1) => {
        setItems((prev) => {
            // Find unique item based on ID, color, and size
            const existingItemIndex = prev.findIndex((item) =>
                item.id === product.id && item.color === color && item.size === size
            );

            if (existingItemIndex > -1) {
                toast.success("Item quantity updated in cart");
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            }
            toast.success("Added to cart");
            return [...prev, { ...product, quantity, color, size }];
        });
    };

    const removeFromCart = (id: string, color?: string, size?: string) => {
        setItems((prev) => prev.filter((item) =>
            !(item.id === id && item.color === color && item.size === size)
        ));
        toast.info("Item removed from cart");
    };

    const clearCart = () => {
        setItems([]);
        toast.info("Cart cleared");
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
