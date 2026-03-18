export const SellRequestStatus = {
    PUBLISHED: "Published",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
    EXPIRED: "Expired",
    PARTIALSOLD: "PartialSold",
    ENDED: "Ended",
} as const

export type SellRequestStatus = typeof SellRequestStatus[keyof typeof SellRequestStatus]

export interface MemberProfileSellHistory {
    sellRequestId: string;
    coOwnerGroupId: string;
    groupName: string;
    vehicleLicensePlate: string;
    totalShares: number;
    soldShares: number;
    remainingShares: number;
    pricePerShare: number;
    status: SellRequestStatus;
    createdDate: string;
    expiredDate: string;
}