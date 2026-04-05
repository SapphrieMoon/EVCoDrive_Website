import type { BadgeVariant } from "@/components/ui/badge";
import { CONTRACT_STATUSES, type ContractStatus } from "@/types/contract.type";

export const CONTRACT_STATUS_MAPPING: Record<ContractStatus, { label: string; color: BadgeVariant }> = {
    [CONTRACT_STATUSES.Completed]: {
        label: "Đã hoàn thành",
        color: "teal",
    },
    [CONTRACT_STATUSES.Draft]: {
        label: "Bản nháp",
        color: "secondary",
    },
};
