import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { deleteJob } from './actions';

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">Careers / Jobs</h1>
            <p className="text-gray-400 text-sm mt-1">Manage open positions and listings.</p>
        </div>
        <Link href="/admin/jobs/new" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
          <Plus size={18} /> Add Job
        </Link>
      </div>

      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Type/Loc</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {jobs.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No active job listings.</td></tr>
            ) : (
                jobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#1c2029] transition-colors group">
                    <td className="px-6 py-4">
                        <p className="font-medium text-white text-base">{job.title}</p>
                        <p className="text-xs text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">{job.dept}</td>
                    <td className="px-6 py-4 text-gray-300">
                        <div className="flex flex-col">
                            <span>{job.type}</span>
                            <span className="text-xs text-gray-500">{job.location}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{job.salary}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${job.active ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                            {job.active ? 'Active' : 'Closed'}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                    <form action={deleteJob.bind(null, job.id)}>
                        <button className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"><Trash2 size={16} /></button>
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