import { vehicleApi } from "@/apis/vehicle.api"
import { vehicleKey } from "@/constants/query-keys/vehicle.key"
import { VehicleStatus, type VehiclePaginationParams } from "@/types/vehicle.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const vehicleQueries = {
    useAll: () => {
        return useQuery({
            queryKey: vehicleKey.all(),
            queryFn: vehicleApi.getAll,
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

    useDetail: (id: string) => {
        const safeId = id ?? ""

        return useQuery({
            queryKey: vehicleKey.detail(safeId),
            queryFn: () => vehicleApi.getDetail(safeId),
            placeholderData: (previousData) => previousData,
            enabled: !!id
        })
    },

    usePrefetchDetail: () => {
        const queryClient = useQueryClient()

        return (id: string) => {
            if (!id) return;
            queryClient.prefetchQuery({
                queryKey: vehicleKey.detail(id),
                queryFn: () => vehicleApi.getDetail(id),
                staleTime: 5 * 60 * 1000
            })
        }
    },

    useUpdateStatus: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, status, rejectionReason }: { id: string, status: VehicleStatus, rejectionReason?: string }) => vehicleApi.updateStatus(id, status, rejectionReason),

            onSuccess: (_data, variables) => {
                queryClient.invalidateQueries({
                    queryKey: vehicleKey.lists(),
                })
                queryClient.invalidateQueries({
                    queryKey: vehicleKey.detail(variables.id)
                })
                toast.success("Cập nhật trạng thái thành công")
            }
        })
    }
}

export default vehicleQueries