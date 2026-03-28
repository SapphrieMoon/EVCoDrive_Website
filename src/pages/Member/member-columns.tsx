import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Member } from "@/types/user.type"
import { formatDate } from "@/utils/date"
import type { ColumnDef } from "@tanstack/react-table"

export const memberColumns: ColumnDef<Member>[] = [
    {
        accessorKey: "fullName",
        header: "Người dùng",
        enableSorting: false,
        cell: ({ row }) => {
            const { fullName, email } = row.original

            return (
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{fullName}</span>
                    <span className="text-xs text-muted-foreground">{email}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Số điện thoại",
        enableSorting: false,
        cell: ({ row }) => {
            const phone = row.original.phone
            return (
                <span className="text-sm">
                    {phone || "—"}
                </span>
            )
        }
    },
    {
        accessorKey: "isActive",
        header: "Trạng thái",
        enableSorting: false,
        cell: ({ row }) => {
            const isActive = row.original.isActive

            return (
                <Badge
                    variant="outline"
                    className={cn(
                        "font-medium",
                        isActive ? "text-green-600" : "text-red-600"
                    )}
                >
                    {isActive ? "Hoạt động" : "Bị khóa"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        enableSorting: false,
        cell: ({ row }) => {
            return (
                <span className="text-sm">
                    {formatDate(row.original.createdDate)}
                </span>
            )
        }
    }
]