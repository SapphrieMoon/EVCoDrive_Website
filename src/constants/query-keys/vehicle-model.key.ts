import type { VehicleModelPaginationParams } from "@/types/vehicle-model.type";

export const vehicleModelKey = {
    all: () => ['vehicle-model'],

    lists: () => ['vehicle-model', 'list'],
    listPagination: (params: VehicleModelPaginationParams) =>
        ['vehicle-model', 'list', 'pagination', params],

    details: () => ['vehicle-model', 'detail'],
    detail: (id: string) => ['vehicle-model', 'detail', id],
}