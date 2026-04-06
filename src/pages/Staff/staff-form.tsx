import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import staffQueries from "@/queries/staff.query"
import stationQueries from "@/queries/station.query"
import { staffSchema, type StaffFormValues } from "@/schema/staff.schema"
import type { StaffFormProps } from "@/types/staff.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

export const StaffForm = ({ open, onOpenChange, mode, id }: StaffFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
            stationId: "",
            avatar: ""
        }
    })

    const { data } = staffQueries.useGetById(id as string)

    useEffect(() => {
        if (isUpdate && data) {
            reset({
                name: data.data.data.name,
                phoneNumber: data.data.data.phoneNumber,
                address: data.data.data.address,
                stationId: data.data.data.stationId,
                avatar: data.data.data.avatar || ""
            })
        }

        if (!isUpdate && open) {
            reset({
                name: "",
                phoneNumber: "",
                address: "",
                stationId: "",
                avatar: ""
            })
        }
    }, [isUpdate, data, reset, open])

    const createMutation = staffQueries.useCreate()
    const updateMutation = staffQueries.useUpdate()

    const isPending = createMutation.isPending || updateMutation.isPending

    const { data: stationsData } = stationQueries.useAll();
    const stations = stationsData?.data.data || [];

    const onSubmit = handleSubmit((data) => {
        const payload = {
            ...data,
        }
        if (isUpdate && id) {
            updateMutation.mutate({ id: id!, body: payload }, {
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
            <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdate ? "Cập nhật nhân viên" : "Thêm nhân viên"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên nhân viên</Label>
                        <Input
                            id="name"
                            placeholder="VD: Nguyễn Văn A"
                            {...register("name")}
                        />
                        {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Số điện thoại</Label>
                        <Input
                            id="phoneNumber"
                            placeholder="VD: 0909xxxxxx"
                            {...register("phoneNumber")}
                        />
                        {errors.phoneNumber && <p className="text-[10px] text-destructive">{errors.phoneNumber.message}</p>}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input
                            id="address"
                            placeholder="VD: Quận 1, Tp. Hồ Chí Minh"
                            {...register("address")}
                        />
                        {errors.address && <p className="text-[10px] text-destructive">{errors.address.message}</p>}
                    </div>

                    {/* Avatar URL */}
                    <div className="space-y-2">
                        <Label htmlFor="avatar">Ảnh đại diện (URL)</Label>
                        <Input
                            id="avatar"
                            placeholder="VD: https://example.com/avatar.jpg"
                            {...register("avatar")}
                        />
                        {errors.avatar && <p className="text-[10px] text-destructive">{errors.avatar.message}</p>}
                    </div>

                    {/* Station - Select */}
                    <div className="space-y-2">
                        <Label>Trạm làm việc</Label>
                        <Controller
                            control={control}
                            name="stationId"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn trạm làm việc" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stations?.map((station: any) => (
                                            <SelectItem key={station.stationId} value={station.stationId}>
                                                {station.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.stationId && <p className="text-[10px] text-destructive">{errors.stationId.message}</p>}
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
