import { stationApi } from "@/apis/station.api"
import { stationKey } from "@/constants/query-keys/station.key"
import type { StationFormValues } from "@/schema/station.schema"
import type { StationPaginationParams } from "@/types/station.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

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

    useCreate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: StationFormValues) => stationApi.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: stationKey.lists()
                })
            }
        })
    },
    useUpdate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, data }: { id: string, data: StationFormValues }) => stationApi.update(id, data),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: stationKey.lists()
                })
                queryClient.invalidateQueries({ queryKey: stationKey.detail(variables.id) })
                toast.success("Cập nhật thành công")
            }
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