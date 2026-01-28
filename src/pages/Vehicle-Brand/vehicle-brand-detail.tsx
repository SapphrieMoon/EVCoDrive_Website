import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Hash, Info } from "lucide-react"
import vehicleBrandQueries from "@/queries/vehicle-brand.query"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/utils/date"

interface VehicleBrandDetailProps {
    id: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function VehicleBrandDetail({ id, open, onOpenChange }: VehicleBrandDetailProps) {
    const { data, isLoading } = vehicleBrandQueries.useGetDetail(id as string)

    console.log("data", data?.data)

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        Chi tiết thương hiệu
                    </SheetTitle>
                    <SheetDescription>
                        Thông tin đầy đủ của hãng xe trong hệ thống
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-8 py-6">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-xl border bg-card p-4 shadow-sm">
                            <img
                                src={data?.data.data.logoUrl}
                                alt={data?.data.data.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <Badge variant="secondary" className="text-base px-4">{data?.data.data.name}</Badge>
                    </div>

                    {/* Info Section */}
                    {isLoading ? (
                        // 👈 SKELETON KHI ĐANG LOAD
                        <div className="space-y-8 py-6">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <Skeleton className="h-32 w-32 rounded-xl" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 ml-4">
                            <div className="flex items-start gap-3 rounded-lg border p-3">
                                <Hash className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground uppercase">Mã định danh</p>
                                    <p className="text-sm font-mono break-all leading-relaxed">{data?.data.data.vehicleBrandId}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-lg border p-3">
                                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground uppercase">Ngày khởi tạo</p>
                                    <p className="text-sm">{formatDate(data?.data.data.createdDate)}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-lg border p-3">
                                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground uppercase">Cập nhật lần cuối</p>
                                    <p className="text-sm">{formatDate(data?.data.data.updatedDate)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}