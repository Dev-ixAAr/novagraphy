"use client";

import { useState, useTransition } from "react";
import {
  ShoppingCart,
  Briefcase,
  Mail,
  Check,
  CheckCheck,
  Clock,
  Loader2,
} from "lucide-react";
import type { NotificationItem } from "@/app/actions/notifications";
import {
  markOrderAsRead,
  markApplicationAsRead,
  markMessageAsRead,
  markAllAsRead,
} from "@/app/actions/notifications";

const typeConfig = {
  order: {
    icon: ShoppingCart,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-l-indigo-500",
    label: "Order",
  },
  application: {
    icon: Briefcase,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-l-amber-500",
    label: "Application",
  },
  message: {
    icon: Mail,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-l-rose-500",
    label: "Message",
  },
};

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(date).toLocaleDateString();
}

export default function ActivityFeed({
  items: initialItems,
}: {
  items: NotificationItem[];
}) {
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();
  const [dismissingId, setDismissingId] = useState<string | null>(null);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const handleMarkAsRead = (item: NotificationItem) => {
    setDismissingId(item.id);
    startTransition(async () => {
      if (item.type === "order") await markOrderAsRead(item.id);
      else if (item.type === "application") await markApplicationAsRead(item.id);
      else await markMessageAsRead(item.id);

      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setDismissingId(null);
    });
  };

  const handleMarkAllAsRead = () => {
    setIsMarkingAll(true);
    startTransition(async () => {
      await markAllAsRead();
      setItems([]);
      setIsMarkingAll(false);
    });
  };

  return (
    <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10">
            <Clock size={18} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <p className="text-xs text-gray-500">
              {items.length} unread notification{items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll || isPending}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isMarkingAll ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CheckCheck size={14} />
            )}
            Mark All Read
          </button>
        )}
      </div>

      {/* Feed Items */}
      <div className="divide-y divide-gray-800/60">
        {items.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
              <Check size={24} className="text-emerald-400" />
            </div>
            <p className="text-gray-400 font-medium">All caught up!</p>
            <p className="text-gray-600 text-sm mt-1">
              No unread notifications.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            const isDismissing = dismissingId === item.id;

            return (
              <div
                key={`${item.type}-${item.id}`}
                className={`flex items-start gap-4 px-6 py-4 border-l-2 ${config.border} hover:bg-white/[0.02] transition-all ${isDismissing ? "opacity-50" : "opacity-100"}`}
              >
                {/* Icon */}
                <div className={`p-2.5 rounded-lg ${config.bg} mt-0.5 shrink-0`}>
                  <Icon size={16} className={config.color} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${config.color}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-600 text-[10px]">
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>

                {/* Mark as Read Button */}
                <button
                  onClick={() => handleMarkAsRead(item)}
                  disabled={isDismissing || isPending}
                  className="shrink-0 p-2 rounded-lg text-gray-600 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all disabled:opacity-50 cursor-pointer"
                  title="Mark as read"
                >
                  {isDismissing ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Check size={16} />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
