import { DataTable } from "@/common/data-table";
import { expenseFeeTypeQueries } from "@/queries/expense-fee.query";
import { useState } from "react";
import { expenseFeeTypeColumns } from "./expense-fee-type-columns";
import { ExpenseFeeTypeDetail } from "./expense-fee-type-detail";
import { ExpenseFeeTypeForm } from "./expense-fee-type-form";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export default function ExpenseFeeTypePage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    // const [search, setSearch] = useState("");

    const { data, isFetching } = expenseFeeTypeQueries.usePagination({
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

            <h1 className="text-4xl font-bold">Quản lý loại phí</h1>


            <div className="flex items-center py-4 justify-end mt-6">
                {/* <Input
                    placeholder="Tìm kiếm loại phí..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination((prev: any) => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                /> */}

                <Button onClick={handleCreate}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Thêm loại phí mới
                </Button>
            </div>

            <DataTable
                columns={expenseFeeTypeColumns}
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
                <ExpenseFeeTypeDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}

            <ExpenseFeeTypeForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            />
        </div>
    )
}