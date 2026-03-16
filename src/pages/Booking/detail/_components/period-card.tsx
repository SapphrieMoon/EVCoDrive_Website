import { Card } from "@/components/ui/card"
import bookingQueries from "@/queries/booking.query"
import { Briefcase, Calendar } from "lucide-react"

export default function PeriodCard({ id }: { id: string }) {
    const { data } = bookingQueries.useDetail(id)
    const booking = data?.data.data
    return (
        <Card className="p-5 flex items-start gap-4 shadow-sm flex flex-row">
            <div className="flex-none h-14 w-14 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                <Calendar size={28} className="fill-current" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Thời gian sử dụng
                </div>
                <div className="text-lg font-semibold leading-tight text-foreground">
                    Mar 18 - Mar 21
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                    Tổng số ngày sử dụng: {booking?.totalDays}
                </div>
                <div className="text-sm text-muted-foreground italic flex items-center gap-1.5 mt-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Chuyến đi công tác xa</span>
                </div>
            </div>
        </Card>
    )
}