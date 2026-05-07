import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { adminSidebar, operatorSidebar, staffSidebar } from "@/configs/sidebar.config"
import type { User } from "@/types/user.type"
import { getProfileFromLocalStorage } from "@/utils/auth"
import { Outlet, useLocation, Navigate } from "react-router-dom"
import path from "@/constants/path"
import type { SidebarItem } from "@/types/commons/sidebar.type"

const getAllowedPaths = (items: SidebarItem[]): string[] => {
  let paths: string[] = [];
  items.forEach(item => {
    if (item.path) paths.push(item.path);
    if (item.children) paths = paths.concat(getAllowedPaths(item.children));
  });
  return paths;
};

export const MainLayout = () => {
  const user: User | null = getProfileFromLocalStorage();
  const location = useLocation();

  const sidebarItems =
    user?.role === "Admin"
      ? adminSidebar
      : user?.role === "Staff"
        ? staffSidebar
        : user?.role === "Operator"
          ? operatorSidebar
          : adminSidebar;

  const allowedBasePaths = getAllowedPaths(sidebarItems);

  // Các đường dẫn mà ai cũng có quyền truy cập (nếu đã login)
  const globallyAllowedPaths: string[] = [path.profile];

  // Kiểm tra xem pathname hiện tại có hợp lệ không
  // Hợp lệ nếu khớp chính xác base path, hoặc là route con của base path (VD: /vehicles/123)
  const isAllowed =
    location.pathname === "/" ||
    globallyAllowedPaths.includes(location.pathname) ||
    allowedBasePaths.some(p => location.pathname === p || location.pathname.startsWith(`${p}/`));

  // Nếu không có quyền, redirect về trang đầu tiên trong sidebar
  if (!isAllowed && allowedBasePaths.length > 0) {
    return <Navigate to={allowedBasePaths[0]} replace />;
  }

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