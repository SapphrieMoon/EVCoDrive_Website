import z from "zod";

export const vehicleModelSchema = z.object({
    name: z.string()
        .min(2, "Tên mô hình phải có ít nhất 2 ký tự"),
    vehicleBrandId: z.string()
        .min(1, "Vui lòng chọn thương hiệu xe"),

})