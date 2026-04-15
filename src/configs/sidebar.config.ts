import path from "@/constants/path";
import type { SidebarItem } from "@/types/commons/sidebar.type";

export const adminSidebar: SidebarItem[] = [
    {
        label: "Quản lý chung",
        children: [
            { label: "Tổng quan hệ thống", path: path.dashboard },
            { label: "Nhóm đồng sở hữu", path: path.coOwnerGroup },
            { label: "Hợp đồng", path: path.contract },
            { label: "Trạm kiểm tra", path: path.station },
            { label: "Loại chi phí phạt", path: path.extraFeeType },
            { label: "Loại chi phí phát sinh", path: path.expenseFeeType },
        ],
    },
    {
        label: "Quản lý tài khoản",
        children: [
            { label: "Thành viên", path: path.member },
            { label: "Nhân viên điều hành trạm", path: path.operator },
            { label: "Nhân viên", path: path.staff },
        ]
    },
    {
        label: "Quản lý xe",
        children: [
            { label: "Xe đăng ký", path: path.vehicle },    // Vehicle
            { label: "Hãng xe", path: path.vehicleBrand },   // VehicleBrand
            { label: "Dòng xe", path: path.vehicleModel },   // VehicleModel
        ],
    },
    {
        label: "Quản lý vận hành",
        children: [
            { label: "Quản lý đặt xe", path: path.booking },
            { label: "Quản lý biểu quyết", path: path.expenseFee },
            { label: "Quản lý hóa đơn", path: path.invoice },
            { label: "Quản lý rút tiền", path: path.withdraw },
        ],
    },
]

export const staffSidebar: SidebarItem[] = [
    { label: "Tài khoản", path: "/accounts" },
    { label: "Đơn hàng", path: "/orders" },

]

export const operatorSidebar: SidebarItem[] = [
    {
        label: "Quản lý xe",
        children: [
            { label: "Nhóm đồng sở hữu", path: path.coOwnerGroup },
            { label: "Xe đăng ký", path: path.vehicle },
            // { label: "Hợp đồng", path: path.contract },
        ]
    },
    {
        label: "Vận hành",
        children: [
            { label: "Quản lý đặt xe", path: path.booking },
            { label: "Chi phí", path: path.expenseFee },
        ]
    },
]
