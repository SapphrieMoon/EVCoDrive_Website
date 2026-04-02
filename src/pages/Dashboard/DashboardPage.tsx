import { BookingCard } from "./_components/cards/booking-card"
import { RevenueCard } from "./_components/cards/revenue-card"
import { UserCard } from "./_components/cards/user-card"
import { VehicleCard } from "./_components/cards/vehicle-card"
import { ChartBarMixed } from "./_components/charts/bar-chart"
import { ChartLineLabel } from "./_components/charts/line-chart"

const data = {
    totalUsers: 12,
    activeUsers: 10,
    totalVehicles: 26,
    activeVehicles: 0,
    totalRevenue: 2423000,
    totalTransactions: 164,
    totalBookings: 38,
    growth: {
        usersPercent: 100,
        revenuePercent: 100,
        bookingsPercent: 100
    }
}


export default function DashboardPage() {
    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                <UserCard data={data} />
                <RevenueCard data={data} />
                <BookingCard data={data} />
                <VehicleCard data={data} />
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 ">
                <ChartLineLabel />
                <ChartBarMixed />
            </div>
        </div>
    )
}