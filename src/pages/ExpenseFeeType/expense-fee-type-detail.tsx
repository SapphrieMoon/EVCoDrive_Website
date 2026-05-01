import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { expenseFeeTypeQueries } from "@/queries/expense-fee.query"
import type { BaseDetailProps } from "@/types/commons/dialog.type"
import { CalendarDays, Hash, Activity, Tag, AlignLeft } from "lucide-react"
import { format } from "date-fns"

export function ExpenseFeeTypeDetail({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = expenseFeeTypeQueries.useDetail(id as string)
    const expenseFeeType = data?.data.data

    const formatDate = (dateString?: string) => {
        if (!dateString) return "---"
        return format(new Date(dateString), "dd/MM/yyyy HH:mm")
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        Chi tiết loại phí phát sinh
                    </SheetTitle>
                    <SheetDescription>
                        Xem thông tin chi tiết của cấu hình loại phí phát sinh
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <DetailSkeleton />
                ) : (
                    <div className="space-y-6 py-6 ml-4">
                        {/* Info Header */}
                        <div className="flex flex-col items-center justify-center space-y-3 bg-muted/30 py-6 rounded-xl border border-dashed">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Tag className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="font-bold text-xl leading-tight text-primary">
                                    {expenseFeeType?.expenseFeeTypeName}
                                </h3>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <AlignLeft className="h-4 w-4" /> Mô tả
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-2">
                                <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                    {expenseFeeType?.expenseFeeTypeDescription || "Chưa có mô tả"}
                                </div>
                            </div>
                        </div>

                        {/* System Info */}
                        <div className="grid grid-cols-1 gap-4 pt-4 border-t">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Thông tin hệ thống
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Hash className="h-4 w-4" /> ID
                                    </div>
                                    <span className="font-mono text-xs max-w-[150px] truncate" title={expenseFeeType?.expenseFeeTypeId}>
                                        {expenseFeeType?.expenseFeeTypeId}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <CalendarDays className="h-4 w-4" /> Ngày tạo
                                    </div>
                                    <span className="font-mono text-xs">
                                        {formatDate(expenseFeeType?.createdDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Activity className="h-4 w-4" /> Lần cập nhật cuối
                                    </div>
                                    <span className="font-mono text-xs">
                                        {formatDate(expenseFeeType?.updatedDate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
