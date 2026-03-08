import bookingApi from "@/apis/booking.api"
import { bookingKey } from "@/constants/query-keys/booking.key"
import type { BookingPaginationParams, UsageQuotasRequest } from "@/types/booking.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const bookingQueries = {
    usePostUsageQuotas: () => {
        return useMutation({
            mutationFn: (params: UsageQuotasRequest) => bookingApi.postUsageQuotas(params),
        })
    },

    usePagination: (params: BookingPaginationParams) => {
        return useQuery({
            queryKey: bookingKey.listPagination(params),
            queryFn: () => bookingApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: bookingKey.detail(id),
            queryFn: () => bookingApi.getDetail(id),
            enabled: !!id,
        })
    },

    usePrefetchDetail: () => {
        const queryClient = useQueryClient();

        return (id: string) => {
            if (!id) return;
            queryClient.prefetchQuery({
                queryKey: bookingKey.detail(id),
                queryFn: () => bookingApi.getDetail(id),
                staleTime: 5 * 60 * 1000, //giữ data trong 5 phút
            })
        }
    },

    useCheckIn: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: ({ id, startOdometer }: { id: string; startOdometer: number }) =>
                bookingApi.patchCheckIn(id, startOdometer),
            onSuccess: (_, { id }) => {
                queryClient.invalidateQueries({
                    queryKey: bookingKey.lists()
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.detail(id)
                });
            },
        })
    },

    useCheckOut: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: ({ id, endOdometer }: { id: string; endOdometer: number }) =>
                bookingApi.patchCheckOut(id, endOdometer),
            onSuccess: (_, { id }) => {
                queryClient.invalidateQueries({
                    queryKey: bookingKey.lists()
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.detail(id)
                });
            },
        })
    },
}

export default bookingQueries