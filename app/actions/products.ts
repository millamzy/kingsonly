'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.coerce.number().min(0, "Price must be positive"),
    stock: z.coerce.number().int().min(0, "Stock must be non-negative"),
    images: z.string().optional().nullable(),
    categoryId: z.string().optional().nullable(),
    colors: z.string().optional(), // We'll process this manually or use transform
    sizes: z.string().optional(),  // We'll process this manually or use transform
})

async function uploadImage(imageFile: File | null): Promise<string | null> {
    if (!imageFile || imageFile.size === 0) return null;

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const relativeUploadDir = `/uploads/products`;
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        // Ignore if exists or handle error
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const originalName = imageFile.name || 'image.png';
    const ext = originalName.split('.').pop() || 'png';
    const filename = `${uniqueSuffix}.${ext}`;

    await writeFile(join(uploadDir, filename), buffer);

    return `${relativeUploadDir}/${filename}`;
}

function parseTags(input: string | undefined | null): string[] {
    if (!input) return [];
    return input.split(',').map(s => s.trim()).filter(Boolean);
}

export async function createProduct(formData: FormData) {
    const imageFile = formData.get('imageFile') as File | null;
    let imageUrl = formData.get('images') as string;

    try {
        if (imageFile && imageFile.size > 0) {
            if (imageFile.size > 5 * 1024 * 1024) {
                return { error: "Image size exceeds 5MB limit" }
            }
            const uploadedPath = await uploadImage(imageFile);
            if (uploadedPath) imageUrl = uploadedPath;
        }
    } catch (error) {
        console.error("Image Upload Error:", error)
        return { error: "Failed to upload image" }
    }

    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        images: imageUrl,
        categoryId: formData.get('categoryId') || null,
        colors: formData.get('colors'),
        sizes: formData.get('sizes'),
    }

    const result = productSchema.safeParse(data)

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors }
    }

    const colors = parseTags(result.data.colors);
    const sizes = parseTags(result.data.sizes);

    try {
        await prisma.product.create({
            data: {
                name: result.data.name,
                description: result.data.description || null,
                price: result.data.price,
                stock: result.data.stock,
                images: result.data.images || null,
                colors: colors,
                sizes: sizes,
                category: result.data.categoryId ? {
                    connectOrCreate: {
                        where: { name: result.data.categoryId },
                        create: { name: result.data.categoryId },
                    }
                } : undefined,
            },
        })
    } catch (error) {
        console.error("Create Product Error:", error)
        return { error: "Failed to create product" }
    }

    revalidatePath('/admin/products')
    return { success: true }
}

export async function updateProduct(id: string, formData: FormData) {
    const imageFile = formData.get('imageFile') as File | null;
    let imageUrl = formData.get('images') as string;

    try {
        if (imageFile && imageFile.size > 0) {
            if (imageFile.size > 5 * 1024 * 1024) {
                return { error: "Image size exceeds 5MB limit" }
            }
            const uploadedPath = await uploadImage(imageFile);
            if (uploadedPath) imageUrl = uploadedPath;
        }
    } catch (error) {
        console.error("Image Upload Error:", error)
        return { error: "Failed to upload image" }
    }

    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        images: imageUrl,
        categoryId: formData.get('categoryId') || null,
        colors: formData.get('colors'),
        sizes: formData.get('sizes'),
    }

    const result = productSchema.safeParse(data)

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors }
    }

    const colors = parseTags(result.data.colors);
    const sizes = parseTags(result.data.sizes);

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name: result.data.name,
                description: result.data.description || null,
                price: result.data.price,
                stock: result.data.stock,
                images: result.data.images || null,
                colors: colors,
                sizes: sizes,
                category: result.data.categoryId ? {
                    connectOrCreate: {
                        where: { name: result.data.categoryId },
                        create: { name: result.data.categoryId },
                    }
                } : undefined,
            },
        })
    } catch (error) {
        console.error("Update Product Error:", error)
        return { error: "Failed to update product" }
    }

    revalidatePath('/admin/products')
    return { success: true }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        })
    } catch (error) {
        console.error("Delete Product Error:", error)
        return { error: "Failed to delete product" }
    }

    revalidatePath('/admin/products')
    return { success: true }
}
