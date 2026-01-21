import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    });

    if (!product) {
        notFound();
    }

    // Transform to plain object to avoid Decimal serialization issue
    // Casting to any because Prisma types might be out of sync in editor context
    const p = product as any;
    const serializedProduct = {
        ...product,
        price: Number(product.price),
        colors: p.colors || [],
        sizes: p.sizes || [],
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
    };

    return <ProductDetails product={serializedProduct} />;
}
