import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { extraFeeTypeQueries } from "@/queries/extra-fee.query"
import { extraFeeTypeSchema, type ExtraFeeTypeFormValues } from "@/schema/extra-fee-type.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { ExtraFeeFormProps } from "@/types/extra-fee.type"

export const ExtraFeeTypeForm = ({ open, onOpenChange, mode, id }: ExtraFeeFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ExtraFeeTypeFormValues>({
        resolver: zodResolver(extraFeeTypeSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const { data } = extraFeeTypeQueries.useDetail(id as string)

    useEffect(() => {
        if (isUpdate && data) {
            const item = data.data.data;
            const description = (item as any)?.extraFeeTypeDescription || item?.exptraFeeTypeDescription;
            reset({
                name: item.extraFeeTypeName,
                description: description || ""
            })
        }

        if (!isUpdate) {
            reset({
                name: "",
                description: ""
            })
        }
    }, [isUpdate, data, reset, open])

    const createMutation = extraFeeTypeQueries.useCreate()
    const updateMutation = extraFeeTypeQueries.useUpdate()

    const isPending = createMutation.isPending || updateMutation.isPending

    const onSubmit = handleSubmit((formData) => {
        if (isUpdate && id) {
            updateMutation.mutate({ id: id, name: formData.name, description: formData.description }, {
                onSuccess: () => {
                    onOpenChange(false)
                },
            })
        } else {
            createMutation.mutate({ name: formData.name, description: formData.description }, {
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
                        {isUpdate ? "Cập nhật loại phụ phí" : "Thêm loại phụ phí mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên loại phụ phí</Label>
                        <Input
                            id="name"
                            placeholder="VD: Phí rửa xe, phụ thu bảo hiểm..."
                            {...register("name")}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                            id="description"
                            placeholder="Mô tả chi tiết phụ phí..."
                            {...register("description")}
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
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
