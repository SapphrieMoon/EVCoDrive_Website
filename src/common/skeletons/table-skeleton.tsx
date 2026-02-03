import { Skeleton } from "@/components/ui/skeleton"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import type { TableSkeletonProps } from "@/types/commons/skeleton.type"

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