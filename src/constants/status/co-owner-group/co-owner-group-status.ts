import type { CoOwnerGroupStatus } from "@/types/co-owner-group.type";

export const CO_OWNER_GROUP_STATUS_MAPPING: Record<CoOwnerGroupStatus, { label: string; color: string }> = {
    Active: {
        label: "Đang hoạt động",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10",
    },
    Inactive: {
        label: "Ngừng hoạt động",
        color: "text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-500/10",
    },
    // Pending: {
    //     label: "Chờ duyệt",
    //     color: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-500/10",
    // },
    // Thêm các status khác nếu BE có trả về
};