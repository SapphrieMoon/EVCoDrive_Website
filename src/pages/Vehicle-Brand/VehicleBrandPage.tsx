import { useVehicleBrandPaginationQuery } from "@/queries/vehicle-brand.query";
import { useState } from "react";
import { VehicleBrandDataTable } from "./vehicle-brand.data-table";
import { vehicleBrandColumns } from "./vehicle-brand.columns";

export default function VehicleBrandPage() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const { data, isLoading } = useVehicleBrandPaginationQuery({
        pageNumber: pagination.pageIndex + 1, // 👈 convert sang BE
        pageSize: pagination.pageSize
    })

    console.log("asdads", data)

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Vehicle Brands</h1>

            <VehicleBrandDataTable
                columns={vehicleBrandColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
            />
        </div>
    )
}