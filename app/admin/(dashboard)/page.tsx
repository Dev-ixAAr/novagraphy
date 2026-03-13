import { prisma } from "@/lib/prisma";
import {
  DollarSign,
  ShoppingCart,
  Package,
  MessageSquare,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { getRecentUnreadItems, getUnreadCounts } from "@/app/actions/notifications";
import ActivityFeed from "./ActivityFeed";

async function getStats() {
  const [orderCount, productCount, unreadCounts, totalRevenue] =
    await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      getUnreadCounts(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: "PAID" },
      }),
    ]);

  return {
    orderCount,
    productCount,
    unreadCounts,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentItems = await getRecentUnreadItems(10);

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Total Orders",
      value: stats.orderCount,
      icon: ShoppingCart,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Active Products",
      value: stats.productCount,
      icon: Package,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "New Messages",
      value: stats.unreadCounts.messages,
      icon: MessageSquare,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      title: "Unread Orders",
      value: stats.unreadCounts.orders,
      icon: ShoppingCart,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      title: "New Applications",
      value: stats.unreadCounts.applications,
      icon: Briefcase,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back to Novagraphy admin panel.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-[#161920] border border-gray-800 p-6 rounded-xl hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 font-medium">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-white mt-2">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <TrendingUp size={14} className="mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-medium mr-1">+2.4%</span>
              from last month
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <ActivityFeed items={recentItems} />
    </div>
  );
}