'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// ─── Types ──────────────────────────────────────────────────

export type NotificationItem = {
  id: string
  type: 'order' | 'application' | 'message'
  title: string
  description: string
  createdAt: Date
}

export type UnreadCounts = {
  orders: number
  applications: number
  messages: number
}

// ─── Read Counts ────────────────────────────────────────────

export async function getUnreadCounts(): Promise<UnreadCounts> {
  const [orders, applications, messages] = await Promise.all([
    prisma.order.count({ where: { isRead: false } }),
    prisma.jobApplication.count({ where: { isRead: false } }),
    prisma.contactSubmission.count({ where: { read: false } }),
  ])

  return { orders, applications, messages }
}

// ─── Recent Unread Items ────────────────────────────────────

export async function getRecentUnreadItems(
  limit: number = 10
): Promise<NotificationItem[]> {
  const [orders, applications, messages] = await Promise.all([
    prisma.order.findMany({
      where: { isRead: false },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        orderNumber: true,
        name: true,
        totalAmount: true,
        createdAt: true,
      },
    }),
    prisma.jobApplication.findMany({
      where: { isRead: false },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        jobTitle: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    }),
    prisma.contactSubmission.findMany({
      where: { read: false },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        subject: true,
        email: true,
        createdAt: true,
      },
    }),
  ])

  const items: NotificationItem[] = [
    ...orders.map((o) => ({
      id: o.id,
      type: 'order' as const,
      title: `New Order #${o.orderNumber.slice(-6).toUpperCase()}`,
      description: `${o.name} placed an order — $${o.totalAmount.toFixed(2)}`,
      createdAt: o.createdAt,
    })),
    ...applications.map((a) => ({
      id: a.id,
      type: 'application' as const,
      title: `New Application`,
      description: `${a.firstName} ${a.lastName} applied for ${a.jobTitle}`,
      createdAt: a.createdAt,
    })),
    ...messages.map((m) => ({
      id: m.id,
      type: 'message' as const,
      title: `New Message`,
      description: `${m.name} — ${m.subject || 'No subject'}`,
      createdAt: m.createdAt,
    })),
  ]

  // Sort all items by createdAt descending and take the top `limit`
  items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  return items.slice(0, limit)
}

// ─── Mark Individual Items as Read ──────────────────────────

export async function markOrderAsRead(id: string) {
  await prisma.order.update({
    where: { id },
    data: { isRead: true },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/orders')
}

export async function markApplicationAsRead(id: string) {
  await prisma.jobApplication.update({
    where: { id },
    data: { isRead: true },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/applications')
}

export async function markMessageAsRead(id: string) {
  await prisma.contactSubmission.update({
    where: { id },
    data: { read: true },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/messages')
}

// ─── Mark All as Read ───────────────────────────────────────

export async function markAllAsRead() {
  await Promise.all([
    prisma.order.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    }),
    prisma.jobApplication.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    }),
    prisma.contactSubmission.updateMany({
      where: { read: false },
      data: { read: true },
    }),
  ])
  revalidatePath('/admin')
  revalidatePath('/admin/orders')
  revalidatePath('/admin/applications')
  revalidatePath('/admin/messages')
}

// ─── Per-Category Bulk Mark as Read (for auto-clear on page visit) ───

export async function markAllOrdersAsRead() {
  await prisma.order.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/orders')
}

export async function markAllApplicationsAsRead() {
  await prisma.jobApplication.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/applications')
}

export async function markAllMessagesAsRead() {
  await prisma.contactSubmission.updateMany({
    where: { read: false },
    data: { read: true },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/messages')
}
