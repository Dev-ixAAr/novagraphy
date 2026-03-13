import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash2, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { deletePortfolioItem } from './actions';

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">Portfolio</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your showcase items.</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} />
          Add Item
        </Link>
      </div>

      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title / Subtitle</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Sort Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No portfolio items found.</td>
                </tr>
            ) : (
                items.map((item) => (
                <tr key={item.id} className="hover:bg-[#1c2029] transition-colors group">
                    <td className="px-6 py-4 w-24">
                    <div className="w-16 h-16 rounded-lg bg-[#0f1115] border border-gray-800 overflow-hidden flex items-center justify-center">
                        {item.image ? (
                        <Image src={item.image} alt={item.title} width={64} height={64} className="w-full h-full object-cover" />
                        ) : (
                        <ImageIcon className="text-gray-600 w-6 h-6" />
                        )}
                    </div>
                    </td>
                    <td className="px-6 py-4">
                        <p className="font-medium text-white text-base">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.subtitle || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-[#252a35] rounded-md text-xs font-medium text-gray-300 border border-gray-700">
                            {item.category}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-white font-mono">{item.sortOrder}</td>
                    <td className="px-6 py-4 text-right">
                    <form action={deletePortfolioItem.bind(null, item.id)}>
                        <button className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all">
                        <Trash2 size={16} />
                        </button>
                    </form>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}