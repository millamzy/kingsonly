import { prisma } from '@/lib/prisma'
import ProductList from './components/ProductList'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    })

    // Transform Decimal to number for client component
    const localizedProducts = products.map(p => ({
        ...p,
        price: p.price.toNumber(),
    }))

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-4xl font-bold text-white">Products</h1>
                <p className="mt-2 text-zinc-400">Manage your product inventory here.</p>
            </div>

            <ProductList initialProducts={localizedProducts} />
        </div>
    )
}
