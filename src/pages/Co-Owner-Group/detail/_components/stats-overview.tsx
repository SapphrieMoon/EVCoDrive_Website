import { Card, CardContent } from "@/components/ui/card"
import type { CoOwnerGroupDetail } from "@/types/co-owner-group.type";
import { formatCurrency } from "@/utils/number";
import { Wallet, Users2, Car, Layers } from "lucide-react"

export const StatsOverview = ({ group }: { group: CoOwnerGroupDetail }) => {
    const totalValue = group.totalShares * group.sharePrice;

    const stats = [
        {
            label: "Tổng giá trị nhóm",
            value: formatCurrency(totalValue),
            icon: <Wallet className="h-4 w-4 text-emerald-500" />,
            description: "Dựa trên tổng suất sở hữu"
        },
        {
            label: "Giá mỗi gói đầu tư & sử dụng",
            value: formatCurrency(group.sharePrice),
            icon: <Layers className="h-4 w-4 text-blue-500" />,
            description: "Cố định theo hợp đồng"
        },
        {
            label: "Xe liên kết",
            value: group.vehicleLicensePlate,
            icon: <Car className="h-4 w-4 text-purple-500" />,
            description: "Biển số xe đồng sở hữu"
        },
        {
            label: "Số thành viên trong nhóm",
            value: `${group.shareHolders.length}`,
            icon: <Users2 className="h-4 w-4 text-amber-500" />,
            description: "Số thành viên hiện tại"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <Card key={i} className="border-none shadow-sm bg-card/50 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                            {stat.icon}
                        </div>
                        <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                        <p className="text-[10px] text-muted-foreground mt-1 italic">{stat.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}