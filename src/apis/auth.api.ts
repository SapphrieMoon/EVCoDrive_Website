import type { AuthResponse } from "@/types/auth.type";
import http from "@/utils/http";

export const URL_AUTH = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token'
}

const authApi = {
    login: (body: { email: string; password: string }) => http.post<AuthResponse>(URL_AUTH.LOGIN, body)
};

export default authApi;