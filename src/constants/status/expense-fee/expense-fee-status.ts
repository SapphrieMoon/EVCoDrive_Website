import type { BadgeVariant } from "@/components/ui/badge";
import { ExpenseFeeStatus } from "@/types/expense-fee.type";

export const EXPENSE_FEE_STATUS_MAPPING: Record<ExpenseFeeStatus, { label: string; color: BadgeVariant }> = {
    [ExpenseFeeStatus.SubmittedToSystem]: {
        label: "Đã gửi lên hệ thống",
        color: "amber"
    },
    [ExpenseFeeStatus.Cancelled]: {
        label: "Đã hủy",
        color: "destructive"
    },
    [ExpenseFeeStatus.Paid]: {
        label: "Đã thanh toán",
        color: "teal"
    },
    [ExpenseFeeStatus.PendingPayment]: {
        label: "Chờ thanh toán",
        color: "blue"
    },
    [ExpenseFeeStatus.Processing]: {
        label: "Đang xử lý",
        color: "yellow"
    },
    [ExpenseFeeStatus.Approved]: {
        label: "Chờ thanh toán",
        color: "blue"
    },
    [ExpenseFeeStatus.Scheduled]: {
        label: "Đã lên lịch",
        color: "sky"
    },
    [ExpenseFeeStatus.Complete]: {
        label: "Đã hoàn thành",
        color: "green"
    },
}