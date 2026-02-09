import { DataTable } from "@/common/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import vehicleModelQueries from "@/queries/vehicle-model.query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { vehicleModelColumns } from "./vehicle-model-columns";
import { VehicleModelDetail } from "./vehicle-model-detail";
import type { CrudFormMode } from "@/types/commons/crud-form.type";
import { VehicleModelForm } from "./vehicle-model-form";

export default function VehicleModelPage() {
    //======================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isRefetching } = vehicleModelQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTermByName: search
    })

    //======================== View Detail ==========================
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const handleViewDetail = (id: string) => {
        setSelectedId(id)
        setIsDetailOpen(true)
    }

    //======================== Create / Update ==========================
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<CrudFormMode>("create")
    const [editingId, setEditingId] = useState<string | null>(null)

    const handleCreate = () => {
        setDialogMode("create")
        setEditingId(null)
        setDialogOpen(true)
    }

    const handleEdit = (id: string) => {
        setDialogMode("update")
        setEditingId(id)
        setDialogOpen(true)
    }

    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý các dòng xe</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm dòng xe..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                <Button onClick={handleCreate}>
                    <PlusIcon className="w-4 h-4" />
                    Thêm dòng xe
                </Button>
            </div>

            <DataTable
                columns={vehicleModelColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                    onViewDetail: handleViewDetail,
                    onEdit: handleEdit,
                }}
                isLoading={isRefetching}
            />

            {selectedId && (
                <VehicleModelDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}

            <VehicleModelForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            />

        </div>
    )
}