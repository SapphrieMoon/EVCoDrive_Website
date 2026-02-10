export interface ShareHolder {
    shareHolderId: string;
    memberId: string;
    memberName: string;
    memberEmail: string;
    ownedShares: number;
    ownershipPercentage: number;
    status: "Active" | "Inactive" | string;
    avatarUrl?: string;
}