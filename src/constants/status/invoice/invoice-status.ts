import type { BadgeVariant } from "@/components/ui/badge";
import { InvoiceStatus } from "@/types/invoice.type";

const INVOICE_STATUS_MAPPING: Record<InvoiceStatus, { label: string; color: BadgeVariant }> = {
    [InvoiceStatus.Paid]:
    {
        label: "Đã thanh toán",
        color: "green"
    },

    [InvoiceStatus.Unpaid]:
    {
        label: "Chưa thanh toán",
        color: "red"
    },

    [InvoiceStatus.Cancelled]:
    {
        label: "Đã hủy",
        color: "red"
    },
};

export default INVOICE_STATUS_MAPPING;