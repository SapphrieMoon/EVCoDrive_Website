import { dashboardApi } from "@/apis/dashboard.api"
import { dashboardKey } from "@/constants/query-keys/dashboard.key"
import type { DashboardParams, TopVehicleParams } from "@/types/dashboard.type"
import { useQuery } from "@tanstack/react-query"

const dashboardQueries = {
    useOverview: (params?: DashboardParams) => {
        return useQuery({
            queryKey: dashboardKey.overview(params),
            queryFn: () => dashboardApi.getAdminDashboard(params),
        })
    },
    useRevenueChart: (params?: DashboardParams) => {
        return useQuery({
            queryKey: dashboardKey.revenueChart(params),
            queryFn: () => dashboardApi.getAdminRevenueChart(params),
        })
    },
    useBookingChart: (params?: DashboardParams) => {
        return useQuery({
            queryKey: dashboardKey.bookingChart(params),
            queryFn: () => dashboardApi.getAdminBookingChart(params),
        })
    },
    useTopVehicle: (params?: TopVehicleParams) => {
        return useQuery({
            queryKey: dashboardKey.topVehicle(params),
            queryFn: () => dashboardApi.getAdminTopVehicle(params),
            // placeholderData: (previousData) => previousData,
        })
    }
}

export default dashboardQueries