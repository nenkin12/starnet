"use client";

import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <SessionProvider>
      {isLogin ? (
        children
      ) : (
        <div className="min-h-screen bg-gray-50">
          <AdminSidebar />
          <div className="ml-64 p-8">{children}</div>
        </div>
      )}
    </SessionProvider>
  );
}
