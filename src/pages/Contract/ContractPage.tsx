import { DataTable } from "@/common/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import contractQueries from "@/queries/contract.query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { contractColumns } from "./contract.columns";

export default function ContractPage() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isLoading } = contractQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: search
    })
    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý các hợp đồng</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm hợp đồng..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                <Button>
                    <PlusIcon className="w-4 h-4" />
                    Thêm hợp đồng
                </Button>
            </div>

            <DataTable
                columns={contractColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}

                isLoading={isLoading}
            />
        </div>
    )
}