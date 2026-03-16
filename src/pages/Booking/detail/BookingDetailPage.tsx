import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Badge } from "@/components/ui/badge"
import bookingQueries from "@/queries/booking.query"
import { useParams } from "react-router-dom"
import UserCard from "./_components/user-card"
import VehicleCard from "./_components/vehicle-card"
import PeriodCard from "./_components/period-card"
import SegmentTable from "./_components/segment-table"
import SegmentDetail from "./_components/segment-detail"
import { useEffect, useMemo, useState } from "react"

export default function BookingDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data, isPending } = bookingQueries.useDetail(id as string)
    const booking = data?.data.data
    const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null)

    // Mặc định chọn segment đầu tiên khi vừa load API xong
    useEffect(() => {
        if (booking?.segments && booking.segments.length > 0 && !selectedSegmentId) {
            setSelectedSegmentId(booking.segments[0].handoverLogId)
        }
    }, [booking?.segments, selectedSegmentId])

    // Tìm object chứa toàn bộ data của segment đó ngay trong lúc render
    // Dùng useMemo để tối ưu, chỉ tìm lại khi segments hoặc ID thay đổi
    const selectedSegmentData = useMemo(() => {
        if (!booking?.segments || !selectedSegmentId)
            return null;
        return booking.segments.find(s => s.handoverLogId === selectedSegmentId) || null;
    }, [booking?.segments, selectedSegmentId])

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

                    <Badge className="cursor-pointer uppercase tracking-widest px-3 py-1.5 font-bold p-4">
                        {booking.bookingStatus}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <UserCard id={booking.memberId} />
                <VehicleCard id={booking.vehicleId} />
                <PeriodCard id={booking.bookingId} />
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Bên trái: Bảng danh sách - chiếm 8 cột */}
                <SegmentTable
                    segments={booking.segments}
                    selectedSegmentId={selectedSegmentId}
                    onSelectSegment={setSelectedSegmentId}
                />

                {/* Bên phải: Form hành động - chiếm 4 cột */}
                <SegmentDetail segmentId={selectedSegmentData?.handoverLogId} />
            </div>
        </div>
    )
}