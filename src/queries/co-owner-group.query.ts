import { coOwnerGroupApi } from "@/apis/co-owner-group.api"
import { coOwnerGroupKey } from "@/constants/query-keys/co-owner-group.key"
import type { CoOwnerGroupPaginationParams, CoOwnerGroupStatus } from "@/types/co-owner-group.type"
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
    },

    usePrefetchDetail: () => {
        const queryClient = useQueryClient()

        return (id: string) => {
            if (!id) return;
            queryClient.prefetchQuery({
                queryKey: coOwnerGroupKey.detail(id),
                queryFn: () => coOwnerGroupApi.getDetail(id),
                staleTime: 5 * 60 * 1000, //giữ data trong 5 phút
            })
        }
    },

    useUpdateStatus: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, status }: { id: string, status: CoOwnerGroupStatus }) => coOwnerGroupApi.updateStatus(id, status),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: coOwnerGroupKey.lists()
                })
                queryClient.invalidateQueries({
                    queryKey: coOwnerGroupKey.detail(variables.id)
                })
            }
        })
    },

    useRejectStatus: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, reason }: { id: string, reason: string }) => coOwnerGroupApi.rejectStatus(id, reason),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: coOwnerGroupKey.lists()
                })
                queryClient.invalidateQueries({
                    queryKey: coOwnerGroupKey.detail(variables.id)
                })
            }
        })
    }
}

export default coOwnerGroupQueries