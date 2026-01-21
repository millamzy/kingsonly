import { prisma } from "@/lib/prisma";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

async function getStats() {
    try {
        const [userCount, productCount, orderCount] = await Promise.all([
            prisma.user.count(),
            prisma.product.count(),
            prisma.order.count(),
        ]);

        return {
            userCount,
            productCount,
            orderCount,
            totalRevenue: 0, // Calculate this properly later
        };
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return {
            userCount: 0,
            productCount: 0,
            orderCount: 0,
            totalRevenue: 0,
        };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-4xl font-bold text-white">Dashboard</h1>
                <p className="mt-2 text-zinc-400">Welcome back to your store overview.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value="$0.00"
                    icon={DollarSign}
                    description="+0% from last month"
                />
                <StatsCard
                    title="Orders"
                    value={stats.orderCount.toString()}
                    icon={ShoppingBag}
                    description="+0 since last hour"
                />
                <StatsCard
                    title="Products"
                    value={stats.productCount.toString()}
                    icon={Package}
                    description="In your inventory"
                />
                <StatsCard
                    title="Customers"
                    value={stats.userCount.toString()}
                    icon={Users}
                    description="Active users"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Orders Placeholder */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-white">Recent Orders</h2>
                    <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-800 text-zinc-500">
                        No orders yet
                    </div>
                </div>

                {/* Low Stock Placeholder */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h2 className="mb-4 font-display text-xl font-bold text-white">Low Stock Products</h2>
                    <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-800 text-zinc-500">
                        Inventory is healthy
                    </div>
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
}: {
    title: string;
    value: string;
    icon: React.ElementType;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
                <Icon className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="mt-4">
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-zinc-500">{description}</p>
            </div>
        </div>
    );
}
