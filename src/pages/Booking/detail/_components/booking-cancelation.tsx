import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import bookingQueries from "@/queries/booking.query"
import type { BookingSegment } from "@/types/booking.type"
import { formatDate } from "@/utils/date"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

const cancelationSchema = z.object({
    cancellationReason: z.string().min(1, "Vui lòng nhập lý do hủy đặt lịch"),
    handoverLogId: z.string().optional(),
})

type CancelationFormValues = z.infer<typeof cancelationSchema>

interface BookingCancelationProps {
    bookingId: string;
    segments?: BookingSegment[];
    label?: string;
}

export default function BookingCancelation({ bookingId, segments, label = "Hủy đặt lịch" }: BookingCancelationProps) {
    const [open, setOpen] = useState(false)

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CancelationFormValues>({
        resolver: zodResolver(cancelationSchema),
        defaultValues: {
            cancellationReason: "",
            handoverLogId: "all"
        }
    })

    const deleteMutation = bookingQueries.useDeleteBooking()

    const onSubmit = handleSubmit((data) => {
        deleteMutation.mutate({
            bookingId,
            cancellationReason: data.cancellationReason,
            ...((data.handoverLogId && data.handoverLogId !== "all") ? { handoverLogId: data.handoverLogId } : {}),
        }, {
            onSuccess: () => {
                setOpen(false)
                reset()
            }
        })
    })

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (!newOpen) {
            reset()
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="destructive">{label}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    {segments && segments.length > 0 && (
                        <div className="space-y-2">
                            <Label>Tùy chọn hủy</Label>
                            <Controller
                                name="handoverLogId"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || "all"}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn phần muốn hủy" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Hủy toàn bộ lịch đặt</SelectItem>
                                            {segments.map((segment) => {
                                                const inDate = formatDate(segment.checkInDate, false);
                                                const outDate = formatDate(segment.checkOutDate, false);
                                                const displayDate = inDate === outDate ? inDate : `${inDate} đến ${outDate}`;
                                                return (
                                                    <SelectItem key={segment.handoverLogId} value={segment.handoverLogId}>
                                                        Hủy chặng: {displayDate}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="cancellationReason">Lý do hủy <span className="text-red-500">*</span></Label>
                        <Input
                            id="cancellationReason"
                            placeholder="VD: Thay đổi kế hoạch..."
                            {...register("cancellationReason")}
                        />
                        {errors.cancellationReason && (
                            <p className="text-red-500 text-xs italic">{errors.cancellationReason.message}</p>
                        )}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                            Hủy bỏ
                        </Button>
                        <Button type="submit" disabled={deleteMutation.isPending} variant="destructive">
                            Xác nhận hủy
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
