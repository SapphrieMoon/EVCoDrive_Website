import type { VehicleBrandPaginationParams } from "@/types/vehicle-brand.type";

export const vehicleBrandKey = {
    all: () => ['vehicle-brand'],

    lists: () => ['vehicle-brand', 'list'],
    listPagination: (params: VehicleBrandPaginationParams) =>
        ['vehicle-brand', 'list', 'pagination', params],

    details: () => ['vehicle-brand', 'detail'],
    detail: (id: string) => ['vehicle-brand', 'detail', id],
}