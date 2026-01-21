import { prisma } from "@/lib/prisma";
import ShopClient from "./ShopClient";

export const dynamic = 'force-dynamic';

export default async function Shop() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            category: true,
        }
    });

    // Transform DB data to frontend model
    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        // Format price to currency string
        price: `$${Number(product.price).toFixed(2)}`,
        category: product.category?.name || "Uncategorized",
        // Format image path - prioritize DB image, fallback to placeholder
        image: product.images || "/images/jacket.png"
    }));

    return <ShopClient products={formattedProducts} />;
}
