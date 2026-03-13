import { getUnreadCounts } from "@/app/actions/notifications";
import AdminShell from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const unreadCounts = await getUnreadCounts();

  return (
    <AdminShell unreadCounts={unreadCounts}>
      {children}
    </AdminShell>
  );
}