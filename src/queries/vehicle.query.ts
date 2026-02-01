import { vehicleApi } from "@/apis/vehicle.api"
import { vehicleKey } from "@/constants/query-keys/vehicle.key"
import { VehicleStatus, type VehiclePaginationParams } from "@/types/vehicle.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const vehicleQueries = {
    useGetAll: () => {
        return useQuery({
            queryKey: vehicleKey.all(),
            queryFn: () => vehicleApi.getAll(),
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

    useGetDetail: (id: string) => {
        const safeId = id ?? ""

        return useQuery({
            queryKey: vehicleKey.detail(safeId),
            queryFn: () => vehicleApi.getDetail(safeId),
            placeholderData: (previousData) => previousData,
            enabled: !!id
        })
    },

    useUpdateStatus: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, status }: { id: string, status: VehicleStatus }) => vehicleApi.updateStatus(id, status),

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: vehicleKey.lists(),
                })
                toast.success("Cập nhật trạng thái thành công")
            }
        })
    }
}

export default vehicleQueries