import type { ChartData, DashboardParams, Overview, TopVehicleList, TopVehicleParams } from "@/types/dashboard.type"
import http from "@/utils/http"

const DASHBOARD_URL = {
    ADMIN_DASHBOARD: "/admin/dashboard"
}

export const dashboardApi = {
    getAdminDashboard: async (params?: DashboardParams) =>
        await http.get<Overview>(`${DASHBOARD_URL.ADMIN_DASHBOARD}/overview`, { params }),
    getAdminRevenueChart: async (params?: DashboardParams) =>
        await http.get<ChartData[]>(`${DASHBOARD_URL.ADMIN_DASHBOARD}/revenue-chart`, { params }),
    getAdminBookingChart: async (params?: DashboardParams) =>
        await http.get<ChartData[]>(`${DASHBOARD_URL.ADMIN_DASHBOARD}/booking-chart`, { params }),
    getAdminTopVehicle: async (params?: TopVehicleParams) =>
        await http.get<TopVehicleList[]>(`${DASHBOARD_URL.ADMIN_DASHBOARD}/top-vehicles`, { params }),
}