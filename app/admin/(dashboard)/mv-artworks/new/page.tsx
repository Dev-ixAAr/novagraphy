import { createMvArtwork } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';

export default function NewMvArtworkPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/mv-artworks" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Add MV Artwork</h1>
            <p className="text-sm text-gray-400">Add a new music video cover.</p>
        </div>
      </div>

      <form action={createMvArtwork} className="bg-[#161920] border border-gray-800 rounded-xl p-8 space-y-6">
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Artwork Title</label>
            <input name="title" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Song Name" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Artist Name</label>
            <input name="artist" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Artist" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Image URL</label>
            <div className="flex gap-2">
                <input name="img" required type="text" className="flex-1 bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="https://..." />
                <button type="button" className="px-4 bg-[#252a35] border border-gray-700 rounded-lg text-gray-300 hover:text-white"><UploadCloud size={20} /></button>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Sort Order</label>
            <input name="sortOrder" type="number" defaultValue={0} className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
        </div>

        <div className="pt-4">
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20">
                <Save size={18} /> Save Artwork
            </button>
        </div>

      </form>
    </div>
  );
}