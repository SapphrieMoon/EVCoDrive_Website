import z from "zod";

export const generateMonthlyInvoiceSchema = z.object({
    month: z
        .number()
        .int("Tháng phải là số nguyên")
        .min(1, "Tháng phải từ 1 đến 12")
        .max(12, "Tháng phải từ 1 đến 12"),

    year: z
        .number()
        .int("Năm phải là số nguyên")
        .min(2000, "Năm không hợp lệ"),

    monthlyAmountPerGroup: z
        .number()
        .min(1, "Số tiền phải lớn hơn 0"),

    currency: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập đơn vị tiền tệ"),

    dueInDays: z
        .number()
        .int("Số ngày phải là số nguyên")
        .min(1, "Số ngày phải lớn hơn 0")
});

export type GenerateMonthlyInvoiceFormValues = z.infer<typeof generateMonthlyInvoiceSchema>