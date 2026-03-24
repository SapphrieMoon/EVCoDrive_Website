export interface ShareHolder {
    shareHolderId: string;
    memberId: string;
    memberName: string;
    memberEmail: string;
    avatarUrl: string;
    ownedShares: number;
    ownershipPercentage: number;
    status: "Active" | "Inactive" | string;
}