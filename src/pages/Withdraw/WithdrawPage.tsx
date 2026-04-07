import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import withdrawQueries from "@/queries/withdraw.query";
import { useState } from "react";
import { withdrawColumns } from "./withdraw-columns";

export default function WithdrawPage() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isRefetching } = withdrawQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
    })

    return (
        <div className="space-y-4 m-4">
            <h1 className="text-4xl font-bold">Quản lý rút tiền</h1>

            <div className="flex items-center justify-between">
                <Input
                    placeholder="Tìm kiếm giao dịch..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />
            </div>

            <DataTable
                columns={withdrawColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                isLoading={isRefetching}
            />
        </div>
    )
}