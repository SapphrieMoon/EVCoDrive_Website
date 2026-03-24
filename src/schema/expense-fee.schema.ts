import z from "zod";

export const expenseFeeActionSchema = z.object({
    expenseFeeId: z
        .string()
        .min(1, "Thiếu mã đề xuất khoản chi"),

    amount: z
        .number()
        .min(1, "Số tiền phải lớn hơn 0, không được âm"),

    operatorNote: z
        .string()
        .trim()
        .max(500, "Ghi chú không quá 500 ký tự")
        .optional()
});

export type ExpenseFeeFormValues = z.infer<typeof expenseFeeActionSchema>;