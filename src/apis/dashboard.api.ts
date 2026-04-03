import type { Overview } from "@/types/dashboard.type"
import http from "@/utils/http"

const DASHBOARD_URL = {
    ADMIN_DASHBOARD: "/admin/dashboard"
}

export const dashboardApi = {
    getAdminDashboard: async () =>
        await http.get<Overview>(`${DASHBOARD_URL.ADMIN_DASHBOARD}/overview`),
}