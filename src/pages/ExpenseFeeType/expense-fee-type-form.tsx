import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { expenseFeeTypeQueries } from "@/queries/expense-fee.query"
import { expenseFeeTypeSchema, type ExpenseFeeTypeFormValues } from "@/schema/expense-fee-type.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { ExpenseFeeFormProps } from "@/types/expense-fee.type"

export const ExpenseFeeTypeForm = ({ open, onOpenChange, mode, id }: ExpenseFeeFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFeeTypeFormValues>({
        resolver: zodResolver(expenseFeeTypeSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const { data } = expenseFeeTypeQueries.useDetail(id as string)

    useEffect(() => {
        if (isUpdate && data) {
            const item = data.data.data;
            reset({
                name: item.expenseFeeTypeName,
                description: item.expenseFeeTypeDescription
            })
        }

        if (!isUpdate) {
            reset({
                name: "",
                description: ""
            })
        }
    }, [isUpdate, data, reset, open])

    const createMutation = expenseFeeTypeQueries.useCreate()
    const updateMutation = expenseFeeTypeQueries.useUpdate()

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
                        {isUpdate ? "Cập nhật loại phí" : "Thêm loại phí mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên loại phí</Label>
                        <Input
                            id="name"
                            placeholder="VD: Phí bảo trì..."
                            {...register("name")}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                            id="description"
                            placeholder="Mô tả cụ thể về loại phí này..."
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
