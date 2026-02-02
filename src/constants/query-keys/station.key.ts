import type { StationPaginationParams } from "@/types/station.type";


export const stationKey = {
    all: () => ["station"],
    lists: () => ["station", "list"],
    listPagination: (params: StationPaginationParams) => [
        "station",
        "list",
        "pagination",
        params,
    ],
    details: () => ["station", "detail"],
    detail: (id: string) => ["station", "detail", id],
}