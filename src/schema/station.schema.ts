import { StationStatus } from "@/types/station.type";
import z from "zod";

export const stationSchema = z.object({
    name: z.string()
        .min(5, "Tên trạm phải có ít nhất 5 ký tự")
        .max(100, "Tên trạm không được vượt quá 100 ký tự"),
    address: z.string()
        .min(10, "Địa chỉ phải có ít nhất 10 ký tự")
        .max(255, "Địa chỉ không được vượt quá 255 ký tự"),
    openTime: z.string()
        .min(1, "Vui lòng chọn giờ mở cửa"),
    closeTime: z.string()
        .min(1, "Vui lòng chọn giờ đóng cửa"),
    status: z.nativeEnum(StationStatus).optional().default(StationStatus.Active),
})
    .refine((data) => {
        return data.openTime < data.closeTime;
    }, {
        message: "Giờ đóng cửa phải sau giờ mở cửa",
        path: ["closeTime"],
    });

export type StationFormValues = z.input<typeof stationSchema>;