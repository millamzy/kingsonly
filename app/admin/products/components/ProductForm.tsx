'use client'

import { useState } from 'react'
import { createProduct, updateProduct } from '@/app/actions/products'
import { X, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

// types
type Product = {
    id: string
    name: string
    description: string | null
    price: number
    stock: number
    images: string | null
    colors: string[]
    sizes: string[]
    categoryId: string | null
}

type Props = {
    product?: Product | null
    onClose: () => void
}

export function ProductForm({ product, onClose }: Props) {
    const [error, setError] = useState<string | null>(null)
    const isEditing = !!product
    // Determine initial mode: if it looks like a URL (http) use URL, otherwise default to upload
    const initialMode = product?.images?.startsWith('http') ? 'url' : 'upload'
    const [imageMode, setImageMode] = useState<'upload' | 'url'>(initialMode)

    async function handleSubmit(formData: FormData) {
        setError(null)

        // If in upload mode and no file selected, we want to ensure we don't accidentally wipe the image
        // handled by hidden input for 'images' carrying the previous value.

        const res = isEditing
            ? await updateProduct(product.id, formData)
            : await createProduct(formData)

        if (res?.error) {
            if (typeof res.error === 'string') {
                setError(res.error)
                toast.error(res.error)
            } else {
                // Handle Zod field validation errors
                setError("Please check the form for errors")
                toast.error("Please fix the following errors:", {
                    description: (
                        <ul className="list-disc pl-4">
                            {Object.entries(res.error).map(([field, messages]) =>
                                (messages as string[]).map((msg, i) => (
                                    <li key={`${field}-${i}`}>
                                        <span className="capitalize">{field}:</span> {msg}
                                    </li>
                                ))
                            )}
                        </ul>
                    ),
                    duration: 5000,
                })
            }
        } else {
            toast.success(isEditing ? 'Product updated successfully' : 'Product created successfully')
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-zinc-800 transition-colors">
                        <X className="h-5 w-5 text-zinc-400" />
                    </button>
                </div>

                <form action={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400">Product Name</label>
                        <input
                            name="name"
                            defaultValue={product?.name}
                            required
                            placeholder="e.g. Vintage Denim Jacket"
                            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400">Description</label>
                        <textarea
                            name="description"
                            defaultValue={product?.description || ''}
                            rows={3}
                            placeholder="Product details..."
                            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                defaultValue={product?.price?.toString()}
                                required
                                placeholder="0.00"
                                className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                defaultValue={product?.stock}
                                required
                                placeholder="0"
                                className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Colors</label>
                            <input
                                name="colors"
                                defaultValue={product?.colors?.join(', ')}
                                placeholder="Red, Blue, Green"
                                className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Sizes</label>
                            <input
                                name="sizes"
                                defaultValue={product?.sizes?.join(', ')}
                                placeholder="S, M, L, XL"
                                className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400">Category</label>
                        <select
                            name="categoryId"
                            defaultValue={
                                // If it's a relation object in future, handle it. 
                                // But currently we might receive string if we just passed it, 
                                // OR we need to pass the category name if provided.
                                // The Product type has categoryId: string | null. 
                                // Since we are using name as ID essentially in our logic (upsert by name), 
                                // we can just pass name here if we fetched it.
                                // However, product.categoryId might be an actual ID (UUID).
                                // We are upserting by name, but storing Relation.
                                // If we want to PRE-FILL this form with the existing category name, we need to know the name.
                                // The current Product type definition in this file doesn't have the relation loaded.
                                // For now, let's assume we are just setting it or it's new.
                                // If editing an existing product, and we want to show the current category, 
                                // we would need the category name included in the Product prop.
                                // I'll add 'categoryName' to the Product type if possible or just rely on 'categoryId' if we were storing names.
                                // But we store UUID.
                                product?.categoryId || ""
                            }
                            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                            <option value="">Select a Category</option>
                            <option value="Outerwear">Outerwear</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Tops">Tops</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Product Image</label>

                        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800 mb-3 w-fit">
                            <button
                                type="button"
                                onClick={() => setImageMode('upload')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${imageMode === 'upload' ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <Upload className="w-3.5 h-3.5" /> Upload
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageMode('url')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${imageMode === 'url' ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <LinkIcon className="w-3.5 h-3.5" /> URL Link
                            </button>
                        </div>

                        <div className={imageMode === 'upload' ? 'block' : 'hidden'}>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="imageFile"
                                    accept="image/*"
                                    className="block w-full text-sm text-zinc-400
                            file:mr-4 file:py-2.5 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-zinc-800 file:text-white
                            hover:file:bg-zinc-700
                            cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/50"
                                />
                                <p className="mt-2 text-xs text-zinc-500">
                                    Select an image from your device. {isEditing && "Leave empty to keep current image."}
                                    <br />
                                    <span className="text-zinc-600">Max size: 5MB</span>
                                </p>
                            </div>
                        </div>

                        <div className={imageMode === 'url' ? 'block' : 'hidden'}>
                            <input
                                name="images"
                                defaultValue={product?.images || ''}
                                placeholder="https://..."
                                className="block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <p className="mt-2 text-xs text-zinc-500">Provide a direct link to the product image.</p>
                        </div>

                        {/* Hidden input to preserve image if in upload mode but no file selected (and editing) */}
                        {imageMode === 'upload' && isEditing && (
                            <input type="hidden" name="images" value={product?.images || ''} />
                        )}

                        {isEditing && product?.images && (
                            <div className="mt-4 p-2 bg-zinc-900/50 rounded-lg border border-zinc-800 inline-flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded overflow-hidden bg-zinc-800 shrink-0">
                                    <img src={product.images} alt="Current" className="h-full w-full object-cover" />
                                </div>
                                <div className="text-xs text-zinc-400">
                                    <p className="font-medium text-zinc-300">Current Image</p>
                                    <p className="truncate max-w-[200px] opacity-70">{product.images}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">{error}</div>}

                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-500 transition-colors"
                        >
                            {isEditing ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
