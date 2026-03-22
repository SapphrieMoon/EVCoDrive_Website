import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { extraFeeQueries, extraFeeTypeQueries } from "@/queries/extra-fee.query";
import { extraFeeSchema, type ExtraFeeFormValues } from "@/schema/extra-fee.schema";
import type { BookingSegment } from "@/types/booking.type";
import { Plus } from "lucide-react";
import { formatDate } from "@/utils/date";
import { toast } from "sonner";

export default function ExtraFeeForm({ bookingId, segments }: { bookingId: string, segments: BookingSegment[] }) {
    const [open, setOpen] = useState(false);
    const { data: extraFeeTypeData } = extraFeeTypeQueries.useAll();
    const extraFeeTypes = extraFeeTypeData?.data.data || [];
    const createMutation = extraFeeQueries.useCreate();

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ExtraFeeFormValues>({
        resolver: zodResolver(extraFeeSchema),
        defaultValues: {
            extraFeeTypeId: "",
            handoverLogId: "",
            title: "",
            amount: 0,
            description: "",
        },
    });

    const onSubmit = handleSubmit((data: ExtraFeeFormValues) => {
        createMutation.mutate({
            ...data,
            bookingId,
        }, {
            onSuccess: () => {
                toast.success("Tạo phí phạt thành công");
                setOpen(false);
                reset();
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
            }
        });
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1.5 font-semibold text-[13px] px-3">
                    <Plus className="h-4 w-4" />
                    Tạo phí phạt
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tạo phí phạt</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4 mt-2">

                    <div className="space-y-2">
                        <Label>Loại phí <span className="text-destructive">*</span></Label>
                        <Controller
                            control={control}
                            name="extraFeeTypeId"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={errors.extraFeeTypeId ? "border-destructive" : ""}>
                                        <SelectValue placeholder="Chọn loại phí" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {extraFeeTypes.map((type) => (
                                            <SelectItem key={type.extraFeeTypeId} value={type.extraFeeTypeId}>
                                                {type.extraFeeTypeName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.extraFeeTypeId && <p className="text-[12px] text-destructive">{errors.extraFeeTypeId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Lịch trình bàn giao <span className="text-destructive">*</span></Label>
                        <Controller
                            control={control}
                            name="handoverLogId"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={errors.handoverLogId ? "border-destructive" : ""}>
                                        <SelectValue placeholder="Chọn lịch trình" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {segments.map((seg) => (
                                            <SelectItem key={seg.handoverLogId} value={seg.handoverLogId}>
                                                {formatDate(seg.checkInDate, false)} - {formatDate(seg.checkOutDate, false)} {seg.handoverLogId && `(ID: ${seg.handoverLogId.substring(0, 6)}...)`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.handoverLogId && <p className="text-[12px] text-destructive">{errors.handoverLogId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Tiêu đề <span className="text-destructive">*</span></Label>
                        <Input
                            placeholder="Nhập tiêu đề"
                            {...register("title")}
                            className={errors.title ? "border-destructive" : ""}
                        />
                        {errors.title && <p className="text-[12px] text-destructive">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Số tiền (VND) <span className="text-destructive">*</span></Label>
                        <Input
                            type="number"
                            placeholder="Nhập số tiền..."
                            {...register("amount", { valueAsNumber: true })}
                            className={errors.amount ? "border-destructive" : ""}
                        />
                        {errors.amount && <p className="text-[12px] text-destructive">{errors.amount.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Mô tả chi tiết</Label>
                        <Textarea
                            placeholder="Mô tả nguyên nhân nộp phạt..."
                            className={`resize-none ${errors.description ? "border-destructive" : ""}`}
                            {...register("description")}
                        />
                        {errors.description && <p className="text-[12px] text-destructive">{errors.description.message}</p>}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? "Đang xử lý..." : "Xác nhận tạo"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
