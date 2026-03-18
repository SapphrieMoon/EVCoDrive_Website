import { CardSkeleton } from "@/common/skeletons/card-skeleton"
import { Card } from "@/components/ui/card"
import bookingQueries from "@/queries/booking.query"
import { formatDate } from "@/utils/date"
import { Calendar } from "lucide-react"

export default function PeriodCard({ id }: { id: string }) {
    const { data, isPending } = bookingQueries.useDetail(id)
    const booking = data?.data.data

    if (isPending) return <CardSkeleton />
    if (!booking) return <div>Không tìm thấy dữ liệu</div>
    return (
        <Card className="p-5 items-start gap-4 shadow-sm flex flex-row">
            <div className="flex-none h-14 w-14 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                <Calendar size={28} className="fill-current" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Thông tin lịch đặt
                </div>
                <div className="text-lg font-semibold leading-tight text-foreground">
                    {formatDate(booking?.createdDate, false)}
                    <span className="text-sm text-muted-foreground"> - (ngày đặt) </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                    Tổng số ngày sử dụng: {booking?.totalDays}
                </div>
            </div>
        </Card>
    )
}