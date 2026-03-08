import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { BOOKING_STATUS_MAPPING } from "@/constants/status/booking/booking-status"
import { SEGMENT_STATUS_MAPPING } from "@/constants/status/booking/segment-status"
import bookingQueries from "@/queries/booking.query"
import type { BaseDetailProps } from "@/types/commons/dialog.type"
import { CalendarDays, Car, Gauge, Key, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { formatDate } from "@/utils/date"
import { toast } from "sonner"

export function BookingDetail({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = bookingQueries.useDetail(id as string)
    const booking = data?.data.data
    const [odoValue, setOdoValue] = useState<number>(0)
    const checkInMutation = bookingQueries.useCheckIn()
    const checkOutMutation = bookingQueries.useCheckOut()

    // Giả sử lấy segment đầu tiên để xử lý check-in/out
    const activeSegment = booking?.segments?.[0]
    const isPending = activeSegment?.status === "Pending"
    const isCheckedIn = activeSegment?.status === "CheckedIn"

    const handleAction = (id: string | undefined, odo: number) => {
        if (!id) return;

        if (isPending) {
            checkInMutation.mutate({ id, startOdometer: odo },
                {
                    onSuccess: () => {
                        toast.success("Check-in thành công!")
                    }
                }
            )
        } else {
            checkOutMutation.mutate({ id, endOdometer: odo },
                {
                    onSuccess: () => {
                        toast.success("Check-out thành công!")
                    }
                }
            )
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2 uppercase italic font-black">
                        <Key className="h-5 w-5 text-primary" />
                        Booking #{booking?.bookingCode}
                    </SheetTitle>
                    <SheetDescription>Chi tiết lượt đặt xe và bàn giao phương tiện</SheetDescription>
                </SheetHeader>

                {isLoading ? <DetailSkeleton /> : (
                    <div className="space-y-6 py-6 p-4">
                        {/* Status Banner */}
                        <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-2xl border border-dashed gap-3">
                            {booking?.bookingStatus && (
                                <Badge variant={BOOKING_STATUS_MAPPING[booking.bookingStatus]?.color || "secondary"} className="uppercase tracking-widest font-bold">
                                    {BOOKING_STATUS_MAPPING[booking.bookingStatus]?.label || booking.bookingStatus}
                                </Badge>
                            )}
                            <div className="text-center">
                                <p className="text-2xl font-black tracking-tighter">{booking?.totalDays} NGÀY</p>
                                <p className="text-xs text-muted-foreground italic">
                                    {formatDate(booking?.bookedDates[0])} - {formatDate(booking?.bookedDates[1])}
                                </p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                                <Key className="h-5 w-5 text-indigo-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Mã Booking (ID)</span>
                                    <span className="text-sm font-semibold truncate max-w-[280px]">#{booking?.bookingId}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                                <Car className="h-5 w-5 text-blue-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Xe & Mục đích</span>
                                    <span className="text-sm font-semibold truncate max-w-[280px]">ID Xe: {booking?.vehicleId}</span>
                                    {booking?.purpose && <span className="text-xs text-muted-foreground italic">Mục đích: {booking.purpose}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                                <User className="h-5 w-5 text-emerald-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Khách Hàng (Thành viên)</span>
                                    <span className="text-sm font-semibold truncate max-w-[280px]">{booking?.memberId}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                                <CalendarDays className="h-5 w-5 text-orange-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Ngày khởi tạo</span>
                                    <span className="text-sm font-semibold">{booking?.createdDate ? formatDate(booking.createdDate, true) : "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Ghi chú */}
                        {booking?.note && (
                            <div className="p-4 rounded-xl border bg-yellow-500/10 border-yellow-500/20">
                                <p className="text-[10px] uppercase font-bold text-yellow-600 dark:text-yellow-400 mb-1">Ghi chú</p>
                                <p className="text-sm italic">{booking.note}</p>
                            </div>
                        )}

                        {/* ACTION SECTION: CHECK-IN / CHECK-OUT */}
                        {(isPending || isCheckedIn) && (
                            <div className="space-y-4 p-4 rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-inner mt-4">
                                <h4 className="text-sm font-black uppercase italic flex items-center gap-2">
                                    <Gauge className="h-4 w-4" />
                                    {isPending ? "Thủ tục nhận xe" : "Thủ tục trả xe"}
                                </h4>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground ml-1">
                                        Số Odometer hiện tại
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Nhập số ODO..."
                                        className="bg-background font-mono font-bold text-lg text-center"
                                        value={odoValue}
                                        onChange={(e) => setOdoValue(Number(e.target.value))}
                                    />
                                </div>

                                <Button
                                    className="w-full font-bold uppercase italic tracking-wider"
                                    onClick={() => handleAction(booking?.bookingId, odoValue)}
                                >
                                    Xác nhận {isPending ? "Bắt đầu chuyến đi" : "Kết thúc chuyến đi"}
                                </Button>
                            </div>
                        )}

                        {/* Lịch sử ODO & Bàn giao (Segments) */}
                        {booking?.segments && booking.segments.length > 0 && (
                            <div className="space-y-4 mt-6">
                                <h4 className="text-sm font-black uppercase italic flex items-center gap-2">
                                    <Gauge className="h-4 w-4" />
                                    Lịch sử vận hành & Bàn giao
                                </h4>
                                <div className="space-y-3">
                                    {booking.segments.map((segment: any, index: number) => (
                                        <div key={segment.handoverLogId || index} className="rounded-xl border p-4 space-y-3 bg-card shadow-sm">
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                                                    CHUYẾN ĐI #{index + 1}
                                                </p>
                                                {segment.status && (
                                                    <Badge variant={SEGMENT_STATUS_MAPPING[segment.status as keyof typeof SEGMENT_STATUS_MAPPING]?.color || "secondary"} className="text-[10px] uppercase tracking-widest font-bold">
                                                        {SEGMENT_STATUS_MAPPING[segment.status as keyof typeof SEGMENT_STATUS_MAPPING]?.label || segment.status}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                                                    <span className="text-muted-foreground font-semibold">Nhận xe lúc:</span>
                                                    <div className="text-right">
                                                        <div className="font-semibold">{segment.actualCheckInDate ? formatDate(segment.actualCheckInDate, true) : "Chưa nhận"}</div>
                                                        <div className="font-mono text-xs text-muted-foreground italic">Dự kiến: {formatDate(segment.checkInDate, false)}</div>
                                                        {(segment.startOdometer !== null && segment.startOdometer > 0) && (
                                                            <div className="font-mono text-xs font-bold text-primary bg-primary/10 inline-block px-1.5 py-0.5 rounded mt-1">ODO Bắt đầu: {segment.startOdometer} km</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-sm pt-1">
                                                    <span className="text-muted-foreground font-semibold">Trả xe lúc:</span>
                                                    <div className="text-right">
                                                        <div className="font-semibold">{segment.actualCheckOutDate ? formatDate(segment.actualCheckOutDate, true) : "Chưa trả"}</div>
                                                        <div className="font-mono text-xs text-muted-foreground italic">Dự kiến: {formatDate(segment.checkOutDate, false)}</div>
                                                        {(segment.endOdometer !== null && segment.endOdometer > 0) && (
                                                            <div className="font-mono text-xs font-bold text-destructive bg-destructive/10 inline-block px-1.5 py-0.5 rounded mt-1">ODO Kết thúc: {segment.endOdometer} km</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}