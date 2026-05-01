import { Banknote, Calendar, Ticket } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { extraFeeQueries } from "@/queries/extra-fee.query";
import { formatDate } from "@/utils/date";
import type { BookingSegment } from "@/types/booking.type";
import ExtraFeeForm from "./extra-fee-form";
import { formatCurrency } from "@/utils/number";
import { EXTRA_FEE_STATUS_MAPPING } from "@/constants/status/extra-fee/extra-fee-status";

export default function ExtraFeeTable({ id, segments }: { id: string, segments: BookingSegment[] }) {
    const { data: extraFeeData } = extraFeeQueries.useDetail(id)
    const extraFees = extraFeeData?.data.data

    return (
        <Card className="mb-6 shadow-sm border border-border rounded-lg bg-card text-card-foreground p-0 gap-0 overflow-hidden">
            {/* Header matches segment-detail style */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-primary-foreground font-bold shrink-0">
                        <Banknote className="w-3.5 h-3.5" />
                    </div>
                    {/* Thêm leading-none và đệm nhẹ để chữ căn giữa tâm hình học với vòng tròn */}
                    <h3 className="font-bold text-foreground text-lg tracking-tight leading-none pt-0.5">Phí Phụ Thu</h3>
                </div>

                <ExtraFeeForm bookingId={id} segments={segments} />
            </div>

            <div className="">
                <Table>
                    <TableHeader className="bg-muted/40 hover:bg-muted/40">
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="w-[300px] text-xs font-bold text-muted-foreground uppercase tracking-wider py-4 pl-6">Loại phí</TableHead>
                            <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4">Mô tả</TableHead>
                            <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4">Số tiền</TableHead>
                            <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4">Chặng</TableHead>
                            <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-right py-4 pr-6">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {extraFees?.map((extraFee) => {
                            const segment = segments?.find(s => s.handoverLogId === extraFee.handoverLogId);
                            let displayDate = "Không xác định";
                            if (segment) {
                                const inDate = formatDate(segment.checkInDate, false);
                                const outDate = formatDate(segment.checkOutDate, false);
                                displayDate = inDate === outDate ? inDate : `${inDate} - ${outDate}`;
                            }

                            return (
                                <TableRow key={extraFee.extraFeeId} className="hover:bg-muted/50 border-border">
                                    {/* FEE TYPE & TITLE */}
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-foreground text-[15px]">{extraFee.title}</span>
                                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                                {extraFee.extraFeeTypeId}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* DESCRIPTION */}
                                    <TableCell className="py-4 text-sm text-foreground/80 font-medium">
                                        {extraFee.description}
                                    </TableCell>

                                    {/* AMOUNT */}
                                    <TableCell className="py-4">
                                        <div className="flex items-center text-orange-600 font-bold text-[15px]">
                                            <Ticket className="w-4 h-4 mr-2" />
                                            {formatCurrency(extraFee.amount)}
                                        </div>
                                    </TableCell>

                                    {/* SEGMENT DATE */}
                                    <TableCell className="py-4">
                                        <div className="flex items-center text-[13px] font-medium text-foreground">
                                            <Calendar className="w-4 h-4 mr-2 opacity-70" />
                                            {displayDate}
                                        </div>
                                    </TableCell>

                                    {/* STATUS */}
                                    <TableCell className="py-4 text-right pr-6">
                                        <Badge variant={EXTRA_FEE_STATUS_MAPPING[extraFee.status].color} className="font-semibold px-2.5 py-1">
                                            {EXTRA_FEE_STATUS_MAPPING[extraFee.status].label}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}