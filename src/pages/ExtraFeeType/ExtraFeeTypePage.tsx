import { DataTable } from "@/common/data-table";
import { extraFeeTypeQueries } from "@/queries/extra-fee.query";
import { useState } from "react";
import { extraFeeTypeColumns } from "./extra-fee-type-columns";
import { ExtraFeeTypeDetail } from "./extra-fee-type-detail";
import { ExtraFeeTypeForm } from "./extra-fee-type-form";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExtraFeeTypePage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const { data, isFetching } = extraFeeTypeQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
    })

    //========================== Detail ==========================
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleViewDetail = (id: string) => {
        setSelectedId(id);
        setIsDetailOpen(true);
    }

    //========================== Form ==========================
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
    const [editingId, setEditingId] = useState<string | undefined>(undefined);

    const handleCreate = () => {
        setDialogMode("create");
        setEditingId(undefined);
        setDialogOpen(true);
    };

    const handleEdit = (id: string) => {
        setDialogMode("update");
        setEditingId(id);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý loại phụ phí</h1>


            <div className="flex items-center py-4 justify-end mt-6">
                <Button onClick={handleCreate}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Thêm loại phụ phí mới
                </Button>
            </div>

            <DataTable
                columns={extraFeeTypeColumns}
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
                <ExtraFeeTypeDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}

            <ExtraFeeTypeForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            />
        </div>
    )
}