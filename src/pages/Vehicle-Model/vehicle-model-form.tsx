import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import vehicleBrandQueries from "@/queries/vehicle-brand.query"
import vehicleModelQueries from "@/queries/vehicle-model.query"
import { vehicleModelSchema, type VehicleModelFormValues } from "@/schema/vehicle-model.schema"
import { GearShiftType, type VehicleModelFormProps } from "@/types/vehicle-model.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Battery, Car, Gauge, Loader2, Settings2, Users2 } from "lucide-react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"


export const VehicleModelForm = ({ open, onOpenChange, mode, id }: VehicleModelFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<VehicleModelFormValues>({
        resolver: zodResolver(vehicleModelSchema),
        defaultValues: {
            name: "",
            vehicleBrandId: "",
            gearShiftType: GearShiftType.SINGLE_SPEED,
            range: 0,
            batteryCapacity: 0,
            seatingCapacity: 4
        }
    })

    const { data: brandsData, isLoading: isLoadingBrands } = vehicleBrandQueries.useAll()
    const brands = brandsData?.data.data || []

    const { data: detailData } = vehicleModelQueries.useDetail(id as string)

    useEffect(() => {
        if (open) {
            if (isUpdate && detailData) {
                const model = detailData.data.data
                reset({
                    name: model.name,
                    vehicleBrandId: model.vehicleBrand.vehicleBrandId,
                    gearShiftType: model.gearShiftType as GearShiftType,
                    range: model.range,
                    batteryCapacity: model.batteryCapacity,
                    seatingCapacity: model.seatingCapacity
                })
            } else if (!isUpdate) {
                reset({
                    name: "",
                    vehicleBrandId: "",
                    gearShiftType: GearShiftType.SINGLE_SPEED,
                    range: 0,
                    batteryCapacity: 0,
                    seatingCapacity: 4
                })
            }
        }
    }, [isUpdate, detailData, reset, open])

    const createMutation = vehicleModelQueries.useCreate()
    const updateMutation = vehicleModelQueries.useUpdate()
    const isPending = createMutation.isPending || updateMutation.isPending

    const onSubmit = handleSubmit((data: VehicleModelFormValues) => {
        if (isUpdate && id) {
            updateMutation.mutate({ id, data }, {
                onSuccess: () => {
                    onOpenChange(false);
                    toast.success("Cập nhật thành công");
                },
                onError: () => {
                    toast.error("Cập nhật thất bại, vui lòng thử lại sau!")
                }
            })
        } else {
            createMutation.mutate(data, {
                onSuccess: () => {
                    onOpenChange(false);
                    toast.success("Thêm dòng xe mới thành công");
                },
                onError: () => {
                    toast.error("Thêm dòng xe mới thất bại, vui lòng thử lại sau!");
                },
            })
        }
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-primary" />
                        {isUpdate ? "Cập nhật dòng xe" : "Thêm dòng xe mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 py-2">
                    {/* Model Name - Full Width */}
                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="name">Tên dòng xe</Label>
                        <Input id="name" placeholder="VD: VinFast VF 9..." {...register("name")} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>

                    {/* Brand Selection */}
                    <div className="space-y-2">
                        <Label>Thương hiệu</Label>
                        <Controller
                            control={control}
                            name="vehicleBrandId"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={isLoadingBrands ? "Đang tải..." : "Chọn hãng"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands.map((brand) => (
                                            <SelectItem key={brand.vehicleBrandId} value={brand.vehicleBrandId}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.vehicleBrandId && <p className="text-xs text-destructive">{errors.vehicleBrandId.message}</p>}
                    </div>

                    {/* GearShiftType */}
                    <div className="space-y-2">
                        <Label>Hộp số</Label>
                        <Controller
                            control={control}
                            name="gearShiftType"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <div className="flex items-center gap-2">
                                            <Settings2 className="h-4 w-4 text-muted-foreground" />
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(GearShiftType).map((type) => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Range */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" /> Quãng đường (km)</Label>
                        <Input type="number" {...register("range")} />
                    </div>

                    {/* Battery */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5"><Battery className="h-3.5 w-3.5" /> Dung lượng Pin (kWh)</Label>
                        <Input type="number" step="0.1" {...register("batteryCapacity")} />
                    </div>

                    {/* Seating */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5"><Users2 className="h-3.5 w-3.5" /> Số chỗ ngồi</Label>
                        <Input type="number" {...register("seatingCapacity")} />
                    </div>

                    <div className="col-span-2 flex justify-end gap-2 pt-4 border-t mt-2">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Huỷ
                        </Button>
                        <Button type="submit" disabled={isPending} className="min-w-[120px]">
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isUpdate ? "Lưu thay đổi" : "Tạo dòng xe mới"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}