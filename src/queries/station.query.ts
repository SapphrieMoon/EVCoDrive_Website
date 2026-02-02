import { stationApi } from "@/apis/station.api"
import { stationKey } from "@/constants/query-keys/station.key"
import type { StationPaginationParams } from "@/types/station.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const stationQueries = {
    useAll: () => {
        return useQuery({
            queryKey: stationKey.all(),
            queryFn: stationApi.getAll
        })
    },

    usePagination: (params: StationPaginationParams) => {
        return useQuery({
            queryKey: stationKey.listPagination(params),
            queryFn: () => stationApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: stationKey.detail(id),
            queryFn: () => stationApi.getDetail(id),
            enabled: !!id
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => stationApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: stationKey.lists()
                })
            }
        })
    }

}

export default stationQueries