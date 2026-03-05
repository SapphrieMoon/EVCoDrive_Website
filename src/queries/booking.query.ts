import bookingApi from "@/apis/booking.api"
import type { UsageQuotasRequest } from "@/types/booking.type"
import { useMutation } from "@tanstack/react-query"

const bookingQueries = {
    usePostUsageQuotas: () => {
        return useMutation({
            mutationFn: (params: UsageQuotasRequest) => bookingApi.postUsageQuotas(params),
        })
    }
}

export default bookingQueries