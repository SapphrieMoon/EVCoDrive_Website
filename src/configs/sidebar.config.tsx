import path from "@/constants/path";
import type { SidebarItem } from "@/types/commons/sidebar.type";
import {
    Activity,
    Banknote,
    Building2,
    CalendarDays,
    Car,
    CarFront,
    CarTaxiFront,
    ClipboardList,
    FileSignature,
    FileSpreadsheet,
    LayoutDashboard,
    PieChart,
    Receipt,
    Settings2,
    Tags,
    User,
    UserCog,
    UserSquare2,
    Users,
    WalletCards,
    Briefcase
} from "lucide-react";

export const adminSidebar: SidebarItem[] = [
    {
        label: "Quản lý chung",
        icon: <LayoutDashboard size={20} />,
        children: [
            { label: "Tổng quan hệ thống", path: path.dashboard, icon: <PieChart size={20} /> },
            { label: "Nhóm đồng sở hữu", path: path.coOwnerGroup, icon: <Users size={20} /> },
            { label: "Hợp đồng", path: path.contract, icon: <FileSignature size={20} /> },
            { label: "Trạm kiểm tra", path: path.station, icon: <Building2 size={20} /> },
            { label: "Loại chi phí phạt", path: path.extraFeeType, icon: <WalletCards size={20} /> },
            { label: "Loại chi phí phát sinh", path: path.expenseFeeType, icon: <Tags size={20} /> },
        ],
    },
    {
        label: "Quản lý tài khoản",
        icon: <UserSquare2 size={20} />,
        children: [
            { label: "Thành viên", path: path.member, icon: <User size={20} /> },
            { label: "Nhân viên điều hành trạm", path: path.operator, icon: <UserCog size={20} /> },
            { label: "Nhân viên", path: path.staff, icon: <Briefcase size={20} /> },
        ]
    },
    {
        label: "Quản lý xe",
        icon: <CarTaxiFront size={20} />,
        children: [
            { label: "Xe đăng ký", path: path.vehicle, icon: <Car size={20} /> },    // Vehicle
            { label: "Hãng xe", path: path.vehicleBrand, icon: <CarFront size={20} /> },   // VehicleBrand
            { label: "Dòng xe", path: path.vehicleModel, icon: <Settings2 size={20} /> },   // VehicleModel
        ],
    },
    {
        label: "Quản lý vận hành",
        icon: <Activity size={20} />,
        children: [
            { label: "Quản lý đặt xe", path: path.booking, icon: <CalendarDays size={20} /> },
            { label: "Quản lý chi phí phát sinh", path: path.expenseFee, icon: <Receipt size={20} /> },
            { label: "Quản lý hóa đơn", path: path.invoice, icon: <FileSpreadsheet size={20} /> },
            { label: "Quản lý rút tiền", path: path.withdraw, icon: <Banknote size={20} /> },
        ],
    },
]

export const staffSidebar: SidebarItem[] = [
    { label: "Tài khoản", path: "/accounts", icon: <User size={20} /> },
    { label: "Đơn hàng", path: "/orders", icon: <ClipboardList size={20} /> },

]

export const operatorSidebar: SidebarItem[] = [
    {
        label: "Quản lý xe",
        icon: <CarTaxiFront size={20} />,
        children: [
            { label: "Nhóm đồng sở hữu", path: path.coOwnerGroup, icon: <Users size={20} /> },
            { label: "Xe đăng ký", path: path.vehicle, icon: <Car size={20} /> },
            // { label: "Hợp đồng", path: path.contract },
        ]
    },
    {
        label: "Vận hành",
        icon: <Activity size={20} />,
        children: [
            { label: "Quản lý đặt xe", path: path.booking, icon: <CalendarDays size={20} /> },
            { label: "Quản lý chi phí phát sinh", path: path.expenseFee, icon: <Receipt size={20} /> },
        ]
    },
]
