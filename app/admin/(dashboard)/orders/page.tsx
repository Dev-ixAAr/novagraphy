import { prisma } from '@/lib/prisma';
import OrderTable from './OrderTable';
import MarkAsReadEffect from '../MarkAsReadEffect';
import { markAllOrdersAsRead } from '@/app/actions/notifications';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <MarkAsReadEffect action={markAllOrdersAsRead} />
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">Manage customer orders and status.</p>
      </div>
      <OrderTable orders={orders} />
    </div>
  );
}