import { stationApi } from "@/apis/station.api"
import { stationKey } from "@/constants/query-keys/station.key"
import type { StationPaginationParams } from "@/types/station.type"
import { useQuery } from "@tanstack/react-query"

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
    }

}

export default stationQueries