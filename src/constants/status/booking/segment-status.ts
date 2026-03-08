import { SegmentStatus } from "@/types/booking.type";
import type { BadgeVariant } from "@/components/ui/badge";

export const SEGMENT_STATUS_MAPPING: Record<SegmentStatus, { label: string; color: BadgeVariant }> = {
    [SegmentStatus.Pending]: {
        label: "Chờ nhận xe",
        color: "secondary"
    },
    [SegmentStatus.CheckedIn]: {
        label: "Đã nhận xe",
        color: "blue"
    },
    [SegmentStatus.CheckedOut]: {
        label: "Đã trả xe",
        color: "green"
    },
}