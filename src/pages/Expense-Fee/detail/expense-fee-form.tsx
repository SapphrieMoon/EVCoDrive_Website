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
import { Textarea } from "@/components/ui/textarea";
import { expenseFeeActionSchema, type ExpenseFeeFormValues } from "@/schema/expense-fee.schema";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { expenseFeeQueries } from "@/queries/expense-fee.query";


export default function ExpenseFeeForm({ expenseFeeId, }: { expenseFeeId: string }) {
    const [open, setOpen] = useState(false);
    const quoteMutation = expenseFeeQueries.useQuote();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ExpenseFeeFormValues>({
        resolver: zodResolver(expenseFeeActionSchema),
        defaultValues: {
            expenseFeeId,
            amount: 0,
            operatorNote: "",
        }
    });

    const onSubmit = handleSubmit((data) => {
        quoteMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Xử lý khoản chi thành công");
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
                <Button size="sm" variant="default" className="gap-1.5">
                    <Pencil className="h-4 w-4" />
                    Tạo hóa đơn
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tạo hóa đơn</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4 mt-2">

                    {/* amount */}
                    <div className="space-y-2">
                        <Label>
                            Số tiền (VND) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            type="number"
                            placeholder="Nhập số tiền..."
                            {...register("amount", { valueAsNumber: true })}
                            className={errors.amount ? "border-destructive" : ""}
                        />
                        {errors.amount && (
                            <p className="text-[12px] text-destructive">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    {/* operatorNote */}
                    <div className="space-y-2">
                        <Label>Ghi chú</Label>
                        <Textarea
                            placeholder="Nhập ghi chú (nếu có)..."
                            className={`resize-none ${errors.operatorNote ? "border-destructive" : ""}`}
                            {...register("operatorNote")}
                        />
                        {errors.operatorNote && (
                            <p className="text-[12px] text-destructive">
                                {errors.operatorNote.message}
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
                        <Button type="submit" disabled={quoteMutation.isPending}>
                            {quoteMutation.isPending ? "Đang xử lý..." : "Xác nhận"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}