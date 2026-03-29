import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { generateMonthlyInvoiceSchema, type GenerateMonthlyInvoiceFormValues } from "@/schema/invoice.schema";
import { toast } from "sonner";
import { FileText } from "lucide-react";
import invoiceQueries from "@/queries/invoice.query";

export default function GenerateInvoiceForm() {
    const [open, setOpen] = useState(false);
    const mutation = invoiceQueries.useGenerateMonthlyInvoice();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<GenerateMonthlyInvoiceFormValues>({
        resolver: zodResolver(generateMonthlyInvoiceSchema),
        defaultValues: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            monthlyAmountPerGroup: 0,
            currency: "VND",
            dueInDays: 7
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data, {
            onSuccess: () => {
                toast.success("Tạo hóa đơn thành công");
                setOpen(false);
                reset();
            }
        });
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-1.5">
                    <FileText className="h-4 w-4" />
                    Tạo hóa đơn tháng
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tạo hóa đơn hàng tháng</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4 mt-2">

                    {/* month */}
                    <div className="space-y-2">
                        <Label>Tháng <span className="text-destructive">*</span></Label>
                        <Input
                            type="number"
                            {...register("month", { valueAsNumber: true })}
                            className={errors.month ? "border-destructive" : ""}
                        />
                        {errors.month && (
                            <p className="text-[12px] text-destructive">
                                {errors.month.message}
                            </p>
                        )}
                    </div>

                    {/* year */}
                    <div className="space-y-2">
                        <Label>Năm <span className="text-destructive">*</span></Label>
                        <Input
                            type="number"
                            {...register("year", { valueAsNumber: true })}
                            className={errors.year ? "border-destructive" : ""}
                        />
                        {errors.year && (
                            <p className="text-[12px] text-destructive">
                                {errors.year.message}
                            </p>
                        )}
                    </div>

                    {/* monthlyAmountPerGroup */}
                    <div className="space-y-2">
                        <Label>Số tiền mỗi nhóm <span className="text-destructive">*</span></Label>
                        <Input
                            type="number"
                            placeholder="Nhập số tiền..."
                            {...register("monthlyAmountPerGroup", { valueAsNumber: true })}
                            className={errors.monthlyAmountPerGroup ? "border-destructive" : ""}
                        />
                        {errors.monthlyAmountPerGroup && (
                            <p className="text-[12px] text-destructive">
                                {errors.monthlyAmountPerGroup.message}
                            </p>
                        )}
                    </div>

                    {/* currency */}
                    <div className="space-y-2">
                        <Label>Đơn vị tiền tệ <span className="text-destructive">*</span></Label>
                        <Input
                            placeholder="VD: VND"
                            {...register("currency")}
                            className={errors.currency ? "border-destructive" : ""}
                        />
                        {errors.currency && (
                            <p className="text-[12px] text-destructive">
                                {errors.currency.message}
                            </p>
                        )}
                    </div>

                    {/* dueInDays */}
                    <div className="space-y-2">
                        <Label>Số ngày thanh toán <span className="text-destructive">*</span></Label>
                        <Input
                            type="number"
                            {...register("dueInDays", { valueAsNumber: true })}
                            className={errors.dueInDays ? "border-destructive" : ""}
                        />
                        {errors.dueInDays && (
                            <p className="text-[12px] text-destructive">
                                {errors.dueInDays.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Đang tạo..." : "Xác nhận"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}