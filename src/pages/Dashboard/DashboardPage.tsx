import { BookingCard } from "./_components/cards/booking-card"
import { RevenueCard } from "./_components/cards/revenue-card"
import { UserCard } from "./_components/cards/user-card"
import { VehicleCard } from "./_components/cards/vehicle-card"
import { ChartBarMixed } from "./_components/charts/bar-chart"
import { ChartLineLabel } from "./_components/charts/line-chart"
import dashboardQueries from "@/queries/dashboard.query"
import { useState, useMemo } from "react"
import { getPeriodRange, PERIOD_OPTIONS, getRange, type PeriodEnum } from "@/utils/date"
import type { GroupByEnum } from "@/types/dashboard.type"
import { TopVehicleList } from "./_components/top-vehicle-list"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import { LayoutDashboard } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function DashboardPage() {
    // Filter cho overview cards
    const [period, setPeriod] = useState<PeriodEnum>("month")
    // Filter cho charts
    const [groupBy, setGroupBy] = useState<GroupByEnum>("day")
    const [limit, setLimit] = useState(5)

    const { from: cardFrom, to: cardTo } = useMemo(() => getPeriodRange(period), [period])
    const { from: chartFrom, to: chartTo } = useMemo(() => getRange(groupBy) ?? { from: "", to: "" }, [groupBy])

    const { data: overview } = dashboardQueries.useOverview({ From: cardFrom, To: cardTo })
    const { data: revenueChart } = dashboardQueries.useRevenueChart({ From: chartFrom, To: chartTo, GroupBy: groupBy })
    const { data: bookingChart } = dashboardQueries.useBookingChart({ From: chartFrom, To: chartTo, GroupBy: groupBy })
    const { data: topVehicle } = dashboardQueries.useTopVehicle({ From: chartFrom, To: chartTo, Limit: limit })

    const overviewData = overview?.data
    const revenueChartData = revenueChart?.data
    const bookingChartData = bookingChart?.data
    const topVehicleData = topVehicle?.data

    if (!overview) return null

    const today = dayjs().format("dddd, DD/MM/YYYY")

    return (
        <div className="p-4 flex flex-col gap-6">
            {/* Page header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-xl font-bold">Tổng quan hệ thống</h1>
                    <p className="text-xs text-muted-foreground capitalize">{today}</p>
                </div>
            </div>

            {/* Overview cards */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Thống kê tổng quan</p>
                    {/* Period tabs */}
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border w-fit">
                        {PERIOD_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setPeriod(opt.value)}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                                    period === opt.value
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <UserCard data={overviewData} />
                    <RevenueCard data={overviewData} />
                    <BookingCard data={overviewData} />
                    <VehicleCard data={overviewData} />
                </div>
            </div>

            {/* Charts */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Biểu đồ thống kê</p>
                    <Select value={groupBy} onValueChange={(v) => setGroupBy(v as GroupByEnum)}>
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Theo ngày</SelectItem>
                            <SelectItem value="week">Theo tuần</SelectItem>
                            <SelectItem value="month">Theo tháng</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
                    <ChartLineLabel data={revenueChartData} groupBy={groupBy} />
                    <ChartBarMixed data={bookingChartData} groupBy={groupBy} />
                    <TopVehicleList data={topVehicleData} limit={limit} setLimit={setLimit} />
                </div>
            </div>
        </div>
    )
}