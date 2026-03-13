import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash2, ImageIcon, Star, Edit } from 'lucide-react';
import Image from 'next/image';
import { deleteProduct } from './actions';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your catalog, prices, and status.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Featured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No products found. Click "Add New Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#1c2029] transition-colors group">
                    {/* Image Column */}
                    <td className="px-6 py-4 w-24">
                      <div className="w-16 h-16 rounded-lg bg-[#0f1115] border border-gray-800 overflow-hidden flex items-center justify-center group-hover:border-gray-700 transition-colors">
                        {product.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="text-gray-600 w-6 h-6" />
                        )}
                      </div>
                    </td>

                    {/* Title Column */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-white text-base mb-0.5">{product.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.description.substring(0, 40)}...</p>
                    </td>

                    {/* Category Column */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#252a35] rounded-md text-xs font-medium text-gray-300 border border-gray-700">
                        {product.category}
                      </span>
                    </td>

                    {/* Price Column */}
                    <td className="px-6 py-4 font-mono text-white">
                      ${product.basePrice.toFixed(2)}
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${product.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          product.status === 'DRAFT' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                            'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'ACTIVE' ? 'bg-emerald-500' :
                            product.status === 'DRAFT' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></span>
                        {product.status}
                      </span>
                    </td>

                    {/* Featured Column */}
                    <td className="px-6 py-4 text-center">
                      {product.featured ? (
                        <Star size={16} className="text-yellow-500 fill-yellow-500 mx-auto" />
                      ) : (
                        <span className="text-gray-600 text-xs">-</span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">

                        {/* Edit Action - This connects to the new page */}
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </Link>

                        {/* Delete Action */}
                        <form action={deleteProduct.bind(null, product.id)}>
                          <button
                            className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}