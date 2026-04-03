import type { TopVehicleList as TopVehicleItem } from "@/types/dashboard.type"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Car } from "lucide-react"

const RANK_COLORS = [
    { bg: "bg-amber-500/15", text: "text-amber-500", border: "border-amber-500/30" },
    { bg: "bg-slate-400/15", text: "text-slate-400", border: "border-slate-400/30" },
    { bg: "bg-orange-500/15", text: "text-orange-500", border: "border-orange-500/30" },
]

export function TopVehicleList({
    data,
    limit,
    setLimit,
}: {
    data?: TopVehicleItem[]
    limit: number
    setLimit: (limit: number) => void
}) {
    if (!data) return null

    const maxUsage = data[0]?.usageCount ?? 1

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                    <CardTitle>Top Phương Tiện</CardTitle>
                    <CardDescription>
                        Phương tiện được sử dụng nhiều nhất
                    </CardDescription>
                </div>
                <Select
                    value={String(limit)}
                    onValueChange={(v) => setLimit(Number(v))}
                >
                    <SelectTrigger className="w-[80px] h-8 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">Top 5</SelectItem>
                        <SelectItem value="7">Top 7</SelectItem>
                        <SelectItem value="10">Top 10</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
                        <Car className="size-8 opacity-40" />
                        <p className="text-sm">Không có dữ liệu</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {data.map((vehicle, index) => {
                            const rank = index + 1
                            const rankStyle = RANK_COLORS[index] ?? {
                                bg: "bg-muted/40",
                                text: "text-muted-foreground",
                                border: "border-muted",
                            }
                            const percent = Math.round((vehicle.usageCount / maxUsage) * 100)

                            return (
                                <li key={`${vehicle.brand}-${vehicle.model}`} className="flex items-center gap-3">
                                    {/* Rank badge */}
                                    <span
                                        className={`flex items-center justify-center size-7 rounded-full text-xs font-bold border shrink-0 ${rankStyle.bg} ${rankStyle.text} ${rankStyle.border}`}
                                    >
                                        {rank}
                                    </span>

                                    {/* Info + progress */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-sm font-medium truncate">
                                                    {vehicle.model}
                                                </span>
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                                                    {vehicle.brand}
                                                </Badge>
                                            </div>
                                            <span className="text-xs font-semibold tabular-nums ml-2 shrink-0 text-muted-foreground">
                                                {vehicle.usageCount} chuyến
                                            </span>
                                        </div>
                                        {/* Progress bar */}
                                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-primary transition-all duration-500"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}