import { prisma } from '@/lib/prisma';
import ApplicationTable from './ApplicationTable';
import MarkAsReadEffect from '../MarkAsReadEffect';
import { markAllApplicationsAsRead } from '@/app/actions/notifications';

export default async function ApplicationsPage() {
  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <MarkAsReadEffect action={markAllApplicationsAsRead} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Applications</h1>
          <p className="text-gray-400 text-sm mt-1">
            Review and manage job applications.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {applications.length} Total
        </span>
      </div>
      <ApplicationTable applications={applications} />
    </div>
  );
}
