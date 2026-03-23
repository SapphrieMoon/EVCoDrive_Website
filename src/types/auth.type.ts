import type { User } from "./user.type";
import type { SuccessResponse } from "./commons/utils.type";

export type AuthResponse = SuccessResponse<{
    token: string;
    refreshToken: string;
    tokenExpiry: string;
    user: User;
    stationId: string;
    stationName: string;
}>;

export type RefreshTokenResponse = SuccessResponse<{
    access_token: string;
}>;
