import { OpenStatus, StationStatus } from "@/types/station.type";

export const STATION_STATUS_MAPPING: Record<StationStatus, { label: string; color: string }> = {
    [StationStatus.Active]: {
        label: "Đang hoạt động",
        color: "bg-green-500/10 text-green-500 border-green-500/20"
    },
    [StationStatus.Inactive]: {
        label: "Ngưng hoạt động",
        color: "bg-red-500/10 text-red-500 border-red-500/20"
    },
}

export const STATION_ISOPEN_STATUS: Record<OpenStatus, { label: string; color: string }> = {
    [OpenStatus.Open]: {
        label: "Đang mở cửa",
        color: "bg-green-500/10 text-green-500 border-green-500/20"
    },
    [OpenStatus.Closed]: {
        label: "Đóng cửa",
        color: "bg-red-500/10 text-red-500 border-red-500/20"
    },
}