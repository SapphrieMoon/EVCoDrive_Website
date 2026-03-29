import type { BadgeVariant } from "@/components/ui/badge";
import { OpenStatus, StationStatus } from "@/types/station.type";

export const STATION_STATUS_MAPPING: Record<StationStatus, { label: string; color: BadgeVariant }> = {
    [StationStatus.Active]: {
        label: "Đang hoạt động",
        color: "green"
    },
    [StationStatus.Inactive]: {
        label: "Ngưng hoạt động",
        color: "red"
    },
}

export const STATION_ISOPEN_STATUS: Record<OpenStatus, { label: string; color: BadgeVariant }> = {
    [OpenStatus.Open]: {
        label: "Đang mở cửa",
        color: "green"
    },
    [OpenStatus.Closed]: {
        label: "Đóng cửa",
        color: "red"
    },
}