import type { AxiosError, AxiosInstance } from "axios";
import { clearLocalStorage, getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, setAccessTokenToLocalStorage, setProfileToLocalStorage, setRefreshTokenToLocalStorage } from "./auth";
import axios from "axios";
import config from "@/constants/config";
import { URL_AUTH } from "@/apis/auth.api";
import type { AuthResponse, RefreshTokenResponse } from "@/types/auth.type";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import { toast } from "sonner";
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from "./axios/axiosError";
import type { ErrorResponse } from "@/types/utils.type";

class Http {
    instance: AxiosInstance

    private accessToken: string
    private refreshToken: string
    private refreshTokenRequest: Promise<string> | null = null

    constructor() {
        this.accessToken = getAccessTokenFromLocalStorage() || '';
        this.refreshToken = getRefreshTokenFromLocalStorage() || '';

        this.instance = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
    }

    // ================= REQUEST =================
    private setupRequestInterceptor() {
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken) {
                    config.headers.Authorization = this.accessToken
                }
                return config
            },
            (error) => Promise.reject(error)
        )
    }

    // ================= RESPONSE =================
    private setupResponseInterceptor() {
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config

                //Login -> lưu Token + Profile (nếu có Register thì thêm URL_AUTH.REGISTER)
                if (url === URL_AUTH.LOGIN) {
                    const data = response.data as AuthResponse
                    this.accessToken = data.data.token
                    this.refreshToken = data.data.refreshToken

                    setAccessTokenToLocalStorage(this.accessToken)
                    setRefreshTokenToLocalStorage(this.refreshToken)
                    setProfileToLocalStorage(data.data.user)
                }

                //Logout
                if (url === URL_AUTH.LOGOUT) {
                    this.accessToken = '';
                    clearLocalStorage();
                }

                return response
            },
            (error: AxiosError) => this.handleResponseError(error)
        )
    }

    private async handleResponseError(error: AxiosError) {
        const status = error.response?.status;
        const IGNORE_TOAST_STATUS = new Set<number>([
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized
        ])

        //Không toast 422 & 401
        // if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(status as number)) {
        if (!IGNORE_TOAST_STATUS.has(status ?? 0)) {
            const data = error.response?.data as ErrorResponse<unknown> | undefined
            toast.error(data?.message || error.message)
        }

        // ========== 401 ==========
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string }>>(error)) {
            const config = error.response?.config
            const url = config?.url

            //Token hết hạn + refresh
            if (isAxiosExpiredTokenError(error) && url !== URL_AUTH.REFRESH_TOKEN) {
                this.refreshTokenRequest = this.refreshTokenRequest
                    ? this.refreshTokenRequest
                    : this.handleRefreshToken().finally(() => {
                        setTimeout(() => {
                            this.refreshTokenRequest = null
                        }, 10000)
                    })

                return this.refreshTokenRequest?.then((accessToken) => {
                    return this.instance({
                        ...config,
                        headers: {
                            ...config?.headers,
                            Authorization: accessToken
                        }
                    })
                })
            }

            // Các case 401 khác → logout
            clearLocalStorage();
            this.accessToken = ''
            this.refreshToken = ''
            toast.error(error.response?.data.message || "Unauthorized")
        }

        return Promise.reject(error)
    }

    // ================= REFRESH TOKEN =================
    private async handleRefreshToken() {
        return this.instance
            .post<RefreshTokenResponse>(URL_AUTH.REFRESH_TOKEN, {
                refresh_token: this.refreshToken
            })
            .then((res) => {
                const { access_token } = res.data.data
                this.accessToken = access_token
                setAccessTokenToLocalStorage(this.accessToken);
                return access_token
            })
            .catch((error) => {
                clearLocalStorage();
                this.accessToken = ''
                this.refreshToken = ''
                throw error
            })
    }
}

const http = new Http().instance
export default http