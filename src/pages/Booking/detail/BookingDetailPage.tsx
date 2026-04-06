import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Badge } from "@/components/ui/badge"
import bookingQueries from "@/queries/booking.query"
import { useParams } from "react-router-dom"
import UserCard from "./_components/user-card"
import VehicleCard from "./_components/vehicle-card"
import PeriodCard from "./_components/period-card"
import SegmentTable from "./_components/segment-table"
import SegmentDetail from "./_components/segment-detail"
import { useState, useEffect } from "react"
import { BOOKING_STATUS_MAPPING } from "@/constants/status/booking/booking-status"
import ExtraFeeTable from "./_components/extra-fee-table"
import BookingCancelation from "./_components/booking-cancelation"

export default function BookingDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data, isPending } = bookingQueries.useDetail(id as string)
    const booking = data?.data.data
    const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);

    const sortedSegments = booking?.segments
        ? [...booking.segments].sort((a, b) => {
            return new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime();
        })
        : [];

    useEffect(() => {
        if (!selectedSegmentId && sortedSegments.length > 0) {
            // Mặc định chọn segment có ngày sớm nhất (bắt đầu hành trình)
            setSelectedSegmentId(sortedSegments[0].handoverLogId);
        }
    }, [sortedSegments, selectedSegmentId]);

    const configStatus = booking?.bookingStatus ? BOOKING_STATUS_MAPPING[booking.bookingStatus] : null;

    const selectedSegmentData =
        sortedSegments.find(s => s.handoverLogId === selectedSegmentId) ?? null;

    if (isPending) return <div className="p-8"><DetailSkeleton /></div>
    if (!booking) return <div>Không tìm thấy dữ liệu</div>

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between gap-4">
                    {/* Bên trái: Tên nhóm */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-black tracking-tighter uppercase text-primary leading-tight">
                            Booking ID
                        </h2>
                        <p className="text-sm text-muted-foreground">{booking.bookingId}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {booking.bookingStatus === "Booked" && (
                            <BookingCancelation bookingId={booking.bookingId} />
                        )}
                        <Badge className="cursor-pointer uppercase tracking-widest px-3 py-1.5 font-bold p-4" variant={configStatus?.color}>
                            {configStatus?.label}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <UserCard id={booking.memberId} purpose={booking.purpose} />
                <VehicleCard id={booking.vehicleId} />
                <PeriodCard id={booking.bookingId} />
            </div>

            <ExtraFeeTable id={booking.bookingId} segments={sortedSegments} />

            <div className="grid grid-cols-12 gap-6">
                {/* Bên trái: Bảng danh sách - chiếm 8 cột */}
                <SegmentTable
                    segments={sortedSegments}
                    selectedSegmentId={selectedSegmentId}
                    onSelectSegment={setSelectedSegmentId}
                />

                {/* Bên phải: Form hành động - chiếm 4 cột */}
                <SegmentDetail key={selectedSegmentData?.handoverLogId || 'empty'} segmentId={selectedSegmentData?.handoverLogId} />
            </div>
        </div>
    )
}