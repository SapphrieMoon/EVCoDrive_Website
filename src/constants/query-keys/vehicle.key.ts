import type { VehiclePaginationParams } from "@/types/vehicle.type";

export const vehicleKey = {
    all: () => ["vehicle"],

    lists: () => ["vehicle", "list"],
    listPagination: (params: VehiclePaginationParams) => [
        "vehicle",
        "list",
        "pagination",
        params,
    ],

    details: () => ["vehicle", "detail"],
    detail: (id: string) => ["vehicle", "detail", id],
};