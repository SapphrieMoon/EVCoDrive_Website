import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import stationQueries from "@/queries/station.query";
import { useState } from "react";
import { stationColumns } from "./station-columns";
import { StationDetail } from "./station-detail";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import type { CrudFormMode } from "@/types/commons/crud-form.type";
import { StationForm } from "./station-form";

export default function StationPage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isFetching } = stationQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: search
    })

    //========================== Detail ==========================
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleViewDetail = (id: string) => {
        setSelectedId(id);
        setIsDetailOpen(true);
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

            <h1 className="text-4xl font-bold">Quản lý danh sách trạm kiểm tra</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm trạm..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                <Button onClick={handleCreate}>
                    <PlusIcon className="w-4 h-4" />
                    Thêm trạm
                </Button>
            </div>

            <DataTable
                columns={stationColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                    onViewDetail: handleViewDetail,
                    onEdit: handleEdit
                }}

                isLoading={isFetching}
            />

            {selectedId && (
                <StationDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}

            <StationForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            />
        </div>
    )
}
