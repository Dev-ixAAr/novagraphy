import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash2, Edit, Layers } from 'lucide-react';
import { deletePackage } from './actions';

export default async function PackagesPage() {
  const packages = await prisma.servicePackage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Packages</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage pricing packages for your services.
          </p>
        </div>
        <Link
          href="/admin/packages/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} />
          Add New Package
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Features</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {packages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Layers size={32} className="mx-auto mb-3 text-gray-600" />
                    No packages found. Click &quot;Add New Package&quot; to create one.
                  </td>
                </tr>
              ) : (
                packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-[#1c2029] transition-colors group">
                    {/* Title */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-white text-base">{pkg.title}</p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#252a35] rounded-md text-xs font-medium text-gray-300 border border-gray-700">
                        {pkg.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-mono text-emerald-400 font-semibold">
                      {pkg.price}
                    </td>

                    {/* Features Count */}
                    <td className="px-6 py-4 text-gray-400">
                      {pkg.features.length} feature{pkg.features.length !== 1 ? 's' : ''}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/packages/${pkg.id}`}
                          className="p-2 text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                          title="Edit Package"
                        >
                          <Edit size={16} />
                        </Link>

                        <form action={deletePackage.bind(null, pkg.id)}>
                          <button
                            className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                            title="Delete Package"
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
