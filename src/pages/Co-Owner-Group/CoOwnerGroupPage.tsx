import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import coOwnerGroupQueries from "@/queries/co-owner-group.query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { coOwnerGroupColumns } from "./co-owner-group-columns";

export default function CoOwnerGroupPage() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    // searchInput: cập nhật ngay theo từng keystroke (UI responsive)
    // debouncedSearch: chỉ thay đổi sau 500ms ngừng gõ (để trigger query)
    const [searchInput, setSearchInput] = useState("")
    const [debouncedSearch] = useDebounce(searchInput, 500)

    const { data, isFetching } = coOwnerGroupQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: debouncedSearch
    })

    return (
        <div className="space-y-2 m-4">
            <h1 className="text-4xl font-bold">Quản lý danh sách nhóm đồng sở hữu</h1>

            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm nhóm..."
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                        setPagination(prev => ({ ...prev, pageIndex: 0 }))
                    }}
                    className="max-w-sm"
                />
            </div>

            <DataTable
                columns={coOwnerGroupColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{}}        
                isLoading={isFetching}
            />
        </div>
    )
}