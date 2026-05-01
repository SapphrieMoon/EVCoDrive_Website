import z from "zod";

export const checkInSchema = z.object({
    startOdometer: z.preprocess(
        (val) => (val === "" || val === null || val === undefined) ? undefined : Number(val),
        z.number()
            .refine((val) => val !== undefined, {
                message: "Vui lòng nhập số km",
            })
            .min(0, "Số km không hợp lệ")
    ),
    startBatteryLevel: z.preprocess(
        (val) => (val === "" || val === null || val === undefined) ? undefined : Number(val),
        z.number()
            .refine((val) => val !== undefined, {
                message: "Vui lòng nhập phần trăm Pin/Bình",
            })
            .min(0, "Pin/Bình phải lớn hơn hoặc bằng 0")
            .max(100, "Pin/Bình không vượt quá 100")
    ),
    checkInNote: z.string().min(1, "Vui lòng nhập ghi chú lúc nhận xe"),
    actualCheckInDate: z.string().min(1, "Vui lòng chọn ngày nhận xe thực tế"),
    images: z.array(z.any()).max(5, "Tối đa 5 ảnh").optional().default([]),
});

export type CheckInFormValues = z.infer<typeof checkInSchema>;

export const checkOutSchema = z.object({
    endOdometer: z.preprocess(
        (val) => (val === "" || val === null || val === undefined) ? undefined : Number(val),
        z.number()
            .refine((val) => val !== undefined, {
                message: "Vui lòng nhập số km",
            })
            .min(0, "Số km không hợp lệ")
    ),
    endBatteryLevel: z.preprocess(
        (val) => (val === "" || val === null || val === undefined) ? undefined : Number(val),
        z.number()
            .refine((val) => val !== undefined, {
                message: "Vui lòng nhập phần trăm Pin/Bình",
            })
            .min(0, "Pin/Bình phải lớn hơn hoặc bằng 0")
            .max(100, "Pin/Bình không vượt quá 100")
    ),
    checkOutNote: z.string().min(1, "Vui lòng nhập ghi chú lúc trả xe"),
    actualCheckOutDate: z.string().min(1, "Vui lòng chọn ngày trả xe thực tế"),
    images: z.array(z.any()).max(5, "Tối đa 5 ảnh").optional().default([]),
});

export type CheckOutFormValues = z.infer<typeof checkOutSchema>;
