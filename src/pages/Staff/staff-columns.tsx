import { TableActionCell } from "@/common/table-action-cell";
import { DeleteAction } from "@/common/table-delete-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import staffQueries from "@/queries/staff.query";
import type { Staff } from "@/types/staff.type";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { MapPin, Phone } from "lucide-react";

export const staffColumns: ColumnDef<Staff>[] = [
    {
        accessorKey: "name",
        header: "Nhân viên",
        enableSorting: false,
        cell: ({ row }) => {
            const staff = row.original;

            return (
                <div className="flex items-center gap-3 py-1">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback>
                            {staff.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="font-semibold text-sm leading-none">
                            {staff.name}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {staff.phoneNumber}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Địa chỉ",
        enableSorting: false,
        cell: ({ row }) => {
            const { address } = row.original;

            return (
                <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[250px]">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate" title={address}>
                        {address}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "stationName",
        header: "Trạm",
        enableSorting: false,
        cell: ({ row }) => {
            return (
                <span className="text-sm font-medium">
                    {row.original.stationName}
                </span>
            );
        },
    },
    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        enableSorting: false,
        cell: ({ row }) => {
            const date = row.original.createdDate;

            return (
                <span className="text-sm tabular-nums">
                    {format(new Date(date), "dd/MM/yyyy HH:mm")}
                </span>
            );
        },
    },
    {
        accessorKey: "updatedDate",
        header: "Cập nhật",
        enableSorting: false,
        cell: ({ row }) => {
            const date = row.original.updatedDate;

            return (
                <span className="text-sm tabular-nums">
                    {format(new Date(date), "dd/MM/yyyy HH:mm")}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Thao tác",
        enableSorting: false,
        cell: ({ row, table }) => {
            const id = row.original.staffId;
            const { mutate, isPending } = staffQueries.useDelete();

            return (
                <TableActionCell
                    onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                    onEditClick={() => table.options.meta?.onEdit?.(id)}
                >
                    <DeleteAction
                        onConfirm={() => mutate(id)}
                        isLoading={isPending}
                    />
                </TableActionCell>
            );
        },
    },
];