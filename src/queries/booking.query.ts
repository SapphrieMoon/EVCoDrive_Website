import bookingApi from "@/apis/booking.api"
import { bookingKey } from "@/constants/query-keys/booking.key"
import { extraFeeKey } from "@/constants/query-keys/extra-fee"
import type { AvaliableBookingParams, BookingPaginationParams, CheckInRequest, CheckOutRequest, UsageQuotasRequest } from "@/types/booking.type"
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
            mutationFn: ({ bookingId, handoverLogId, body }: { bookingId: string; handoverLogId: string, body: CheckInRequest }) =>
                bookingApi.patchCheckIn(bookingId, handoverLogId, body),
            onSuccess: (_, { bookingId, handoverLogId }) => {
                queryClient.invalidateQueries({
                    queryKey: bookingKey.lists()
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.detail(bookingId)
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.handoverLogs(handoverLogId)
                });
            },
        })
    },

    useCheckOut: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: ({ bookingId, handoverLogId, body }: { bookingId: string; handoverLogId: string, body: CheckOutRequest }) =>
                bookingApi.patchCheckOut(bookingId, handoverLogId, body),
            onSuccess: (_, { bookingId, handoverLogId }) => {
                queryClient.invalidateQueries({
                    queryKey: bookingKey.lists()
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.detail(bookingId)
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.handoverLogs(handoverLogId)
                });
                queryClient.invalidateQueries({
                    queryKey: extraFeeKey.all(),
                })
            },
        })
    },

    useHandoverLogs: (id: string) => {
        return useQuery({
            queryKey: bookingKey.handoverLogs(id),
            queryFn: () => bookingApi.getHandoverLogs(id),
            enabled: !!id,
        })
    },

    useDetectDamage: () => {
        return useMutation({
            mutationFn: (images: File[]) => bookingApi.postDetectDamage(images),
            // onSuccess: () => {
            //     queryClient.invalidateQueries({
            //         queryKey: bookingKey.lists()
            //     });
            //     queryClient.invalidateQueries({
            //         queryKey: bookingKey.detail(bookingId)
            //     });
            //     queryClient.invalidateQueries({
            //         queryKey: bookingKey.handoverLogs(handoverLogId)
            //     });
            // },
        })
    },

    useFaceSearchBooking: () => {
        return useMutation({
            mutationFn: (image: File) => bookingApi.postFaceSearchBooking(image),
        })
    },

    useAvaliableBooking: (params: AvaliableBookingParams) => {
        return useQuery({
            queryKey: bookingKey.avaliableBooking(params),
            queryFn: () => bookingApi.getAvaliableBooking(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDeleteBooking: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ bookingId, cancellationReason, handoverLogId }: { bookingId: string; cancellationReason: string; handoverLogId?: string }) =>
                bookingApi.deleteBooking(bookingId, cancellationReason, handoverLogId),
            onSuccess: (_, { bookingId }) => {
                queryClient.invalidateQueries({
                    queryKey: bookingKey.lists(),
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.detail(bookingId),
                });
                queryClient.invalidateQueries({
                    queryKey: extraFeeKey.all(),
                });
                queryClient.invalidateQueries({
                    queryKey: bookingKey.all(),
                });
            },
        });
    },
}

export default bookingQueries