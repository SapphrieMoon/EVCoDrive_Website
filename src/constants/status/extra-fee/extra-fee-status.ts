import type { BadgeVariant } from "@/components/ui/badge";
import { ExtraFeeStatus } from "@/types/extra-fee.type";

export const EXTRA_FEE_STATUS_MAPPING: Record<ExtraFeeStatus, { label: string; color: BadgeVariant }> = {
    [ExtraFeeStatus.Paid]: {
        label: "Đã thanh toán",
        color: "indigo"
    },
    [ExtraFeeStatus.Unpaid]: {
        label: "Chưa thanh toán",
        color: "sky"
    },
}