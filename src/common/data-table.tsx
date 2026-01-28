import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    type TableMeta,
    flexRender,
    getCoreRowModel,
    // getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableSkeleton } from "./skeletons/table-skeleton"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: PaginationState
    onPaginationChange: (pagination: PaginationState) => void
    sorting?: SortingState
    onSortingChange?: (sorting: SortingState) => void
    pageCount: number
    meta?: TableMeta<TData>
    isLoading?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    onPaginationChange,
    sorting = [],
    onSortingChange = () => { },
    pageCount,
    meta,
    isLoading,
}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        pageCount,
        // getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination,
        },
        meta,
        onSortingChange: (updaterOrValue) => {
            const newSorting = typeof updaterOrValue === "function"
                ? updaterOrValue(sorting)
                : updaterOrValue
            onSortingChange(newSorting)
        },
        onPaginationChange: (updaterOrValue) => {
            const newPagination =
                typeof updaterOrValue === "function"
                    ? updaterOrValue(pagination)
                    : updaterOrValue
            onPaginationChange(newPagination)
        },
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
    })

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="h-20">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {isLoading ? (
                        <TableSkeleton
                            columnCount={columns.length}
                            rowCount={pagination.pageSize}
                        />
                    ) : (
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="h-16"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Không có dữ liệu.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-6">
                    <div className="text-sm text-muted-foreground">
                        Trang {pagination.pageIndex + 1} / {pageCount}
                    </div>

                    {/* Chọn số dòng trên mỗi trang (Page Size) */}
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Số dòng:</p>
                        <Select
                            value={`${pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Nút về trang đầu */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trước
                    </Button>

                    {/* Hiển thị danh sách số trang (Đơn giản) */}
                    <div className="flex items-center gap-1">
                        {Array.from({ length: pageCount }, (_, i) => i).map((pageIdx) => {
                            // Chỉ hiển thị vài trang xung quanh trang hiện tại để tránh quá dài
                            if (
                                pageIdx === 0 ||
                                pageIdx === pageCount - 1 ||
                                (pageIdx >= pagination.pageIndex - 1 && pageIdx <= pagination.pageIndex + 1)
                            ) {
                                return (
                                    <Button
                                        key={pageIdx}
                                        variant={pagination.pageIndex === pageIdx ? "default" : "outline"}
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => table.setPageIndex(pageIdx)}
                                    >
                                        {pageIdx + 1}
                                    </Button>
                                )
                            }
                            // Hiện dấu ... nếu khoảng cách xa
                            if (pageIdx === 1 || pageIdx === pageCount - 2) {
                                return <span key={pageIdx}>...</span>
                            }
                            return null
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Sau
                    </Button>

                    {/* Nút đến trang cuối */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(pageCount - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
