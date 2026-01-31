import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import vehicleQueries from "@/queries/vehicle.query";
import { useState } from "react";
import { vehicleColumns } from "./vehicle-columns";
import type { VehicleStatus } from "@/types/vehicle.type";

export default function VehiclePage() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isLoading } = vehicleQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: search
    })

    const updateStatusMutation = vehicleQueries.useUpdateStatus()

    const handleApprove = (id: string, status: VehicleStatus) => {
        updateStatusMutation.mutate({ id, status })
    }

    const handleReject = (id: string, status: VehicleStatus) => {
        updateStatusMutation.mutate({ id, status })
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
                    onApprove: handleApprove,
                    onReject: handleReject,
                }}

                isLoading={isLoading}
            />
        </div>
    )
}