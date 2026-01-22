"use client";
import Link from "next/link";
import { ShoppingBag, Search, User, Heart, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

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
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-yellow-600 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {user ? (
            <div className="relative group">
              <Link href={user.role === 'ADMIN' ? '/admin' : '/dashboard/profile'} className="hover:text-yellow-600 transition-colors">
                <User className="h-5 w-5 text-yellow-500" />
              </Link>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold uppercase">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                </div>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin Dashboard</Link>
                )}
                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">My Account</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hover:text-yellow-600 transition-colors">
              <User className="h-5 w-5" />
            </Link>
          )}
          <Link href="/wishlist" className="hover:text-yellow-600 transition-colors hidden sm:block">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="hover:text-yellow-600 transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-yellow-500 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl">
            <div className="relative border-b-2 border-white/20 focus-within:border-yellow-500 transition-colors">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS..."
                className="w-full bg-transparent py-4 text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter placeholder-white/30 focus:outline-none"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-yellow-500">
                <Search className="w-8 h-8" />
              </button>
            </div>
            <p className="mt-4 text-white/40 text-sm uppercase tracking-widest font-medium">
              Press Enter to search
            </p>
          </form>
        </div>
      )}

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
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-black text-black uppercase tracking-tighter hover:text-yellow-600"
            >
              {item.name}
            </Link>
          ))}
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-8 text-black font-bold uppercase">Close</button>
        </div>
      )}
    </>
  );
}
