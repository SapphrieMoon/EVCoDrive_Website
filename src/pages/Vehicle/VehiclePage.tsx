import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import vehicleQueries from "@/queries/vehicle.query";
import { useState } from "react";
import { vehicleColumns } from "./vehicle-columns";
import type { VehicleAction, VehicleStatus } from "@/types/vehicle.type";
import { VEHICLE_STATUS_ACTIONS } from "@/constants/status/vehicle/vehicle-status-action";
import { VehicleDetail } from "./vehicle-detail";

export default function VehiclePage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isFetching } = vehicleQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: search
    })
    //========================== End Pagination ==========================

    //========================== Update Status ==========================
    const updateStatusMutation = vehicleQueries.useUpdateStatus()

    const handleAction = (
        id: string,
        currentStatus: VehicleStatus,
        action: VehicleAction
    ) => {
        const actionConfig =
            VEHICLE_STATUS_ACTIONS[currentStatus]?.find(
                a => a.type === action
            )

        console.log("trest: ", actionConfig, currentStatus, action)

        if (!actionConfig) return

        updateStatusMutation.mutate({
            id,
            status: actionConfig.nextStatus, // 👈 CHỈ CÁI NÀY GỬI BE
        })
    }
    //========================== End Update Status ==========================

    //========================== View Detail ==========================
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const handleViewDetail = (id: string) => {
        setSelectedId(id)
        setIsDetailOpen(true)
    }


    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý danh sách xe điện của người dùng</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm hợp đồng..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                {/* <Button>
                    <PlusIcon className="w-4 h-4" />
                    Thêm hợp đồng
                </Button> */}
            </div>

            <DataTable
                columns={vehicleColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                    onAction: handleAction,
                    onViewDetail: handleViewDetail
                }}

                isLoading={isFetching}
            />

            {selectedId && (
                <VehicleDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}
        </div>
    )
}