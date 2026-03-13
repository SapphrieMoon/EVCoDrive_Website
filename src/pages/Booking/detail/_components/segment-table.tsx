import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingSegment } from "@/types/booking.type";
import { formatDate } from "@/utils/date";

export default function SegmentTable({ segments }: { segments: BookingSegment[] }) {

    const renderSegmentDate = (checkIn: string, checkOut: string) => {
        const inDate = formatDate(checkIn, false);
        const outDate = formatDate(checkOut, false);
        return inDate === outDate ? inDate : `${inDate}-${outDate}`;
    };

    const getStatusClasses = (status: BookingSegment['status']) => {
        switch (status) {
            case 'CheckedIn': return { dot: 'bg-chart-3', text: 'text-chart-3' };
            case 'CheckedOut': return { dot: 'bg-chart-2', text: 'text-chart-2' };
            case 'Pending': return { dot: 'bg-muted-foreground', text: 'text-muted-foreground' };
            default: return { dot: 'bg-muted-foreground', text: 'text-muted-foreground' };
        }
    };

    return (
        <Card className="col-span-7 shadow-none border rounded-lg">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold text-foreground">Booking Segments</h2>
                <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Manage All
                </button>
            </div>
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="hover:bg-transparent border-border">
                        <TableHead className="font-semibold text-muted-foreground text-md py-3 h-auto">Ngày đặt</TableHead>
                        <TableHead className="font-semibold text-muted-foreground text-md py-3 h-auto">Trạng thái</TableHead>
                        <TableHead className="font-semibold text-muted-foreground text-md py-3 h-auto">Thời gian nhận xe</TableHead>
                        <TableHead className="font-semibold text-muted-foreground text-md py-3 h-auto">Thời gian trả xe</TableHead>
                        <TableHead className="font-semibold text-muted-foreground text-md py-3 h-auto text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {segments.map((segment) => {
                        const statusStyle = getStatusClasses(segment.status);
                        return (
                            <TableRow
                                key={segment.handoverLogId}
                                className={cn(
                                    "cursor-pointer border-border transition-none",
                                    segment.status === 'CheckedIn' ? 'bg-primary/5 hover:bg-primary/10' : 'bg-card hover:bg-muted/50'
                                )}
                            >
                                <TableCell className="font-medium text-foreground py-4">
                                    {renderSegmentDate(segment.checkInDate, segment.checkOutDate)}
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}></span>
                                        <span className={`text-sm font-medium ${statusStyle.text}`}>{segment.status}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground py-4 font-medium text-sm">
                                    {segment.actualCheckInDate ? formatDate(segment.actualCheckInDate) : "—"}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-4 font-medium text-sm">
                                    {segment.actualCheckOutDate ? formatDate(segment.actualCheckOutDate) : "—"}
                                </TableCell>
                                <TableCell className="text-center py-4 ">
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground/70 hover:text-foreground rounded-full">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Card>
    )
}