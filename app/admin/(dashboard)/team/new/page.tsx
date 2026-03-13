import { createTeamMember } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/team" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Add Team Member</h1>
            <p className="text-sm text-gray-400">Add a new person to the organization.</p>
        </div>
      </div>

      <form action={createTeamMember} className="bg-[#161920] border border-gray-800 rounded-xl p-8 space-y-6">
        
        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <input name="name" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Role / Position</label>
                <input name="role" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Senior Editor" />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Profile Image URL</label>
            <div className="flex gap-2">
                <input name="img" required type="text" className="flex-1 bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="https://..." />
                <button type="button" className="px-4 bg-[#252a35] border border-gray-700 rounded-lg text-gray-300 hover:text-white"><UploadCloud size={20} /></button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Sort Order</label>
                <input name="sortOrder" type="number" defaultValue={0} className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
            </div>
            <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" id="isFounder" name="isFounder" className="w-5 h-5 rounded border-gray-700 bg-[#0f1115] text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="isFounder" className="text-sm text-gray-300 select-none cursor-pointer">Mark as Founder/Exec</label>
            </div>
        </div>

        <div className="pt-4">
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20">
                <Save size={18} /> Save Member
            </button>
        </div>

      </form>
    </div>
  );
}