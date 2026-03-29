import type { BadgeVariant } from "@/components/ui/badge";
import { CoOwnerGroupStatus } from "@/types/co-owner-group.type";

export type NextAction = {
    status: CoOwnerGroupStatus;
    actionLabel: string;
    variant?: "default" | "destructive";
};

export const CO_OWNER_GROUP_STATUS_MAPPING: Record<CoOwnerGroupStatus,
    { label: string; color: BadgeVariant; nextActions?: NextAction[] }> = {
    [CoOwnerGroupStatus.PendingApproval]: {
        label: "Sẵn sàng kích hoạt",
        color: "blue",
        nextActions: [
            { status: CoOwnerGroupStatus.Active, actionLabel: "Kích hoạt nhóm" },
            { status: CoOwnerGroupStatus.Rejected, actionLabel: "Từ chối", variant: "destructive" },
        ]
    },
    [CoOwnerGroupStatus.Active]: {
        label: "Đang hoạt động",
        color: "green",
        nextActions: [
            { status: CoOwnerGroupStatus.Disbaned, actionLabel: "Giải tán nhóm", variant: "destructive" },
        ]
    },
    [CoOwnerGroupStatus.Inactive]: {
        label: "Chưa hoạt động",
        color: "secondary",
    },
    [CoOwnerGroupStatus.Disbaned]: {
        label: "Đã giải tán",
        color: "red",
    },
    [CoOwnerGroupStatus.Rejected]: {
        label: "Đã từ chối",
        color: "red",
    },
};