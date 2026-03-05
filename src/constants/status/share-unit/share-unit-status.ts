import type { BadgeVariant } from "@/components/ui/badge";
import { ShareUnitStatus } from "@/types/share-unit";

export const SHARE_UNIT_STATUS_MAPPING: Record<ShareUnitStatus,
    { label: string; color: string, variant: BadgeVariant }> = {
    [ShareUnitStatus.Available]: {
        label: "Sẵn sàng",
        color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20",
        variant: "emerald"
    },
    [ShareUnitStatus.Selling]: {
        label: "Đang bán",
        color: "bg-blue-500/5 border-blue-500/20 text-blue-600 hover:bg-blue-500/10",
        variant: "blue"
    },
    [ShareUnitStatus.Reserved]: {
        label: "Chờ ký",
        color: "bg-amber-500/5 border-amber-500/20 text-amber-600 hover:bg-amber-500/10",
        variant: "amber"
    },
    [ShareUnitStatus.Resale]: {
        label: "Đang bán lại",
        color: "bg-indigo-500/5 border-indigo-500/20 text-indigo-600 hover:bg-indigo-500/10",
        variant: "indigo"
    },
}