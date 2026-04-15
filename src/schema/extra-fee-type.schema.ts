import z from "zod";

export const extraFeeTypeSchema = z.object({
    name: z.string()
        .min(1, "Vui lòng nhập tên loại phụ phí")
        .max(100, "Tên loại phụ phí không được vượt quá 100 ký tự"),
    description: z.string()
        .min(1, "Vui lòng nhập mô tả cho loại phụ phí"),
})

export type ExtraFeeTypeFormValues = z.input<typeof extraFeeTypeSchema>;
