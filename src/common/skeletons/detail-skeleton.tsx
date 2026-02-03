import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { DetailSkeletonProps } from "@/types/commons/skeleton.type";

export function DetailSkeleton({
    hasHeaderIcon = true,
    rowCount = 4,
    className
}: DetailSkeletonProps) {
    return (
        <div className={cn("space-y-8 py-6", className)}>
            {/* Header Section Skeleton */}
            <div className="flex flex-col items-center justify-center space-y-4">
                {hasHeaderIcon && <Skeleton className="h-24 w-24 rounded-full" />}
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Info Rows Skeleton */}
            <div className="space-y-4">
                {Array.from({ length: rowCount }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-lg border p-4">
                        <Skeleton className="h-3 w-20" /> {/* Label */}
                        <Skeleton className="h-5 w-full" /> {/* Value */}
                    </div>
                ))}
            </div>

            {/* Optional: Footer Action Skeleton */}
            <div className="pt-4 border-t flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 flex-1 rounded-md" />
            </div>
        </div>
    )
}