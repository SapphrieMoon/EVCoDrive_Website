import type { MemberProfileGroup } from "./co-owner-group.type";
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";
import type { MemberProfileSellHistory } from "./sell-request.type";

export type UserRole = 'Admin' | 'Operator' | 'Staff';

export interface User {
    id: string;
    email: string;
    identityCode: string;
    fullName: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    homeTown: string;
    address: string;
    avatarUrl: string;
    role: UserRole;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | null;
}

export interface MemberProfile {
    memberId: string;
    accountId: string;
    fullName: string;
    avatar: string;
    memberSince: string;
    currentGroups: MemberProfileGroup[];
    purchaseHistory: [];
    sellHistory: MemberProfileSellHistory[];
}

export interface Member {
    memberId: string
    accountId: string
    email: string
    fullName: string
    phone: string
    isActive: boolean
    createdDate: string // ISO date string
    updatedDate: string // ISO date string
}

export type MemberPaginationParams = PaginationParams & {
    search?: string;
}

export type MemberPaginationResponse = SuccessResponse<PaginationResponse<Member>>

export type MemberProfileResponse = SuccessResponse<MemberProfile>