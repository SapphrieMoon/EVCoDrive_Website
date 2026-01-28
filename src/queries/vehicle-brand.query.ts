import vehicleBrandApi from "@/apis/vehicle-brand.api";
import { vehicleBrandKey } from "@/constants/query-keys/vehicle-brand.key";
import type { VehicleBrandFormValues } from "@/schema/vehicle-brand.schema";
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
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => vehicleBrandApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: vehicleBrandKey.getAll()
                })
                toast.success("Xóa thành công")
            }
        })
    },

    useGetDetail: (id: string) => {
        return useQuery({
            queryKey: vehicleBrandKey.getDetail(id),
            queryFn: () => vehicleBrandApi.detail(id),
            placeholderData: (previousData) => previousData,
            enabled: !!id
        })
    },

    useCreate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: VehicleBrandFormValues) => vehicleBrandApi.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: vehicleBrandKey.getAll()
                })
                toast.success("Thêm thành công")
            }
        })
    },

    useUpdate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, data }: { id: string, data: VehicleBrandFormValues }) => vehicleBrandApi.update(id, data),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: vehicleBrandKey.getAll()
                })
                queryClient.invalidateQueries({ queryKey: vehicleBrandKey.getDetail(variables.id) })
                toast.success("Cập nhật thành công")
            }
        })
    }
}

export default vehicleBrandQueries