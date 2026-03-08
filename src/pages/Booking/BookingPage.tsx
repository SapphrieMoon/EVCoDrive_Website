import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import bookingQueries from "@/queries/booking.query";
import { useState } from "react";
import { bookingColumns } from "./booking-columns";
import { BookingDetail } from "./booking-detail";

export default function BookingPage() {
    //========================== Pagination ==========================
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const [search, setSearch] = useState("");

    const { data, isFetching } = bookingQueries.usePagination({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        bookingCode: search
    })

    //========================== Detail ==========================
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleViewDetail = (id: string) => {
        setSelectedId(id);
        setIsDetailOpen(true);
    }

    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý danh sách lịch đặt xe</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <Input
                    placeholder="Tìm kiếm lịch đặt xe..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination(prev => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="max-w-sm"
                />

                {/* <Button >
                    <PlusIcon className="w-4 h-4" />
                    Thêm nhóm đồng sở hữu
                </Button> */}
            </div>

            <DataTable
                columns={bookingColumns}
                data={data?.data.data.items ?? []}
                pageCount={data?.data.data.totalPages ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                meta={{
                    onViewDetail: handleViewDetail
                }}

                isLoading={isFetching}
            />

            {selectedId && (
                <BookingDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )}

            {/* <StationForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            /> */}
        </div>
    )
}