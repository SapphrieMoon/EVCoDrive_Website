import { dashboardApi } from "@/apis/dashboard.api"
import { dashboardKey } from "@/constants/query-keys/dashboard.key"
import { useQuery } from "@tanstack/react-query"

const dashboardQueries = {
    useOverview: () => {
        return useQuery({
            queryKey: dashboardKey.overview(),
            queryFn: dashboardApi.getAdminDashboard,
            placeholderData: (previousData) => previousData,
        })
    }
}

export default dashboardQueries