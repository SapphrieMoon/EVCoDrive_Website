import { vehicleModelApi } from "@/apis/vehicle-model.api"
import { vehicleModelKey } from "@/constants/query-keys/vehicle-model.key"
import type { VehicleModelPaginationParams } from "@/types/vehicle-model.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const vehicleModelQueries = {
    useAll: () => {
        return useQuery({
            queryKey: vehicleModelKey.all(),
            queryFn: vehicleModelApi.getAll,
        })
    },

    usePagination: (params: VehicleModelPaginationParams) => {
        return useQuery({
            queryKey: vehicleModelKey.listPagination(params),
            queryFn: () => vehicleModelApi.getPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: vehicleModelKey.detail(id),
            queryFn: () => vehicleModelApi.getDetail(id),
            enabled: !!id
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => vehicleModelApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: vehicleModelKey.lists()
                })
            }
        })
    }
}

export default vehicleModelQueries