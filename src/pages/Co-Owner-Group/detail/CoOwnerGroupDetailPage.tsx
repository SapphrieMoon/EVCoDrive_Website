import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import coOwnerGroupQueries from "@/queries/co-owner-group.query"
import { useParams } from "react-router-dom"
import { StatsOverview } from "./_components/stats-overview"
import { ShareUnitGrid } from "./_components/share-unit-grid"
import { Badge } from "@/components/ui/badge"
import type { ShareHolder } from "@/types/share-holder"
import { cn } from "@/lib/utils"
import { GroupStatusActions } from "./_components/status-actions"

export default function CoOwnerGroupDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading } = coOwnerGroupQueries.useDetail(id as string)
    const group = data?.data.data

    if (isLoading) return <div className="p-8"><DetailSkeleton /></div>
    if (!group) return <div>Không tìm thấy dữ liệu</div>

    const isActive = group.status === "Active";

    return (
        <ScrollArea className="h-full">
            <div className="p-6 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-4">
                        {/* Bên trái: Tên nhóm */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-primary leading-tight">
                                {group.groupName}
                            </h2>
                            <p className="text-sm text-muted-foreground">{group.description}</p>
                        </div>

                        {/* Bên phải: Badge trạng thái */}
                        <GroupStatusActions id={id as string} />
                    </div>
                </div>

                {/* 1. Các thẻ thống kê */}
                <StatsOverview group={group} />

                {/* 2. Content Grid chính */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cột trái: Sơ đồ cổ phần */}
                    <div className="lg:col-span-8 bg-card/30 p-6 rounded-2xl border border-dashed">
                        <ShareUnitGrid units={group.shareUnits} />
                    </div>

                    {/* Cột phải: Danh sách cổ đông (Bạn có thể viết thêm component này sau) */}
                    <div className="lg:col-span-4 space-y-4">
                        <h3 className="font-bold flex items-center gap-2 uppercase tracking-tighter italic">
                            Thành viên trong nhóm
                        </h3>
                        <div className="space-y-3">
                            {group.shareHolders.map((holder: ShareHolder) => (
                                <div key={holder.shareHolderId} className="flex items-center justify-between p-3 rounded-xl border bg-card/50">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold truncate max-w-[150px]">{holder.memberEmail}</span>
                                        <span className="text-[10px] text-muted-foreground italic">Sở hữu: {holder.ownedShares} suất</span>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-none text-[10px]">
                                        {holder.ownershipPercentage}%
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}