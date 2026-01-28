import z from "zod";

export const vehicleBrandSchema = z.object({
    name: z.string().min(2, "Tên thương hiệu phải có ít nhất 2 ký tự"),
    logoUrl: z.string().url("Vui lòng nhập đúng định dạng URL ảnh logo (http/https)")
        .or(z.string().min(1, "Vui lòng nhập URL logo"))
})

export type VehicleBrandFormValues = z.infer<typeof vehicleBrandSchema>