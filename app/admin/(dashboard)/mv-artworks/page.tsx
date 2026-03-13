import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash2, ImageIcon, Disc } from 'lucide-react';
import Image from 'next/image';
import { deleteMvArtwork } from './actions';

export default async function MvArtworksPage() {
  const artworks = await prisma.portfolioItem.findMany({
    where: { category: 'mv-artworks' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">MV Artworks</h1>
            <p className="text-gray-400 text-sm mt-1">Manage music video covers and artwork.</p>
        </div>
        <Link
          href="/admin/mv-artworks/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} />
          Add Artwork
        </Link>
      </div>

      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Artwork</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Artist</th>
              <th className="px-6 py-4">Sort Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
             {artworks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No artworks found.</td>
                </tr>
            ) : (
                artworks.map((art) => (
                <tr key={art.id} className="hover:bg-[#1c2029] transition-colors group">
                    <td className="px-6 py-4 w-24">
                    <div className="w-16 h-16 rounded-lg bg-[#0f1115] border border-gray-800 overflow-hidden flex items-center justify-center">
                        {art.image ? (
                        <Image src={art.image} alt={art.title} width={64} height={64} className="w-full h-full object-cover" />
                        ) : (
                        <Disc className="text-gray-600 w-6 h-6" />
                        )}
                    </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{art.title}</td>
                    <td className="px-6 py-4">{art.subtitle || '-'}</td>
                    <td className="px-6 py-4 text-white font-mono">{art.sortOrder}</td>
                    <td className="px-6 py-4 text-right">
                    <form action={deleteMvArtwork.bind(null, art.id)}>
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