import { BookingCard } from "./_components/cards/booking-card"
import { RevenueCard } from "./_components/cards/revenue-card"
import { UserCard } from "./_components/cards/user-card"
import { VehicleCard } from "./_components/cards/vehicle-card"
import { ChartBarMixed } from "./_components/charts/bar-chart"
import { ChartLineLabel } from "./_components/charts/line-chart"
import dashboardQueries from "@/queries/dashboard.query"

export default function DashboardPage() {
    const { data } = dashboardQueries.useOverview()
    const overview = data?.data

    if (!overview) return null
    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                <UserCard data={overview} />
                <RevenueCard data={overview} />
                <BookingCard data={overview} />
                <VehicleCard data={overview} />
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 ">
                <ChartLineLabel />
                <ChartBarMixed />
            </div>
        </div>
    )
}