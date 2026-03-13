import { createPortfolioItem } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';

export default function NewPortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/portfolio" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Add Portfolio Item</h1>
            <p className="text-sm text-gray-400">Create a new entry for your portfolio.</p>
        </div>
      </div>

      <form action={createPortfolioItem} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Title</label>
                    <input name="title" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Project Name" />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Subtitle</label>
                    <input name="subtitle" type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Short description" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* --- UPDATED CATEGORY SECTION --- */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Category</label>
                        <select 
                            name="category" 
                            required
                            className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        >
                            <option value="" disabled selected>Select...</option>
                            <option value="Live Event">Live Event</option>
                            <option value="MV Artwork">MV Artwork</option>
                            <option value="Logo">Logo</option>
                        </select>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Date</label>
                        <input name="date" type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="e.g. 2023" />
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
            <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Image URL</label>
                    <div className="flex gap-2">
                        <input name="image" required type="text" className="flex-1 bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="https://..." />
                        <button type="button" className="px-3 bg-[#252a35] border border-gray-700 rounded-lg text-gray-300"><UploadCloud size={18} /></button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Sort Order</label>
                    <input name="sortOrder" type="number" defaultValue={0} className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Class Name (Optional)</label>
                    <input name="className" type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="CSS classes" />
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all mt-4">
                    <Save size={18} /> Save Item
                </button>
            </div>
        </div>
      </form>
    </div>
  );
}