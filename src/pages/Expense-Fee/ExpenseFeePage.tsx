
import { DataTable } from "@/common/data-table";
import { expenseFeeQueries } from "@/queries/expense-fee.query";
import { useState } from "react";
import { expenseColumns } from "./expense-fee-columns";

export default function ExpenseFeePage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    // const [search, setSearch] = useState("");

    const { data, isFetching } = expenseFeeQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
    })

    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý danh sách các biểu quyết</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                {/* <Input
                    placeholder="Tìm kiếm trạm..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                /> */}

                {/* <Button onClick={handleCreate}>
                    <PlusIcon className="w-4 h-4" />
                    Thêm trạm
                </Button> */}
            </div>

            <DataTable
                columns={expenseColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                }}

                isLoading={isFetching}
            />

            {/* {selectedId && (
                <ExpenseFeeDetailPage
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )} */}

            {/* <StationForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            /> */}
        </div>
    )
}