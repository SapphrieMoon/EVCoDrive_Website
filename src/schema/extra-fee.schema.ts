import z from "zod"

export const extraFeeSchema = z.object({
    extraFeeTypeId: z
        .string()
        .min(1, "Vui lòng chọn loại phí"),

    handoverLogId: z
        .string()
        .min(1, "Vui lòng chọn lịch trình"),

    title: z
        .string()
        .trim()
        .min(1, "Tiêu đề không được để trống")
        .max(100, "Tiêu đề không quá 100 ký tự"),

    amount: z
        .number()
        .min(1, "Số tiền phải lớn hơn 0"),

    description: z
        .string()
        .trim()
        .max(500, "Mô tả không quá 500 ký tự")
        .optional()
})

export type ExtraFeeFormValues = z.infer<typeof extraFeeSchema>