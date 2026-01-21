
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import axios, { AxiosError } from "axios";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(
    error: unknown
): error is AxiosError<FormError> {
    return (isAxiosError<FormError>(error) &&
        error?.response?.status === HttpStatusCode.UnprocessableEntity)
}

export function isAxiosUnauthorizedError<UnauthorizedForm>(
    error: unknown
): error is AxiosError<UnauthorizedForm> {
    return (isAxiosError<UnauthorizedForm>(error) &&
        error?.response?.status === HttpStatusCode.Unauthorized)
}