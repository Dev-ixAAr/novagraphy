import { createJob } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewJobPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/jobs" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Post New Job</h1>
            <p className="text-sm text-gray-400">Create a new job opening.</p>
        </div>
      </div>

      <form action={createJob} className="bg-[#161920] border border-gray-800 rounded-xl p-8 space-y-6">
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Job Title</label>
            <input name="title" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="e.g. 3D Animator" />
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Department</label>
                <input name="dept" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Design" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Type</label>
                <select name="type" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Location</label>
                <input name="location" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Remote / New York" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Salary Range</label>
                <input name="salary" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="$60k - $80k" />
            </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="active" name="active" defaultChecked className="w-5 h-5 rounded border-gray-700 bg-[#0f1115] text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="active" className="text-sm text-gray-300 select-none cursor-pointer">Immediately Active</label>
        </div>

        <div className="pt-4">
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20">
                <Save size={18} /> Publish Job
            </button>
        </div>

      </form>
    </div>
  );
}