
import { useState } from "react";
import { VehicleBrandDataTable } from "../../common/data-table";
import { vehicleBrandColumns } from "./vehicle-brand.columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import vehicleBrandQueries from "@/queries/vehicle-brand.query";
import { VehicleBrandDetail } from "./vehicle-brand-detail";

export default function VehicleBrandPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const handleViewDetail = (id: string) => {
        setSelectedId(id)
        setIsDetailOpen(true)
    }

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isLoading } = vehicleBrandQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTermByName: search
    })

    console.log("asdads", data)

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý các thương hiệu xe</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm thương hiệu..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                <Button>
                    <PlusIcon className="w-4 h-4" />
                    Thêm thương hiệu
                </Button>
            </div>

            <VehicleBrandDataTable
                columns={vehicleBrandColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                    onViewDetail: handleViewDetail
                }}
                isLoading={isLoading}
            />

            <VehicleBrandDetail
                id={selectedId}
                open={isDetailOpen}
                onOpenChange={setIsDetailOpen}
            />
        </div>
    )
}