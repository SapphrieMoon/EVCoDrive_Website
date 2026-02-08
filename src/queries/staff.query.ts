import { staffApi } from "@/apis/staff.api"
import { staffKey } from "@/constants/query-keys/staff.key"
import type { StaffFormValues } from "@/schema/staff.schema"
import type { StaffPaginationParams } from "@/types/staff.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const staffQueries = {
    useAll: () => {
        return useQuery({
            queryKey: staffKey.all(),
            queryFn: staffApi.getAll
        })
    },

    usePagination: (params: StaffPaginationParams) => {
        return useQuery({
            queryKey: staffKey.listPagination(params),
            queryFn: () => staffApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: staffKey.detail(id),
            queryFn: () => staffApi.getDetail(id),
            enabled: !!id
        })
    },

    useCreate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: StaffFormValues) => staffApi.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: staffKey.lists()
                })
            }
        })
    },

    useUpdate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, data }: { id: string, data: StaffFormValues }) => staffApi.update(id, data),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: staffKey.lists()
                })
                queryClient.invalidateQueries({ queryKey: staffKey.detail(variables.id) })
                toast.success("Cập nhật nhân viên thành công")
            }
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => staffApi.detele(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: staffKey.lists()
                })
            }
        })
    }
}

export default staffQueries