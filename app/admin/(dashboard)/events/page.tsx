import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash2, Calendar, MapPin, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { deleteEvent } from './actions';

export default async function EventsPage() {
  const events = await prisma.portfolioItem.findMany({
    where: { category: 'events' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">Events</h1>
            <p className="text-gray-400 text-sm mt-1">Workshops, exhibitions, and company events.</p>
        </div>
        <Link href="/admin/events/new" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
          <Plus size={18} /> Add Event
        </Link>
      </div>

      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Event Details</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Sort</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {events.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No events scheduled.</td></tr>
            ) : (
                events.map((event) => (
                <tr key={event.id} className="hover:bg-[#1c2029] transition-colors group">
                    <td className="px-6 py-4 w-24">
                        <div className="w-16 h-16 rounded-lg bg-[#0f1115] border border-gray-800 overflow-hidden flex items-center justify-center">
                            {event.image ? (
                                <Image src={event.image} alt={event.title} width={64} height={64} className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="text-gray-600 w-6 h-6" />
                            )}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <p className="font-medium text-white text-base">{event.title}</p>
                        <div className="flex flex-col gap-1 mt-1 text-xs text-gray-500">
                            {event.subtitle && <span className="flex items-center gap-1"><MapPin size={12} /> {event.subtitle}</span>}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        {event.date && <span className="flex items-center gap-1 text-xs text-gray-500"><Calendar size={12} /> {event.date}</span>}
                    </td>
                    <td className="px-6 py-4 text-white font-mono">{event.sortOrder}</td>
                    <td className="px-6 py-4 text-right">
                    <form action={deleteEvent.bind(null, event.id)}>
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