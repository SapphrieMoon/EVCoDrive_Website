import type { DashboardParams } from "@/types/dashboard.type";

export const dashboardKey = {
    overview: (params?: DashboardParams) => ["dashboard", "overview", params],
    revenueChart: (params?: DashboardParams) => ["dashboard", "revenue-chart", params],
    bookingChart: (params?: DashboardParams) => ["dashboard", "booking-chart", params],
}