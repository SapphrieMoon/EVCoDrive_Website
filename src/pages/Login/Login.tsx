import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from "@/schema/auth.schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from "@/queries/auth.query";
import type { AxiosError } from "axios";
import { isAxiosUnprocessableEntityError } from "@/utils/axios/axiosError";
import type { ErrorResponse } from "@/types/utils.type";

export default function Login() {
    const navigate = useNavigate();
    
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const loginMutation = useLoginMutation(); 

    const onSubmit = handleSubmit((data: LoginSchema) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                navigate('/');
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchema>>(error)) {
                  const formError = error.response?.data.data;
              
                  if (formError) {
                    Object.keys(formError).forEach((key) => {
                      setError(key as keyof LoginSchema, {
                        message: formError[key as keyof LoginSchema],
                        type: 'server'
                      });
                    });
                  }
                }
              }
        });
        });

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-foreground mb-2">
                        Chào mừng trở lại
                    </h1>
                    <p className="text-muted-foreground">
                        Đăng nhập vào tài khoản để tiếp tục
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} noValidate className="space-y-4">

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Địa chỉ Email
                            <span className="text-destructive ml-0.5">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            {...register('email')}
                            disabled={isSubmitting || loginMutation.isPending}
                            className="h-13 bg-background border border-border rounded-lg"
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            Mật khẩu
                            <span className="text-destructive ml-0.5">*</span>
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            {...register("password")}
                            disabled={isSubmitting || loginMutation.isPending}
                            className="h-13 bg-background border border-border rounded-lg"
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg mt-6"
                    >
                        {isSubmitting || loginMutation.isPending ? "Đang xử lý..." : "Đăng nhập"}
                    </Button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                    Trang đăng nhập dành cho nhân viên nội bộ EVCoDrive
                </p>
            </div>
        </div>
    );
}