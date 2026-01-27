import { Skeleton } from "@/components/ui/skeleton"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"

interface TableSkeletonProps {
    columnCount: number // Số cột của bảng
    rowCount?: number    // Số dòng muốn hiển thị (mặc định 5-10)
}

export function TableSkeleton({ columnCount, rowCount = 10 }: TableSkeletonProps) {
    return (
        <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i} className="h-16"> {/* Giữ chiều cao khớp với hàng thật */}
                    {Array.from({ length: columnCount }).map((_, j) => (
                        <TableCell key={j}>
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    )
}