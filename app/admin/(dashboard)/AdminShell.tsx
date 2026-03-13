"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "./logout-action";
import type { UnreadCounts } from "@/app/actions/notifications";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Image as ImageIcon,
  Music,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  FileText,
} from "lucide-react";

const sidebarItems = [
  {
    category: "Main",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    category: "Store",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Packages", href: "/admin/packages", icon: Layers },
    ],
  },
  {
    category: "Portfolio",
    items: [
      { name: "Portfolios", href: "/admin/portfolio", icon: ImageIcon },
      { name: "MV Artworks", href: "/admin/mv-artworks", icon: Music },
    ],
  },
  {
    category: "Company",
    items: [
      { name: "Team Members", href: "/admin/team", icon: Users },
      { name: "Careers / Jobs", href: "/admin/jobs", icon: Briefcase },
      { name: "Applications", href: "/admin/applications", icon: FileText },
      { name: "Events", href: "/admin/events", icon: Calendar },
    ],
  },
  {
    category: "System",
    items: [
      { name: "Messages", href: "/admin/messages", icon: MessageSquare },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

// Map sidebar hrefs → which unread key to use for the badge
const badgeMap: Record<string, keyof UnreadCounts> = {
  "/admin/orders": "orders",
  "/admin/applications": "applications",
  "/admin/messages": "messages",
};

function NotificationBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function AdminShell({
  children,
  unreadCounts,
}: {
  children: React.ReactNode;
  unreadCounts: UnreadCounts;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-300 font-sans selection:bg-indigo-500/30">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#161920] border-b border-gray-800">
        <span className="text-xl font-bold text-white tracking-tight">
          NOVAGRAPHY.
        </span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-[#161920] border-r border-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white tracking-wider">
              NOVAGRAPHY<span className="text-indigo-500">.</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
            {sidebarItems.map((group) => (
              <div key={group.category}>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {group.category}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const badgeKey = badgeMap[item.href];
                    const badgeCount = badgeKey
                      ? unreadCounts[badgeKey]
                      : 0;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <item.icon size={18} />
                        {item.name}
                        <NotificationBadge count={badgeCount} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Admin Profile Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin User</p>
                <form action={logoutAdmin}>
                  <button
                    type="submit"
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Log out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0f1115] relative">
          {/* Overlay for mobile sidebar */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          <div className="p-6 lg:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
