import { vehicleModelApi } from "@/apis/vehicle-model.api"
import { vehicleModelKey } from "@/constants/query-keys/vehicle-model.key"
import type { VehicleModelPaginationParams } from "@/types/vehicle-model.type"
import { useQuery } from "@tanstack/react-query"

const vehicleModelQueries = {
    useGetAll: () => {
        return useQuery({
            queryKey: vehicleModelKey.all(),
            queryFn: () => vehicleModelApi.getAll()
        })
    },

    useGetPagination: (params: VehicleModelPaginationParams) => {
        return useQuery({
            queryKey: vehicleModelKey.listPagination(params),
            queryFn: () => vehicleModelApi.getPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useGetDetail: (id: string) => {
        return useQuery({
            queryKey: vehicleModelKey.detail(id),
            queryFn: () => vehicleModelApi.getDetail(id),
            placeholderData: (previousData) => previousData,
            enabled: !!id
        })
    }
}

export default vehicleModelQueries