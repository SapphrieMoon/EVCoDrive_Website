import { dashboardApi } from "@/apis/dashboard.api"
import { dashboardKey } from "@/constants/query-keys/dashboard.key"
import type { DashboardParams } from "@/types/dashboard.type"
import { useQuery } from "@tanstack/react-query"

const dashboardQueries = {
    useOverview: (params?: DashboardParams) => {
        return useQuery({
            queryKey: dashboardKey.overview(params),
            queryFn: () => dashboardApi.getAdminDashboard(params),
            placeholderData: (previousData) => previousData,
        })
    },
    useRevenueChart: (params?: DashboardParams) => {
        return useQuery({
            queryKey: dashboardKey.revenueChart(params),
            queryFn: () => dashboardApi.getAdminRevenueChart(params),
            placeholderData: (previousData) => previousData,
        })
    },
    useBookingChart: (params?: DashboardParams) => {
        return useQuery({
            queryKey: dashboardKey.bookingChart(params),
            queryFn: () => dashboardApi.getAdminBookingChart(params),
            placeholderData: (previousData) => previousData,
        })
    }
}

export default dashboardQueries