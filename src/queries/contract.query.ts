import contractApi from "@/apis/contract.api"
import { contractKey } from "@/constants/query-keys/contract.key"
import type { ContractPaginationParams } from "@/types/contract.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const contractQueries = {
    useAll: () => {
        return useQuery({
            queryKey: contractKey.all(),
            queryFn: () => contractApi.getAll(),
            placeholderData: (previousData) => previousData,
        })
    },

    usePagination: (params: ContractPaginationParams) => {
        return useQuery({
            queryKey: contractKey.listPagination(params),
            queryFn: () => contractApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: contractKey.detail(id),
            queryFn: () => contractApi.getDetail(id),
            enabled: !!id
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => contractApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: contractKey.lists()
                })
                toast.success("Xóa thành công")
            }
        })
    },

    useGetPDF: () => {
        return useMutation({
            mutationFn: (id: string) => contractApi.getPDF(id),

            onSuccess: (response, id) => {
                const blob = response.data; // đã là Blob

                const url = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = `contract-${id}.pdf`;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);

                toast.success("Tải xuống thành công");
            },

            onError: () => {
                toast.error("Tải xuống thất bại");
            }
        });
    }

}

export default contractQueries