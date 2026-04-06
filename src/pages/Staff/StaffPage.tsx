import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import staffQueries from "@/queries/staff.query";
import { useState } from "react";
import { staffColumns } from "./staff-columns";
import { StaffDetail } from "./staff-detail";
import { StaffForm } from "./staff-form";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StaffPage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isFetching } = staffQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: search,
        stationId: ""
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

            <h1 className="text-4xl font-bold">Quản lý danh sách nhân viên</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm nhân viên..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination((prev: any) => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                <Button onClick={handleCreate}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Thêm nhân viên mới
                </Button>
            </div>

            <DataTable
                columns={staffColumns}
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
                <StaffDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}

            <StaffForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            />
        </div>
    )
}