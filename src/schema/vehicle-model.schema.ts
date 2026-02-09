import { GearShiftType } from "@/types/vehicle-model.type";
import z from "zod";

export const vehicleModelSchema = z.object({
    name: z.string()
        .min(2, "Tên mô hình phải có ít nhất 2 ký tự"),
    vehicleBrandId: z.string()
        .min(1, "Vui lòng chọn thương hiệu xe"),
    gearShiftType: z.nativeEnum(GearShiftType, {
        message: "Vui lòng chọn loại hộp số",
    }),
    range: z.coerce.number()
        .min(1, "Quãng đường phải lớn hơn 0"),
    batteryCapacity: z.coerce.number()
        .min(0.1, "Dung lượng pin phải lớn hơn 0"),
    seatingCapacity: z.coerce.number()
        .int("Số chỗ ngồi phải là số nguyên")
        .min(1, "Số chỗ ngồi phải lớn hơn 0"),

})

export type VehicleModelFormValues = z.infer<typeof vehicleModelSchema>
