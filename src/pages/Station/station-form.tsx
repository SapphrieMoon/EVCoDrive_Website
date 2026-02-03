import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import stationQueries from "@/queries/station.query"
import { stationSchema, type StationFormValues } from "@/schema/station.schema"
import { StationStatus, type StationFormProps } from "@/types/station.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

export const StationForm = ({ open, onOpenChange, mode, id }: StationFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, control } = useForm<StationFormValues>({
        resolver: zodResolver(stationSchema),
        defaultValues: {
            status: StationStatus.Active
        }
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
                openTime: "06:00",
                closeTime: "22:00",
                status: StationStatus.Active
            })
        }
    }, [isUpdate, data, reset, open])

    const createMutation = stationQueries.useCreate()
    const updateMutation = stationQueries.useUpdate()

    const isPending = createMutation.isPending || updateMutation.isPending

    const onSubmit = handleSubmit((data) => {
        const payload = {
            ...data,
            openTime: data.openTime.length === 5 ? `${data.openTime}:00` : data.openTime,
            closeTime: data.closeTime.length === 5 ? `${data.closeTime}:00` : data.closeTime,
        }
        if (isUpdate && id) {
            updateMutation.mutate({ id: id!, data: payload }, {
                onSuccess: () => {
                    onOpenChange(false)
                },
            })
        } else {
            createMutation.mutate(payload, {
                onSuccess: () => {
                    onOpenChange(false)
                },
            })
        }
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
                            placeholder="VD: 141/22/5a đường 339, khu phố 4, phường phư..."
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

                    {/* Trạng thái - Xử lý logic Disable/Enable */}
                    <div className="space-y-2">
                        <Label>Trạng thái</Label>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!isUpdate}
                                >
                                    <SelectTrigger className={!isUpdate ? "bg-muted" : ""}>
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={StationStatus.Active}>Đang hoạt động</SelectItem>
                                        <SelectItem value={StationStatus.Inactive}>Ngừng hoạt động</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {!isUpdate && <p className="text-[10px] text-muted-foreground italic">* Trạm mới mặc định sẽ là Đang hoạt động</p>}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
                        <Button type="submit" disabled={isPending}>
                            {isUpdate ? "Cập nhật" : "Tạo ngay"}
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}