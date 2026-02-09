import { coOwnerGroupApi } from "@/apis/co-owner-group.api"
import { coOwnerGroupKey } from "@/constants/query-keys/co-owner-group.key"
import type { CoOwnerGroupPaginationParams } from "@/types/co-owner-group.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const coOwnerGroupQueries = {
    useAll: () => {
        return useQuery({
            queryKey: coOwnerGroupKey.all(),
            queryFn: coOwnerGroupApi.getAll
        })
    },

    usePagination: (params: CoOwnerGroupPaginationParams) => {
        return useQuery({
            queryKey: coOwnerGroupKey.listPagination(params),
            queryFn: () => coOwnerGroupApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: coOwnerGroupKey.detail(id),
            queryFn: () => coOwnerGroupApi.getDetail(id),
            enabled: !!id
        })
    },

    // useCreate: () => {
    //     const queryClient = useQueryClient()

    //     return useMutation({
    //         mutationFn: (data: CoOwnerGroupFormValues) => coOwnerGroupApi.create(data),
    //         onSuccess: () => {
    //             queryClient.invalidateQueries({
    //                 queryKey: coOwnerGroupKey.lists()
    //             })
    //         }
    //     })
    // },

    // useUpdate: () => {
    //     const queryClient = useQueryClient()

    //     return useMutation({
    //         mutationFn: ({ id, data }: { id: string, data: CoOwnerGroupFormValues }) => coOwnerGroupApi.update(id, data),
    //         onSuccess: (_, variables) => {
    //             queryClient.invalidateQueries({
    //                 queryKey: coOwnerGroupKey.lists()
    //             })
    //             queryClient.invalidateQueries({ queryKey: coOwnerGroupKey.detail(variables.id) })
    //             toast.success("Cập nhật nhóm đồng sở hữu thành công")
    //         }
    //     })
    // },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => coOwnerGroupApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: coOwnerGroupKey.lists()
                })
            }
        })
    }
}

export default coOwnerGroupQueries