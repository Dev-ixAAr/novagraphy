import { prisma } from '@/lib/prisma';
import MessageTable from './MessageTable';
import MarkAsReadEffect from '../MarkAsReadEffect';
import { markAllMessagesAsRead } from '@/app/actions/notifications';

export default async function MessagesPage() {
  const messages = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <MarkAsReadEffect action={markAllMessagesAsRead} />
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 text-sm mt-1">Inbox for contact form submissions.</p>
      </div>
      <MessageTable messages={messages} />
    </div>
  );
}