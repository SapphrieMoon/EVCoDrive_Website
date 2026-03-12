import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import operatorQueries from "@/queries/operator.query"
import stationQueries from "@/queries/station.query"
import { operatorSchema, type OperatorFormValues } from "@/schema/operator.schema"
import type { OperatorFormProps } from "@/types/operator"
import type { Station } from "@/types/station.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, Loader2, Mail, Phone, User2 } from "lucide-react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

export const OperatorForm = ({ open, onOpenChange, mode, id }: OperatorFormProps) => {
    const isUpdate = mode === "update"

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<OperatorFormValues>({
        resolver: zodResolver(operatorSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            stationId: ""
        }
    })

    const { data: stationsData, isLoading: isLoadingStations } = stationQueries.useAll()
    const stations = stationsData?.data.data || []

    const { data: operatorDetail } = operatorQueries.useDetail(id as string)

    useEffect(() => {
        if (open) {
            if (isUpdate && operatorDetail) {
                reset(operatorDetail.data.data)
            } else if (!isUpdate) {
                reset({
                    fullName: "",
                    email: "",
                    phone: "",
                    stationId: ""
                })
            }
        }
    }, [isUpdate, operatorDetail, reset, open])

    const createMutation = operatorQueries.useCreate()
    const updateMutation = operatorQueries.useUpdate()

    const isPending = createMutation.isPending || updateMutation.isPending

    const onSubmit = handleSubmit((values) => {
        if (isUpdate && id) {
            updateMutation.mutate({ id, data: values }, {
                onSuccess: () => {
                    onOpenChange(false);
                    toast.success("Cập nhật thành công");
                },
                onError: () => {
                    toast.error("Cập nhật thất bại, vui lòng thử lại sau!")
                }
            })
        } else {
            createMutation.mutate(values, {
                onSuccess: () => {
                    onOpenChange(false);
                    toast.success("Tạo nhân viên mới thành công");
                },
                onError: () => {
                    toast.error("Tạo nhân viên mới thất bại, vui lòng thử lại sau!");
                },
            })
        }
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {isUpdate ? <User2 className="h-5 w-5" /> : <User2 className="h-5 w-5 text-primary" />}
                        {isUpdate ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4 py-2">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Họ và tên</Label>
                        <div className="relative">
                            <User2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="fullName"
                                placeholder="Nguyễn Văn A"
                                className="pl-9"
                                {...register("fullName")}
                            />
                        </div>
                        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email tài khoản</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="operator@evcodrive.com"
                                className="pl-9"
                                {...register("email")}
                            />
                        </div>
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="phone"
                                placeholder="0908xxxxxx"
                                className="pl-9"
                                {...register("phone")}
                            />
                        </div>
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>

                    {/* Station Selection */}
                    <div className="space-y-2">
                        <Label>Trạm sạc quản lý</Label>
                        <Controller
                            control={control}
                            name="stationId"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={isLoadingStations}
                                >
                                    <SelectTrigger className="w-full">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                            <SelectValue placeholder={isLoadingStations ? "Đang tải trạm sạc..." : "Chọn trạm sạc"} />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stations.map((station: Station) => (
                                            <SelectItem key={station.stationId} value={station.stationId}>
                                                {station.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.stationId && <p className="text-xs text-destructive">{errors.stationId.message}</p>}
                    </div>

                    <DialogFooter className="pt-4 gap-2 sm:gap-0">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isPending} className="min-w-[100px]">
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isUpdate ? "Lưu thay đổi" : "Tạo nhân viên"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}