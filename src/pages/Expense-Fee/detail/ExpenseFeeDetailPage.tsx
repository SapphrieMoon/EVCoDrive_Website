import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Banknote, FileText, History } from "lucide-react";
import { DetailSkeleton } from "@/common/skeletons/detail-skeleton";
import { formatDate } from "@/utils/date";
import { expenseFeeQueries } from "@/queries/expense-fee.query";
import { EXPENSE_FEE_STATUS_MAPPING } from "@/constants/status/expense-fee/expense-fee-status";
import GroupCard from "./_components/group-card";
import ExpenseFeeTypeCard from "./_components/expense-fee-type-card";
import ExpenseFeeForm from "./expense-fee-form";
import BookingCalendar from "./_components/booking-calendar";
import { ExpenseFeeStatus } from "@/types/expense-fee.type";

export default function ExpenseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isPending } = expenseFeeQueries.useDetail(id!);
    const expense = data?.data.data;

    const configStatus = expense?.status ? EXPENSE_FEE_STATUS_MAPPING[expense.status] : null;

    if (isPending) return <DetailSkeleton />;
    if (!expense) return <div>Không tìm thấy dữ liệu chi phí</div>;

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight uppercase">Đề xuất khoản chi</h2>
                        <p className="text-sm text-muted-foreground font-mono mt-0.5">ID: {expense.expenseFeeId}</p>
                    </div>
                </div>
                <div>
                    <Badge className="px-5 py-2 text-sm font-bold uppercase shadow-sm p-4" variant={configStatus?.color}>
                        {configStatus?.label}
                    </Badge>
                </div>
            </div>

            {/* Actions Toolbar */}
            <div className="flex justify-end gap-3">
                {expense.status === ExpenseFeeStatus.SubmittedToSystem && (
                    <ExpenseFeeForm expenseFeeId={expense.expenseFeeId} />
                )}
                {expense.status === ExpenseFeeStatus.Paid && (
                    <BookingCalendar vehicleId={expense.vehicleId} />
                )}
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* LEFT COLUMN (8) */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Amount Card */}
                    <Card className="p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100/50 dark:bg-emerald-950/30 text-emerald-600 rounded-full">
                                    <Banknote className="h-6 w-6" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                        Tổng số tiền đề xuất
                                    </p>
                                    <p className="text-3xl font-bold text-emerald-600 tabular-nums">
                                        {expense.amount.toLocaleString()} <span className="text-lg">{expense.currency}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6 border-border/60">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-0.5">Ngày chi/hoá đơn</p>
                                <p className="font-bold text-sm text-foreground">{formatDate(expense.expenseDate, false)}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Description Card */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 border-b pb-4 mb-4">
                            <FileText className="h-4 w-4 text-primary" />
                            <h3 className="font-bold uppercase text-sm tracking-wider">Thông tin chi tiết</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-1.5 border-b border-border/50 pb-5">
                                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                    Tên đề xuất khoản chi
                                </h4>
                                <h4 className="font-bold text-xl text-foreground px-1">{expense.name}</h4>
                            </div>

                            <div className="space-y-2.5">
                                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                    Nội dung mô tả chi tiết
                                </h4>
                                {/* white-space: pre-line giúp xuống dòng đúng như \n trong JSON */}
                                <div className="text-[13px] sm:text-sm font-medium leading-relaxed text-foreground whitespace-pre-line bg-muted/20 p-5 rounded-xl border border-border/50 min-h-[120px]">
                                    {expense.description || <span className="text-muted-foreground italic font-normal">Không có nội dung mô tả</span>}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Timeline / Audit Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 bg-muted/10">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Ngày khởi tạo</p>
                            <p className="text-sm font-medium">{formatDate(expense.createdDate)}</p>
                        </Card>
                        <Card className="p-4 bg-muted/10">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Cập nhật lần cuối</p>
                            <p className="text-sm font-medium">{formatDate(expense.updatedDate)}</p>
                        </Card>
                    </div>
                </div>

                {/* RIGHT COLUMN (4) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Group Mini Card */}
                    <GroupCard groupId={expense.coOwnerGroupId} />

                    {/* Expense Type Card */}
                    <ExpenseFeeTypeCard typeId={expense.expenseFeeTypeId} />

                    {/* Invoice Link (Nếu có) */}
                    {expense.invoiceId && (
                        <Card className="p-5 border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/20 rounded-lg">
                                        <History className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="font-bold text-sm group-hover:underline">Xem hóa đơn đính kèm</span>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}