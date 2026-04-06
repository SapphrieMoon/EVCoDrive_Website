import z from "zod";

export const staffSchema = z.object({
    avatar: z.string().min(1, "Vui lòng chọn ảnh đại diện").optional().or(z.literal('')),
    name: z.string()
        .min(2, "Tên nhân viên phải có ít nhất 2 ký tự")
        .max(100, "Tên nhân viên không được vượt quá 100 ký tự"),
    phoneNumber: z.string()
        .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ (Vui lòng nhập định dạng số ĐT Việt Nam)"),
    address: z.string()
        .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
        .max(255, "Địa chỉ không được vượt quá 255 ký tự"),
    stationId: z.string()
        .min(1, "Vui lòng chọn trạm làm việc"),
});

export type StaffFormValues = z.infer<typeof staffSchema>;
