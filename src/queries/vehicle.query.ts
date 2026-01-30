import { vehicleApi } from "@/apis/vehicle.api"
import { vehicleKey } from "@/constants/query-keys/vehicle.key"
import type { VehiclePaginationParams } from "@/types/vehicle.type"
import { useQuery } from "@tanstack/react-query"

const vehicleQueries = {
    useGetAll: () => {
        return useQuery({
            queryKey: vehicleKey.all(),
            queryFn: () => vehicleApi.getAll(),
            placeholderData: (previousData) => previousData,
        })
    },

    usePagination: (params: VehiclePaginationParams) => {
        return useQuery({
            queryKey: vehicleKey.listPagination(params),
            queryFn: () => vehicleApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },
}

export default vehicleQueries