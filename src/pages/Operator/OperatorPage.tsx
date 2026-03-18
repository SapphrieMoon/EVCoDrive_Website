import operatorQueries from "@/queries/operator.query";
import { useState } from "react";
import { DataTable } from "@/common/data-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OperatorDetail } from "./operator-detail";
import type { CrudFormMode } from "@/types/commons/crud-form.type";
import { operatorColumns } from "./operator-columns";
import { OperatorForm } from "./operator-form";

export default function OperatorPage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isFetching } = operatorQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTermByNameOrEmail: search
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

            <h1 className="text-4xl font-bold">Quản lý nhân viên điều hành trạm</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm nhân viên bằng tên hoặc email..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                <Button onClick={handleCreate}>
                    <PlusIcon className="w-4 h-4" />
                    Thêm nhân viên điều hành trạm mới
                </Button>
            </div>

            <DataTable
                columns={operatorColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                    onViewDetail: handleViewDetail,
                    onEdit: handleEdit,
                }}

                isLoading={isFetching}
            />

            {selectedId && (
                <OperatorDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}

            <OperatorForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            />
        </div>
    )
}