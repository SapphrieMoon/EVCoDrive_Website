import {z} from "zod"

export const authSchema = z.object({
    email: z.string()
            .email("Email không đúng định dạng"),
    password: z.string()
                .min(3, "Độ dài password phải từ 3 đến 20 ký tự")
                .max(20, "Độ dài password phải từ 3 đến 20 ký tự"),
})

export const loginSchema = authSchema.pick({email: true, password: true});

export type LoginSchema = z.infer<typeof loginSchema>;