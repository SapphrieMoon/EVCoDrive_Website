import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { adminSidebar, operatorSidebar, staffSidebar } from "@/configs/sidebar.config"
import type { User } from "@/types/user.type"
import { getProfileFromLocalStorage } from "@/utils/auth"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
  const user: User | null = getProfileFromLocalStorage();
  const sidebarItems =
    user?.role === "Admin"
      ? adminSidebar
      : user?.role === "Staff"
        ? staffSidebar
        : user?.role === "Operator"
          ? operatorSidebar
          : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed layers */}
      <Sidebar items={sidebarItems} />
      <Header />

      {/* Main content */}
      <main className="ml-64 pt-14 p-4">
        <Outlet />
      </main>
    </div>
  )
}