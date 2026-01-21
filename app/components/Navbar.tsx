"use client";
import Link from "next/link";
import { ShoppingBag, Search, User, Heart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top small bar */}
      <div className="absolute top-0 w-full bg-transparent z-50 px-8 py-2 flex justify-between text-[10px] uppercase font-bold text-gray-400 tracking-widest hidden md:flex">
        <div className="flex gap-4">
          <span>Shift Item | Policy Makers</span>
        </div>
        <div className="flex gap-4">
          <span>Stay Up | Select Favorites</span>
        </div>
      </div>

      {/* Floating Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-[1400px] bg-white rounded-full px-8 py-4 shadow-2xl flex items-center justify-between transition-all duration-300">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter text-black uppercase italic">
            Kings<span className="text-yellow-600">only</span>.
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "New Arrivals", path: "/new-arrivals" },
            { name: "Collections", path: "/collections" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <Link key={item.name} href={item.path} className="text-black font-bold text-xs uppercase tracking-widest hover:text-yellow-600 transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 text-black">
          <button className="hover:text-yellow-600 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="hover:text-yellow-600 transition-colors hidden sm:block">
            <Heart className="h-5 w-5" />
          </button>
          <button className="hover:text-yellow-600 transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">0</span>
          </button>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-32 px-6 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top-10">
          {[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "New Arrivals", path: "/new-arrivals" },
            { name: "Collections", path: "/collections" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <Link key={item.name} href={item.path} className="text-4xl font-black text-black uppercase tracking-tighter hover:text-yellow-600">
              {item.name}
            </Link>
          ))}
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-8 text-black font-bold uppercase">Close</button>
        </div>
      )}
    </>
  );
}
