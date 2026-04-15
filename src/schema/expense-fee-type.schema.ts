import z from "zod";

export const expenseFeeTypeSchema = z.object({
    name: z.string()
        .min(1, "Vui lòng nhập tên loại phí")
        .max(100, "Tên loại phí không được vượt quá 100 ký tự"),
    description: z.string()
        .min(1, "Vui lòng nhập mô tả cho loại phí"),
})

export type ExpenseFeeTypeFormValues = z.input<typeof expenseFeeTypeSchema>;
