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
