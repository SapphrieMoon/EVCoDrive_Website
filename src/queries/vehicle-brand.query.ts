import vehicleBrandApi from "@/apis/vehicle-brand.api";
import { vehicleBrandKey } from "@/constants/query-keys/vehicle-brand.key";
import type { VehicleBrandPaginationParams } from "@/types/vehicle-brand.type";
import { useQuery } from "@tanstack/react-query";

export const useVehicleBrandPaginationQuery = (params: VehicleBrandPaginationParams) => {
    return useQuery({
        queryKey: vehicleBrandKey.getAllPagination(params),
        queryFn: () => vehicleBrandApi.getAllPagination(params),
        placeholderData: (previousData) => previousData
    })
}