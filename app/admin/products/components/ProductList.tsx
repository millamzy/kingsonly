'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Package } from 'lucide-react'
import { ProductForm } from './ProductForm'
import { deleteProduct } from '@/app/actions/products'

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
    createdAt: Date
    updatedAt: Date
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
    // Directly using props as they will be updated by parent re-render on Server Action success
    const products = initialProducts

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id)
        }
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setIsFormOpen(true)
    }

    const handleAddNew = () => {
        setEditingProduct(null)
        setIsFormOpen(true)
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-white">All Products</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
                >
                    <Plus className="h-4 w-4" />
                    Add Product
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 pl-10 px-4 py-2.5 text-white placeholder-zinc-500 transition-all focus:border-blue-600 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-zinc-900/80 text-xs uppercase tracking-wider text-zinc-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="group transition-colors hover:bg-zinc-800/40">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 overflow-hidden rounded-lg bg-zinc-800">
                                                {product.images ? (
                                                    <img src={product.images} alt={product.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-zinc-600">
                                                        <Package className="h-5 w-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{product.name}</div>
                                                {product.description && (
                                                    <div className="max-w-xs truncate text-xs text-zinc-500">{product.description}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white">${Number(product.price).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.stock > 10 ? 'bg-green-500/10 text-green-500' : product.stock > 0 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {product.stock} in stock
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-zinc-500">
                                            <Package className="mb-2 h-8 w-8 opacity-20" />
                                            <p>No products found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormOpen && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    )
}
