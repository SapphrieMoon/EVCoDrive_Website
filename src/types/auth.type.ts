import type { User } from "./user.type";
import type { SuccessResponse } from "./utils.type";

export type AuthResponse = SuccessResponse<{
    token: string;
    refreshToken: string;
    tokenExpiry: string
    user: User
}>;

export type RefreshTokenResponse = SuccessResponse<{
    access_token: string;
}>;
