import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash2, User, Star } from 'lucide-react';
import { deleteTeamMember } from './actions';

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">Team Members</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your company personnel and roles.</p>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} />
          Add Member
        </Link>
      </div>

      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-center">Founder</th>
              <th className="px-6 py-4">Sort Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {members.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No team members found.</td></tr>
            ) : (
                members.map((member) => (
                <tr key={member.id} className="hover:bg-[#1c2029] transition-colors group">
                    <td className="px-6 py-4 w-20">
                    <div className="w-12 h-12 rounded-full bg-[#0f1115] border border-gray-800 overflow-hidden flex items-center justify-center">
                        {member.img ? (
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                        <User className="text-gray-600 w-5 h-5" />
                        )}
                    </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{member.name}</td>
                    <td className="px-6 py-4 text-gray-300">{member.role}</td>
                    <td className="px-6 py-4 text-center">
                        {member.isFounder && <Star size={16} className="text-yellow-500 fill-yellow-500 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono">{member.sortOrder}</td>
                    <td className="px-6 py-4 text-right">
                    <form action={deleteTeamMember.bind(null, member.id)}>
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