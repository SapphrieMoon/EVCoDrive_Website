import z from "zod"

export const operatorSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email không được để trống")
        .email("Email không đúng định dạng"),

    fullName: z
        .string()
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(50, "Họ và tên không quá 50 ký tự"),

    phone: z
        .string()
        .trim()
        .min(1, "Số điện thoại không được để trống")
        .regex(/^\d+$/, "Chỉ được nhập số")
        .regex(/^(0[3|5|7|8|9])[0-9]{8}$/, "Số điện thoại không đúng định dạng Việt Nam (10 số)"),

    stationId: z
        .string()
        .min(1, "Vui lòng chọn trạm quản lý")
        .uuid("ID trạm sạc không hợp lệ")
})

export type OperatorFormValues = z.infer<typeof operatorSchema>