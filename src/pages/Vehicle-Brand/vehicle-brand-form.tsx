import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import vehicleBrandQueries from "@/queries/vehicle-brand.query"
import { vehicleBrandSchema, type VehicleBrandFormValues } from "@/schema/vehicle-brand.schema"
import type { VehicleBrandFormProps } from "@/types/vehicle-brand.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const VehicleBrandForm = ({ open, onOpenChange, mode, id }: VehicleBrandFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<VehicleBrandFormValues>({
        resolver: zodResolver(vehicleBrandSchema)
    })

    const { data } = vehicleBrandQueries.useGetDetail(id ?? "")

    useEffect(() => {
        if (isUpdate && data) {
            reset(data.data.data)
        }

        if (!isUpdate) {
            reset({
                name: "",
                logoUrl: "",
            })
        }
    }, [isUpdate, data, reset])

    const createMutation = vehicleBrandQueries.useCreate()
    const updateMutation = vehicleBrandQueries.useUpdate()

    const onSubmit = handleSubmit((data: VehicleBrandFormValues) => {
        if (isUpdate && id) {
            updateMutation.mutate({ id: id!, data }, {
                onSuccess: () => {
                    onOpenChange(false)
                },
            })
        } else {
            createMutation.mutate(data, {
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
                        {isUpdate ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên thương hiệu</Label>
                        <Input
                            id="name"
                            placeholder="VD: Vinfast, Xiaomi..."
                            {...register("name", { required: true })}
                        />
                    </div>

                    {/* LogoUrl */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Link logo</Label>
                        <Input
                            id="description"
                            placeholder="Link hình ảnh logo của hãng"
                            {...register("logoUrl")}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Huỷ
                        </Button>

                        <Button type="submit" disabled={isSubmitting}>
                            {isUpdate ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}   