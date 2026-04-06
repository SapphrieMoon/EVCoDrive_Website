import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import bookingQueries from "@/queries/booking.query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const cancelationSchema = z.object({
    cancellationReason: z.string().min(1, "Vui lòng nhập lý do hủy đặt lịch"),
})

type CancelationFormValues = z.infer<typeof cancelationSchema>

interface BookingCancelationProps {
    bookingId: string;
}

export default function BookingCancelation({ bookingId }: BookingCancelationProps) {
    const [open, setOpen] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CancelationFormValues>({
        resolver: zodResolver(cancelationSchema),
        defaultValues: {
            cancellationReason: ""
        }
    })

    const deleteMutation = bookingQueries.useDeleteBooking()

    const onSubmit = handleSubmit((data) => {
        deleteMutation.mutate({
            bookingId,
            cancellationReason: data.cancellationReason
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
                <Button variant="destructive">Hủy đặt lịch</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Hủy đặt lịch</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
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
