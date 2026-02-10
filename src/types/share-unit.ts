export type ShareUnitStatus = "Available" | "Selling" | "Occupied" | string;

export interface ShareUnit {
    shareUnitId: string;
    displayNumber: number;
    certificateCode: number;
    status: ShareUnitStatus;
    ownerId: string | null;
    ownerName: string | null;
}