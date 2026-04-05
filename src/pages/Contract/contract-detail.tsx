import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Hash, Info, User, FileText, Download, CheckCircle2 } from "lucide-react"
import contractQueries from "@/queries/contract.query"
import { formatDate } from "@/utils/date"
import type { BaseDetailProps } from "@/types/commons/dialog.type"
import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Button } from "@/components/ui/button"

export function ContractDetail({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = contractQueries.useDetail(id as string)
    const { mutateAsync: getPDF } = contractQueries.useGetPDF()

    // Parse ra biến contract cho dễ sử dụng
    const contract = data?.data?.data;

    const handleDownloadPdf = () => {
        if (!contract) return;
        getPDF(contract.contractId)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            {/* Đặt layout flex để nội dung có thể cuộn mà footer vẫn dính ở dưới */}
            <SheetContent className="sm:max-w-md w-full flex flex-col p-6">
                <SheetHeader className="border-b pb-4 shrink-0">
                    <SheetTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Chi tiết Hợp đồng
                    </SheetTitle>
                    <SheetDescription className="break-all">
                        {contract?.contractNumber || "Đang tải tệp..."}
                    </SheetDescription>
                </SheetHeader>

                {/* Info Section - Scrollable content area */}
                <div className="flex-1 overflow-y-auto py-4 min-h-0 custom-scrollbar pr-2">
                    {isLoading ? (
                        <DetailSkeleton />
                    ) : contract ? (
                        <div className="space-y-6">
                            {/* General Title Info */}
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold leading-tight">{contract.title}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge variant="outline">{contract.contractTypeName}</Badge>
                                    <Badge variant={contract.contractStatuses === "Completed" ? "default" : "secondary"}>
                                        {contract.contractStatuses === "Completed" ? "Hoàn thành" : contract.contractStatuses}
                                    </Badge>
                                </div>
                                {contract.description && (
                                    <p className="text-sm text-muted-foreground mt-3 italic">
                                        {contract.description}
                                    </p>
                                )}
                            </div>

                            <hr className="border-dashed" />

                            {/* Details List */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 rounded-lg border bg-card p-3 shadow-sm">
                                    <Hash className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="space-y-1 overflow-hidden">
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Mã hợp đồng (ID)</p>
                                        <p className="text-sm font-mono truncate">{contract.contractId}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-lg border p-3">
                                    <User className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="space-y-1 flex-1 overflow-hidden">
                                        <p className="text-xs font-medium text-primary uppercase">Đại diện Bên A</p>
                                        <p className="text-sm font-medium">{contract.partyAName}</p>
                                        {contract.partyAEmail && <p className="text-xs text-muted-foreground truncate">{contract.partyAEmail}</p>}
                                        {contract.partyAVerifiedAt ? (
                                            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Đã xác thực ({formatDate(contract.partyAVerifiedAt)})
                                            </p>
                                        ) : (
                                            <p className="text-xs text-amber-600 mt-1">Chưa xác thực</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-lg border p-3">
                                    <User className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="space-y-1 flex-1 overflow-hidden">
                                        <p className="text-xs font-medium text-primary uppercase">Đại diện Bên B</p>
                                        <p className="text-sm font-medium">{contract.partyBName || "N/A"}</p>
                                        {contract.partyBEmail && <p className="text-xs text-muted-foreground truncate">{contract.partyBEmail}</p>}
                                        {contract.partyBVerifiedAt ? (
                                            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Đã xác thực ({formatDate(contract.partyBVerifiedAt)})
                                            </p>
                                        ) : (
                                            <p className="text-xs text-amber-600 mt-1">Chưa xác thực</p>
                                        )}
                                    </div>
                                </div>

                                {contract.vehicleModelName && (
                                    <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-3">
                                        <Info className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Phương tiện liên kết</p>
                                            <p className="text-sm font-medium">{contract.vehicleModelName}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1 rounded-lg border p-3">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground mb-1" />
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Ngày ký</p>
                                        <p className="text-sm">{contract.signedDate ? formatDate(contract.signedDate) : "Chưa ký"}</p>
                                    </div>

                                    <div className="flex flex-col gap-1 rounded-lg border p-3">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground mb-1" />
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Khởi tạo tạo</p>
                                        <p className="text-sm">{formatDate(contract.createdDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-40 items-center justify-center">
                            <p className="text-sm text-muted-foreground">Không tìm thấy thông tin hợp đồng</p>
                        </div>
                    )}
                </div>

                {/* Footer Section with Download Button */}
                <SheetFooter className="border-t pt-4 shrink-0 flex items-center mt-2">
                    <Button
                        disabled={isLoading || !contract}
                        onClick={handleDownloadPdf}
                        className="w-full flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Tải thông tin PDF hợp đồng
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
