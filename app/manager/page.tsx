import { prisma } from "@/lib/prisma";
import { Package, ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getManagerStats() {
    try {
        const [productCount, orderCount] = await Promise.all([
            prisma.product.count(),
            prisma.order.count(),
        ]);

        return {
            productCount,
            orderCount,
            lowStockCount: 0, // Placeholder
            pendingOrders: 0, // Placeholder
        };
    } catch (error) {
        console.error("Failed to fetch manager stats:", error);
        return {
            productCount: 0,
            orderCount: 0,
            lowStockCount: 0,
            pendingOrders: 0,
        };
    }
}

export default async function ManagerDashboard() {
    const stats = await getManagerStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-4xl font-bold text-white">Manager Overview</h1>
                <p className="mt-2 text-zinc-400">Track inventory and active orders.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Inventory"
                    value={stats.productCount.toString()}
                    icon={Package}
                    description="Total items tracked"
                    color="text-blue-500"
                />
                <StatsCard
                    title="Active Orders"
                    value={stats.orderCount.toString()}
                    icon={ShoppingBag}
                    description="Awaiting fulfillment"
                    color="text-blue-500"
                />
                <StatsCard
                    title="Low Stock Alerts"
                    value={stats.lowStockCount.toString()}
                    icon={AlertCircle}
                    description="Restock recommended"
                    color="text-red-500"
                />
                <StatsCard
                    title="Daily Sales"
                    value="-" // Placeholder
                    icon={TrendingUp}
                    description="Today's performance"
                    color="text-green-500"
                />
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="mb-4 font-display text-xl font-bold text-white">Recent Activity</h2>
                <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-zinc-800 text-zinc-500">
                    No recent activity to display
                </div>
            </div>
        </div>
    );
}

function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    color,
}: {
    title: string;
    value: string;
    icon: React.ElementType;
    description: string;
    color?: string;
}) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
                <Icon className={cn("h-5 w-5", color || "text-zinc-500")} />
            </div>
            <div className="mt-4">
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-zinc-500">{description}</p>
            </div>
        </div>
    );
}

// Utility for merging classes if not imported from @/lib/utils in this file context, 
// using simple concatenation here or importing strict cn if needed.
// Actually standard practice is to import. I'll maintain consistency.
import { cn } from "@/lib/utils";
