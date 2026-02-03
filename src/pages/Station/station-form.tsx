import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import stationQueries from "@/queries/station.query"
import { stationSchema, type StationFormValues } from "@/schema/station.schema"
import type { StationFormProps } from "@/types/station.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const StationForm = ({ open, onOpenChange, mode, id }: StationFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<StationFormValues>({
        resolver: zodResolver(stationSchema)
    })

    const { data } = stationQueries.useDetail(id as string)

    useEffect(() => {
        if (isUpdate && data) {
            reset(data.data.data)
        }

        if (!isUpdate) {
            reset({
                name: "",
                address: "",
                openTime: "",
                closeTime: "",
            })
        }
    }, [isUpdate, data, reset])

    const onSubmit = handleSubmit((data: StationFormValues) => {

    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdate ? "Cập nhật trạm" : "Thêm trạm"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên Trạm</Label>
                        <Input
                            id="name"
                            placeholder="VD: Trạm Thủ Đức,..."
                            {...register("name", { required: true })}
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Địa chỉ trạm</Label>
                        <Input
                            id="address"
                            placeholder="141/22/5a đường 339, khu phố 4, phường phư..."
                            {...register("address", { required: true })}
                        />
                    </div>

                    {/* Open Time */}
                    <div className="space-y-2">
                        <Label htmlFor="openTime">Giờ mở cửa</Label>
                        <Input
                            id="openTime"
                            type="time"
                            {...register("openTime", { required: true })}
                        />
                    </div>

                    {/* Close Time */}
                    <div className="space-y-2">
                        <Label htmlFor="closeTime">Giờ đóng cửa</Label>
                        <Input
                            id="closeTime"
                            type="time"
                            {...register("closeTime", { required: true })}
                        />
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}