"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Package,
  AlertTriangle,
  BarChart3,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Reorder", href: "/admin/reorder", icon: AlertTriangle },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-30">
      <div className="px-6 py-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
