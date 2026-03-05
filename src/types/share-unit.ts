export const ShareUnitStatus = {
    Available: "Available",
    Selling: "Selling",
    Reserved: "Reserved",
    Resale: "Resale",
} as const

export type ShareUnitStatus = typeof ShareUnitStatus[keyof typeof ShareUnitStatus]

export interface ShareUnit {
    shareUnitId: string;
    displayNumber: number;
    certificateCode: number;
    status: ShareUnitStatus;
    ownerId: string | null;
    ownerName: string | null;
}