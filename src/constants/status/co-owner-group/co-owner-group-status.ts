import type { BadgeVariant } from "@/components/ui/badge";
import { CoOwnerGroupStatus } from "@/types/co-owner-group.type";

export const CO_OWNER_GROUP_STATUS_MAPPING: Record<CoOwnerGroupStatus,
    { label: string; color: BadgeVariant, nextStatus: CoOwnerGroupStatus | null, actionLabel?: string }> = {
    [CoOwnerGroupStatus.ReadyToActive]: {
        label: "Sẵn sàng kích hoạt",
        color: "blue",
        nextStatus: CoOwnerGroupStatus.Active,
        actionLabel: "Kích hoạt nhóm"
    },
    [CoOwnerGroupStatus.Active]: {
        label: "Đang hoạt động",
        color: "green",
        nextStatus: CoOwnerGroupStatus.Disbaned,
        actionLabel: "Giải tán nhóm"
    },
    [CoOwnerGroupStatus.Inactive]: {
        label: "Chưa hoạt động",
        color: "secondary",
        nextStatus: null,
    },
    [CoOwnerGroupStatus.Disbaned]: {
        label: "Đã giải tán",
        color: "red",
        nextStatus: null
    },
};