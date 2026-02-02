export type SidebarItem = {
    label: string;
    path?: string,
    icon?: React.ReactNode;
    children?: SidebarItem[];
}