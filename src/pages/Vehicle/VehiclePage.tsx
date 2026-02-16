import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import vehicleQueries from "@/queries/vehicle.query";
import { useState } from "react";
import { vehicleColumns } from "./vehicle-columns";
import type { VehicleAction, VehiclePaginationParams, VehicleStatus } from "@/types/vehicle.type";
import { VEHICLE_STATUS_ACTIONS } from "@/constants/status/vehicle/vehicle-status-action";
import { useDebounce } from "use-debounce";
import { VehicleFilterSidebar } from "./vehicle-filter-sidebar";
import { DataTableFacetedFilter } from "./filters/data-table-faceted-filter";
import { VEHICLE_STATUS_MAPPING } from "@/constants/status/vehicle/vehicle-status";

export default function VehiclePage() {
    //========================== Pagination & Search & Filter ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [filters, setFilters] = useState<Omit<VehiclePaginationParams, "pageNumber" | "pageSize">>({
        searchTerm: "",
        status: undefined,
        vehicleModelId: undefined,
        yearFrom: undefined,
        yearTo: undefined,
        currentStationId: undefined,
        sortBy: "createdDate",
        sortOrder: "desc",
    });

    const [debouncedFilters] = useDebounce(filters.searchTerm, 500);

    const { data, isFetching } = vehicleQueries.usePagination({
        ...filters,
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: debouncedFilters,
    } as VehiclePaginationParams);


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

        // console.log("trest: ", actionConfig, currentStatus, action)

        if (!actionConfig) return

        updateStatusMutation.mutate({
            id,
            status: actionConfig.nextStatus, // 👈 CHỈ CÁI NÀY GỬI BE
        })
    }


    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý danh sách xe điện của người dùng</h1>

            {/* Search và Filter */}
            <div className="flex items-center py-4 justify-between mt-6 gap-2">
                <div className="flex items-center gap-2 flex-1">
                    <Input
                        placeholder="Tìm kiếm biển số xe..."
                        value={filters.searchTerm}
                        onChange={(e) => {
                            setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
                            setPagination(prev => ({ ...prev, pageIndex: 0 }));
                        }}
                        className="max-w-sm"
                    />

                    {/* Lọc Status */}
                    <DataTableFacetedFilter
                        title="Trạng thái"
                        options={Object.entries(VEHICLE_STATUS_MAPPING).map(([k, v]) => ({
                            label: v.label,
                            value: k
                        }))}
                        value={filters.status}
                        onChange={(val) => {
                            setFilters(prev => ({ ...prev, status: val as VehicleStatus }));
                            setPagination(prev => ({ ...prev, pageIndex: 0 }));
                        }}
                    />

                    {/* Component này chúng ta sẽ viết ở Bước 2 */}
                    <VehicleFilterSidebar filters={filters} setFilters={setFilters} />
                </div>

            </div>

            <DataTable
                columns={vehicleColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                    onAction: handleAction,
                }}
                sorting={[{
                    id: filters.sortBy || "createdDate",
                    desc: filters.sortOrder === "desc",
                }]}
                onSortingChange={(s) => {
                    const currentSort = s[0]; // Lấy cái đầu tiên vì mình sort đơn
                    setFilters(prev => ({
                        ...prev,
                        sortBy: currentSort?.id || "createdDate",
                        sortOrder: currentSort?.desc ? "desc" : "asc"
                    }));
                    // Reset về trang 1 khi sort để tránh lỗi dữ liệu
                    setPagination(prev => ({ ...prev, pageIndex: 0 }));
                }}

                isLoading={isFetching}
            />

        </div>
    )
}