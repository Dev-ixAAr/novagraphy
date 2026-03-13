import { createEvent } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Add New Event</h1>
            <p className="text-sm text-gray-400">Schedule an upcoming event.</p>
        </div>
      </div>

      <form action={createEvent} className="bg-[#161920] border border-gray-800 rounded-xl p-8 space-y-6">
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Event Title</label>
            <input name="title" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Annual Exhibition" />
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date/Time</label>
                <input name="date" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Oct 24, 2024 - 10:00 AM" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Location</label>
                <input name="location" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Convention Center" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Category</label>
                <input name="category" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Workshop" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Sort Order</label>
                <input name="sortOrder" type="number" defaultValue={0} className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Image URL</label>
            <div className="flex gap-2">
                <input name="image" required type="text" className="flex-1 bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="https://..." />
                <button type="button" className="px-4 bg-[#252a35] border border-gray-700 rounded-lg text-gray-300 hover:text-white"><UploadCloud size={20} /></button>
            </div>
        </div>

        <div className="pt-4">
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20">
                <Save size={18} /> Save Event
            </button>
        </div>

      </form>
    </div>
  );
}