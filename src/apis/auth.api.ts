import type { AuthResponse } from "@/types/auth.type";
import axios from "axios";

export const URL_AUTH = {
    LOGIN: 'login',
}

const authApi = {
    login: (body: { email: string; password: string }) => axios.post<AuthResponse>("", body)
};

export default authApi;