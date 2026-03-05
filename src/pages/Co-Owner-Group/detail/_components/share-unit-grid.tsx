import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { SHARE_UNIT_STATUS_MAPPING } from "@/constants/status/share-unit/share-unit-status"
import { cn } from "@/lib/utils"
import coOwnerGroupQueries from "@/queries/co-owner-group.query"
import type { ShareUnit, ShareUnitStatus } from "@/types/share-unit"
import { ShieldCheck, User } from "lucide-react"

export const ShareUnitGrid = ({ id }: { id: string }) => {
    const { data } = coOwnerGroupQueries.useDetail(id)
    const group = data?.data.data
    const units = group?.shareUnits as ShareUnit[]

    if (!group) return null

    return (
        <div className="space-y-4">
            <h3 className="font-bold flex items-center gap-2 uppercase tracking-tighter italic">
                Sơ đồ {units.length} cổ phần sở hữu
            </h3>

            {/* Grid 5x2 (5 cột, 2 hàng) rất cân đối */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {units?.map((unit) => {
                    const statusConfig = SHARE_UNIT_STATUS_MAPPING[unit.status as ShareUnitStatus]
                    return (
                        <HoverCard key={unit.shareUnitId}>
                            <HoverCardTrigger asChild>
                                <div className={cn(
                                    "h-24 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 gap-1 shadow-sm",
                                    statusConfig.color ? statusConfig.color : "bg-slate-100 border-slate-200 text-foreground"
                                )}>
                                    <span className="text-xs font-bold opacity-60 uppercase">Suất</span>
                                    <span className="text-2xl font-black leading-none">{unit.displayNumber}</span>
                                </div>
                            </HoverCardTrigger>

                            <HoverCardContent className="w-64 p-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm">Chi tiết suất #{unit.displayNumber}</h4>
                                        <Badge variant={statusConfig.variant} className="text-[10px]">{statusConfig.label}</Badge>
                                    </div>

                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground">Mã:</span>
                                            <span className="font-mono font-bold text-primary">{unit.certificateCode}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground">Chủ sở hữu:</span>
                                            <span className="font-medium">{unit.ownerName || "Đang trống"}</span>
                                        </div>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    )
                })}
            </div>
        </div>
    )
}