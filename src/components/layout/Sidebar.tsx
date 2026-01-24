import type { SidebarItem } from "@/types/sidebar.type";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ items }: { items: SidebarItem[] }) => {
    return (
        <aside className="
        fixed left-0 top-0 z-50
        h-screen
        w-64
        bg-sidebar
        text-sidebar-foreground
        border-r border-sidebar-border
        flex flex-col
        "
        >

            {/* Logo */}
            <div className="h-14 flex items-center px-6 font-semibold text-lg border-l-b border-sidebar-border">
                EVCodrive
            </div>

            {/* Menu items */}
            <div className="flex-1 p-4 overflow-y-auto">
                {items.map((group) => (
                    <div key={group.label} className="mb-12 mt-6">
                        {/* Group title */}
                        <p className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">
                            {group.label}
                        </p>

                        {/* Group items */}
                        <div className="space-y-2 pt-2">
                            {group.children?.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path!}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 rounded-md px-6 py-2 text-sm transition-colors
                    ${isActive
                                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                            : "hover:bg-sidebar-accent/60"
                                        }`
                                    }
                                >
                                    {item.icon && <span className="text-base">{item.icon}</span>}
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
