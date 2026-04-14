import { DetailSkeleton } from "@/common/skeletons/detail-skeleton";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import INVOICE_STATUS_MAPPING from "@/constants/status/invoice/invoice-status";
import invoiceQueries from "@/queries/invoice.query";
import type { BaseDetailProps } from "@/types/commons/dialog.type";
import { formatCurrency } from "@/utils/number";
import { Calendar, CreditCard, FileText, Info, AlertTriangle, Clock } from "lucide-react";

export function InvoiceDetailSheet({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = invoiceQueries.useDetail(id as string);
    const invoice = data?.data.data;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Chi tiết hóa đơn
                    </SheetTitle>
                    <SheetDescription>
                        {invoice?.invoiceNumber ? `Mã hóa đơn: ${invoice?.invoiceNumber}` : "Đang tải thông tin hóa đơn..."}
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <DetailSkeleton />
                ) : invoice ? (
                    <div className="space-y-6 py-6 ml-4">
                        {/* Header Status & Total */}
                        <div className="flex flex-col items-center justify-center space-y-3 bg-muted/30 py-6 rounded-xl border border-dashed">
                            <div className="p-3 bg-background rounded-full shadow-sm">
                                <CreditCard className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="font-bold text-2xl text-primary leading-tight">
                                    {formatCurrency(invoice.totalAmount)}
                                </h3>
                                {invoice.description && (
                                    <p className="text-sm text-muted-foreground px-4 italic line-clamp-2">
                                        "{invoice.description}"
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2 justify-center">
                                <Badge
                                    variant={INVOICE_STATUS_MAPPING[invoice.invoiceStatus]?.color}
                                    className="rounded-full font-medium"
                                >
                                    {INVOICE_STATUS_MAPPING[invoice.invoiceStatus]?.label || invoice.invoiceStatus}
                                </Badge>
                            </div>
                        </div>

                        {/* Important Info */}
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Info className="h-4 w-4" /> Thông tin chung
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" /> Hạn thanh toán
                                    </span>
                                    <span className="font-mono font-bold text-destructive">
                                        {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("vi-VN") : "--"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" /> Ngày thanh toán
                                    </span>
                                    <span className="font-mono font-bold text-emerald-600">
                                        {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString("vi-VN") : "--"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Clock className="h-4 w-4" /> Ngày tạo hóa đơn
                                    </span>
                                    <span className="font-mono font-bold">
                                        {invoice.createdDate ? new Date(invoice.createdDate).toLocaleDateString("vi-VN") : "--"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Related Info */}
                        {(invoice.coOwnerGroupId || invoice.memberId || invoice.extraFeeTypeName || invoice.extraFeeId) && (
                            <div className="grid grid-cols-1 gap-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" /> Liên kết sự kiện & Đối tượng
                                </h4>
                                <div className="rounded-lg border p-4 bg-card space-y-4">
                                    {invoice.extraFeeTypeName && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Loại phụ phí</span>
                                            <span className="font-medium text-primary">
                                                {invoice.extraFeeTypeName}
                                            </span>
                                        </div>
                                    )}
                                    {invoice.extraFeeId && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Mã Phụ phí</span>
                                            <span className="font-mono text-xs text-right">
                                                {invoice.extraFeeId}
                                            </span>
                                        </div>
                                    )}
                                    {invoice.coOwnerGroupId && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Mã Nhóm chung chủ</span>
                                            <span className="font-mono text-xs text-right">
                                                {invoice.coOwnerGroupId}
                                            </span>
                                        </div>
                                    )}
                                    {invoice.memberId && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Mã Khách hàng (Thành viên)</span>
                                            <span className="font-mono text-xs text-right">
                                                {invoice.memberId}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Details List */}
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Chi tiết hạng mục
                            </h4>
                            <div className="space-y-3">
                                {invoice.details && invoice.details.length > 0 ? (
                                    invoice.details.map((detail) => (
                                        <div key={detail.invoiceDetailId} className="rounded-lg border p-4 bg-card">
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <h5 className="font-bold text-sm leading-tight flex-1">
                                                    {detail.description || "Mục chi phí"}
                                                </h5>
                                                <span className="font-bold text-sm text-primary">
                                                    {formatCurrency(detail.amount)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mt-3 pt-3 border-t text-xs text-muted-foreground">
                                                <span>Số lượng: {detail.quantity}</span>
                                                <span>Đơn giá: {formatCurrency(detail.unitPrice)}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 text-sm text-muted-foreground border rounded-lg border-dashed bg-muted/20">
                                        Không có hạng mục chi tiết.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-1 items-center justify-center text-muted-foreground mt-20">
                        Không tìm thấy thông tin hóa đơn
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
