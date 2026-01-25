import vehicleBrandApi from "@/apis/vehicle-brand.api";
import { vehicleBrandKey } from "@/constants/query-keys/vehicle-brand.key";
import type { VehicleBrandPaginationParams } from "@/types/vehicle-brand.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const vehicleBrandQueries = {
    useGetAll: () => {
        return useQuery({
            queryKey: vehicleBrandKey.getAll(),
            queryFn: () => vehicleBrandApi.getAll(),
            placeholderData: (previousData) => previousData,
        })
    },

    usePagination: (params: VehicleBrandPaginationParams) => {
        return useQuery({
            queryKey: vehicleBrandKey.getAllPagination(params),
            queryFn: () => vehicleBrandApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient() // Thêm cái này để invalidate sau khi xóa

        return useMutation({
            mutationFn: (id: string) => vehicleBrandApi.delete(id),
            onSuccess: () => {
                // Tự động làm mới danh sách sau khi xóa thành công
                queryClient.invalidateQueries({
                    queryKey: vehicleBrandKey.getAll() // Xóa sạch cache liên quan đến brand
                })
                toast.success("Xóa thành công")
            }
        })
    }
}

export default vehicleBrandQueries