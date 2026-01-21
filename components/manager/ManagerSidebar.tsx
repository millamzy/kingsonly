"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    LogOut,
    Shirt,
    ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    {
        label: "Overview",
        href: "/manager",
        icon: LayoutDashboard,
    },
    {
        label: "Inventory",
        href: "/manager/inventory",
        icon: Package,
    },
    {
        label: "Orders",
        href: "/manager/orders",
        icon: ShoppingBag,
    },
    {
        label: "Reports",
        href: "/manager/reports",
        icon: ClipboardList,
    },
];

export function ManagerSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-black/95 backdrop-blur-xl transition-transform">
            <div className="flex h-full flex-col">
                {/* Logo Area */}
                <div className="flex h-16 items-center border-b border-zinc-800 px-6">
                    <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-wider text-white">
                        <Shirt className="h-8 w-8 text-blue-500" />
                        <span className="text-blue-500">MANAGER</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6">
                    <nav className="space-y-1 px-4">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:text-white",
                                        isActive
                                            ? "bg-blue-500/10 text-blue-500"
                                            : "text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    <link.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-blue-500" : "text-zinc-400 group-hover:text-white")} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User / Logout Area */}
                <div className="border-t border-zinc-800 p-4">
                    <button className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-500">
                        <LogOut className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-red-500" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
