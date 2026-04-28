import z from "zod";

export const checkInSchema = z.object({
    startOdometer: z.coerce.number().min(0, "Vui lòng nhập số km"),
    startBatteryLevel: z.coerce.number().min(0, "Pin/Bình phải lớn hơn hoặc bằng 0").max(100, "Pin/Bình không vượt quá 100"),
    checkInNote: z.string().min(1, "Vui lòng nhập ghi chú lúc nhận xe"),
    images: z.array(z.any()).max(5, "Tối đa 5 ảnh").optional().default([]),
});

export type CheckInFormValues = z.infer<typeof checkInSchema>;

export const checkOutSchema = z.object({
    endOdometer: z.coerce.number().min(0, "Vui lòng nhập số km"),
    endBatteryLevel: z.coerce.number().min(0, "Pin/Bình phải lớn hơn hoặc bằng 0").max(100, "Pin/Bình không vượt quá 100"),
    checkOutNote: z.string().min(1, "Vui lòng nhập ghi chú lúc trả xe"),
    images: z.array(z.any()).max(5, "Tối đa 5 ảnh").optional().default([]),
});

export type CheckOutFormValues = z.infer<typeof checkOutSchema>;
