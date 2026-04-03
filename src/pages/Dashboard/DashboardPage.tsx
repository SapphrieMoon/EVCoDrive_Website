import type { GroupByEnum } from "@/types/dashboard.type"
import { BookingCard } from "./_components/cards/booking-card"
import { RevenueCard } from "./_components/cards/revenue-card"
import { UserCard } from "./_components/cards/user-card"
import { VehicleCard } from "./_components/cards/vehicle-card"
import { ChartBarMixed } from "./_components/charts/bar-chart"
import { ChartLineLabel } from "./_components/charts/line-chart"
import dashboardQueries from "@/queries/dashboard.query"
import { useState, useMemo } from "react"
import { getRange } from "@/utils/date"

export default function DashboardPage() {
    const [groupBy, setGroupBy] = useState<GroupByEnum>("day")
    const { from, to } = useMemo(() => getRange(groupBy), [groupBy])
    const { data: overview } = dashboardQueries.useOverview()
    const { data: revenueChart } = dashboardQueries.useRevenueChart({
        From: from,
        To: to,
        GroupBy: groupBy,
    })
    const { data: bookingChart } = dashboardQueries.useBookingChart({
        From: from,
        To: to,
        GroupBy: groupBy,
    })
    const overviewData = overview?.data
    const revenueChartData = revenueChart?.data
    const bookingChartData = bookingChart?.data

    if (!overview) return null
    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                <UserCard data={overviewData} />
                <RevenueCard data={overviewData} />
                <BookingCard data={overviewData} />
                <VehicleCard data={overviewData} />
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 ">
                <ChartLineLabel
                    data={revenueChartData}
                    groupBy={groupBy}
                    onChangeGroupBy={setGroupBy} />
                <ChartBarMixed
                    data={bookingChartData}
                    groupBy={groupBy}
                    onChangeGroupBy={setGroupBy} />
            </div>
        </div>
    )
}