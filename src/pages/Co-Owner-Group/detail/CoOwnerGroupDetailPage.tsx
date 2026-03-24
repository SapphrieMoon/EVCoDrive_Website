import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import coOwnerGroupQueries from "@/queries/co-owner-group.query"
import { useParams } from "react-router-dom"
import { StatsOverview } from "./_components/stats-overview"
import { ShareUnitGrid } from "./_components/share-unit-grid"
import { Badge } from "@/components/ui/badge"
import type { ShareHolder } from "@/types/share-holder"
import { GroupStatusActions } from "./_components/status-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, FileText } from "lucide-react"

export default function CoOwnerGroupDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading } = coOwnerGroupQueries.useDetail(id as string)
    const group = data?.data.data

    if (isLoading) return <div className="p-8"><DetailSkeleton /></div>
    if (!group) return <div>Không tìm thấy dữ liệu</div>

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
                        <ShareUnitGrid id={group.coOwnerGroupId} />
                    </div>

                    {/* Cột phải: Thông tin mở rộng */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* 1. Card Tài liệu pháp lý */}
                        <div className="space-y-4">
                            <h3 className="font-bold flex items-center gap-2 uppercase tracking-tighter italic">
                                Tài liệu pháp lý
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {group.coOwnershipContractUrl ? (
                                    <a href={group.coOwnershipContractUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-2 border rounded-xl bg-card/50 hover:bg-card transition-colors group shadow-sm">
                                        <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border/50 relative">
                                            <img src={group.coOwnershipContractUrl} alt="Hợp đồng" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <ExternalLink className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-center leading-tight pt-1">Hợp đồng<br />Đồng sở hữu</span>
                                    </a>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-2 p-4 border border-dashed rounded-xl bg-muted/20 text-muted-foreground min-h-[120px]">
                                        <FileText className="h-6 w-6 opacity-50" />
                                        <span className="text-[10px] text-center">Chưa tải lên<br />Hợp đồng</span>
                                    </div>
                                )}

                                {group.vehicleRegistrationCertificateUrl ? (
                                    <a href={group.vehicleRegistrationCertificateUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-2 border rounded-xl bg-card/50 hover:bg-card transition-colors group shadow-sm">
                                        <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border/50 relative">
                                            <img src={group.vehicleRegistrationCertificateUrl} alt="Giấy đăng ký xe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <ExternalLink className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-center leading-tight pt-1">Giấy đăng ký<br />Phương tiện</span>
                                    </a>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-2 p-4 border border-dashed rounded-xl bg-muted/20 text-muted-foreground min-h-[120px]">
                                        <FileText className="h-6 w-6 opacity-50" />
                                        <span className="text-[10px] text-center">Chưa tải lên<br />Giấy tờ xe</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Danh sách cổ đông */}
                        <div className="space-y-4">
                            <h3 className="font-bold flex items-center gap-2 uppercase tracking-tighter italic">
                                Thành viên trong nhóm
                            </h3>
                            <div className="space-y-3">
                                {group.shareHolders.map((holder: ShareHolder) => (
                                    <div key={holder.memberId} className="flex items-center justify-between p-3 rounded-xl border bg-card/50 shadow-sm transition-all hover:bg-card">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-primary/20 shadow-sm">
                                                <AvatarImage src={holder.avatarUrl} alt={holder.memberName} className="object-cover" />
                                                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">
                                                    {holder.memberName?.charAt(0) || holder.memberEmail?.charAt(0) || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold truncate max-w-[150px]" title={holder.memberEmail}>
                                                    {holder.memberEmail}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground italic">
                                                    Sở hữu: {holder.ownedShares} suất
                                                </span>
                                            </div>
                                        </div>
                                        <Badge className="bg-primary/10 text-primary border-none text-[10px] px-2 py-0.5 font-bold">
                                            {holder.ownershipPercentage}%
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}