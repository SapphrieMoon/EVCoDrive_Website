import type { MemberProfileGroup } from "./co-owner-group.type";
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

export type MemberProfileResponse = SuccessResponse<MemberProfile>