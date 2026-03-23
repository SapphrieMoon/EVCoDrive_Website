import { DataTable } from "@/common/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bookingQueries from "@/queries/booking.query";
import { useState, useRef } from "react";
import { bookingColumns } from "./booking-columns";
import { ScanFace, Camera, X } from "lucide-react";

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

    //========================== Face Search Booking ==========================
    const faceSearchBookingMutation = bookingQueries.useFaceSearchBooking();
    const fileInputRef = useRef<HTMLInputElement>(null);

    //========================== Detail ==========================
    // const [isDetailOpen, setIsDetailOpen] = useState(false);
    // const [selectedId, setSelectedId] = useState<string | null>(null);

    // const handleViewDetail = (id: string) => {
    //     setSelectedId(id);
    //     setIsDetailOpen(true);
    // }

    return (
        <div className="space-y-2 m-4">

            <h1 className="text-4xl font-bold">Quản lý danh sách lịch đặt xe</h1>


            <div className="flex items-center py-4 justify-between mt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full">
                    <Input
                        placeholder="Tìm kiếm lịch đặt xe..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPagination(prev => ({ ...prev, pageIndex: 0 }));
                        }}
                        className="max-w-sm"
                    />

                    <div className="flex items-center gap-3">
                        <label
                            htmlFor="face-search-input"
                            className={`flex items-center gap-2 px-4 py-2 bg-background border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer text-sm font-medium text-muted-foreground ${faceSearchBookingMutation.isPending ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <Camera className="w-4 h-4 text-primary" />
                            <span>Tải ảnh khuôn mặt</span>
                        </label>
                        <input
                            id="face-search-input"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    faceSearchBookingMutation.mutate(file);
                                }
                            }}
                            disabled={faceSearchBookingMutation.isPending}
                            className="hidden"
                        />
                        {faceSearchBookingMutation.isPending && (
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                <span className="text-sm">Đang tìm...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* <Button >
                    <PlusIcon className="w-4 h-4" />
                    Thêm nhóm đồng sở hữu
                </Button> */}
            </div>

            {faceSearchBookingMutation.data ? (
                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800/50 p-6 rounded-xl flex flex-col sm:flex-row gap-4 justify-between sm:items-center shadow-sm">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-blue-100 dark:border-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <ScanFace className="w-7 h-7" />
                            </div>
                            <div className="space-y-1.5">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                    {faceSearchBookingMutation.data.data.data.memberName}
                                    <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 text-xs font-semibold tracking-wide border border-green-200 dark:border-green-800/50">
                                        Khách hàng
                                    </span>
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                    Tìm thấy tự động với độ chính xác
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">{(faceSearchBookingMutation.data.data.data.confidence * 100).toFixed(2)}%</span>
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:bg-gray-900 dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:hover:border-red-900/50 sm:w-auto w-full transition-colors"
                            onClick={() => {
                                faceSearchBookingMutation.reset();
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Đóng kết quả
                        </Button>
                    </div>

                    <DataTable
                        columns={bookingColumns}
                        data={faceSearchBookingMutation.data.data.data.bookings || []}
                        pageCount={1}
                        pagination={{ pageIndex: 0, pageSize: 999 }}
                        onPaginationChange={() => { }}
                    />
                </div>
            ) : (
                <DataTable
                    columns={bookingColumns}
                    data={data?.data.data.items ?? []}
                    pageCount={data?.data.data.totalPages ?? 0}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    meta={{
                        // onViewDetail: handleViewDetail
                    }}
                    isLoading={isFetching}
                />
            )}

            {/* {selectedId && (
                <BookingDetail
                    id={selectedId}
                    open={isDetailOpen}
                    onOpenChange={setIsDetailOpen}
                />
            )} */}

            {/* <StationForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                id={editingId}
            /> */}
        </div>
    )
}