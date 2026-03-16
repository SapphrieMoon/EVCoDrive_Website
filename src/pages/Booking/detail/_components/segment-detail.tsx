import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Plus, X } from "lucide-react"
import bookingQueries from "@/queries/booking.query"
import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { formatDate, formatTime } from "@/utils/date"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useDropzone } from 'react-dropzone'
import { SEGMENT_STATUS_MAPPING } from "@/constants/status/booking/segment-status"
import { toast } from "sonner"


export default function SegmentDetail({ segmentId }: { segmentId?: string }) {
    const { data, isPending } = bookingQueries.useHandoverLogs(segmentId as string)
    const segment = data?.data.data
    const configStatus = segment?.status ? SEGMENT_STATUS_MAPPING[segment.status] : null;
    const [images, setImages] = useState<File[]>([]); // Dùng để gửi BE
    const [previews, setPreviews] = useState<string[]>([]); // Dùng để show UI
    const [odoStart, setOdoStart] = useState<number>(segment?.startOdo || 0);
    const [odoEnd, setOdoEnd] = useState<number>(segment?.endOdo || 0);
    const checkInMutation = bookingQueries.useCheckIn();
    const checkOutMutation = bookingQueries.useCheckOut();
    const isSubmitting = checkInMutation.isPending || checkOutMutation.isPending;

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg']
        },
        onDrop: (acceptedFiles) => {
            onDrop(acceptedFiles)
        }
    })

    const removeImage = (index: number) => {
        // Xóa URL preview để tránh memory leak
        URL.revokeObjectURL(previews[index]);

        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const onDrop = (acceptedFiles: File[]) => {
        // 1. Lưu file để sau này ném vào FormData
        setImages(prev => [...prev, ...acceptedFiles]);

        // 2. Tạo URL tạm thời để hiển thị ngay lập tức
        const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleSubmit = () => {
        // 1. Tạo FormData để chứa cả text và files
        const formData = new FormData();

        // Thêm các file ảnh đã chọn vào FormData
        images.forEach((file) => {
            formData.append("images", file);
        });

        if (segment?.status === 'Pending') {
            // --- LOGIC CHECK-IN ---
            // Gửi ID và object chứa startOdometer kèm formData
            checkInMutation.mutate({
                bookingId: segment?.bookingId!,
                handoverLogId: segmentId!,
                body: {
                    startOdometer: odoStart,
                    images: images
                }
            }, {
                onSuccess: () => {
                    // Reset state sau khi thành công
                    setImages([]);
                    setPreviews([]);
                    toast.success("Check-in thành công!");
                }
            });

        } else if (segment?.status === 'CheckedIn') {
            // --- LOGIC CHECK-OUT ---
            checkOutMutation.mutate({
                bookingId: segment?.bookingId!,
                handoverLogId: segmentId!,
                body: {
                    endOdometer: odoEnd,
                    images: images
                }
            }, {
                onSuccess: () => {
                    setImages([]);
                    setPreviews([]);
                    toast.success("Check-out thành công!");
                }
            });
        }
    };


    if (isPending) return <div className="p-8"><DetailSkeleton /></div>
    return (
        <Card className="col-span-5 p-0 sticky top-6 h-fit border border-border shadow-sm flex flex-col rounded-lg bg-card text-card-foreground ">
            {/* Header */}
            <div className="flex justify-start items-center gap-3 p-5 border-b border-border">
                <div className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-primary-foreground font-bold italic">
                    i
                </div>
                <div className="flex items-center justify-between gap-2 w-full">
                    <div className="">
                        <h3 className="font-bold text-foreground text-lg tracking-tight">Chi tiết lịch đặt</h3>
                        <p className="text-sm text-muted-foreground">ID: {segmentId}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Badge className="mr-2 p-3" variant={configStatus?.color}>{configStatus?.label}</Badge>
                        <span className="text-muted-foreground font-medium text-sm">Ngày tạo: {formatDate(segment?.handoverDate, false)}</span>
                    </div>
                </div>
            </div>

            <div className="p-5 flex flex-col gap-6">
                {/* Scheduled Times */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">Ngày check in</p>
                        <p className="text-[15px] font-bold text-foreground">{formatDate(segment?.checkInDate, false)}</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">Ngày check out</p>
                        <p className="text-[15px] font-bold text-foreground">{formatDate(segment?.checkOutDate, false)}</p>
                    </div>
                </div>

                {/* Actual Times */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-primary mb-1.5 tracking-wider uppercase">Giờ check in</p>
                        <p className="text-[15px] font-bold text-foreground">
                            {segment?.actualCheckInDate ? formatTime(segment?.actualCheckInDate) : "---"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">Giờ check out</p>
                        <p className="text-[15px] font-bold text-muted-foreground">
                            {segment?.actualCheckOutDate ? formatTime(segment?.actualCheckOutDate) : "---"}
                        </p>
                    </div>
                </div>

                {/* Odometer */}
                <div className="bg-muted/50 flex items-center justify-between p-4 rounded-xl border border-border mt-2 gap-4">
                    {/* Start odometer */}
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-widest">
                            Km lúc đầu
                        </p>
                        {segment?.status === 'Pending' ? (
                            <div className="flex items-center gap-1 border-b-2 border-primary/30 focus-within:border-primary transition-colors pb-1">
                                <input
                                    type="number"
                                    value={odoStart}
                                    onChange={(e) => setOdoStart(Number(e.target.value))}
                                    className="bg-transparent font-bold text-lg w-full outline-none"
                                    placeholder="0"
                                />
                                <span className="text-xs text-muted-foreground font-semibold">km</span>
                            </div>
                        ) : (
                            <p className="text-[15px] font-bold text-foreground italic">
                                {segment?.startOdo?.toLocaleString()} <span className="text-xs text-muted-foreground font-semibold ml-0.5">km</span>
                            </p>
                        )}
                    </div>

                    <div className="h-8 w-px bg-border"></div>

                    {/* End odometer */}
                    <div className="flex-1 text-right">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-widest text-right">
                            Km lúc sau
                        </p>
                        {segment?.status === 'CheckedIn' ? (
                            <div className="flex items-center gap-1 border-b-2 border-primary/30 focus-within:border-primary transition-colors pb-1 justify-end">
                                <input
                                    type="number"
                                    value={odoEnd}
                                    onChange={(e) => setOdoEnd(Number(e.target.value))}
                                    className="bg-transparent font-bold text-lg w-full text-right outline-none"
                                    placeholder="0"
                                />
                                <span className="text-xs text-muted-foreground font-semibold">km</span>
                            </div>
                        ) : (
                            <p className="text-[15px] font-bold text-muted-foreground italic">
                                {segment?.status === 'CheckedOut'
                                    ? `${segment?.endOdo?.toLocaleString()} km`
                                    : "—"}
                            </p>
                        )}
                    </div>
                </div>

                {/* Photos */}
                <div className="flex flex-col gap-6">
                    <div className="mt-2">
                        {/* Check-in */}
                        <div className="flex items-center gap-2 mb-3">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ảnh khi check-in</p>
                        </div>
                        <div className="flex flex-row flex-wrap gap-4">
                            {/* 1. Hiển thị ảnh ĐÃ CÓ từ API (Dành cho lúc đang sử dụng xe hoặc đã trả xe) */}
                            {segment?.checkInImages?.map((url, i) => (
                                <img key={i} src={url} className="w-[84px] h-[84px] rounded-xl object-cover bg-muted border" alt="Checkin API" />
                            ))}

                            {/* 2. Hiển thị vùng UPLOAD nếu status là Pending (Chưa nhận xe) */}
                            {segment?.status === 'Pending' && (
                                <>
                                    {previews.map((url, index) => (
                                        <div key={url} className="relative aspect-square rounded-2xl overflow-hidden border">
                                            <img src={url} className="object-cover w-[84px] h-[84px]" />
                                            <Button onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="absolute top-1 right-1 bg-red-500 rounded-full p-1 h-6 w-6">
                                                <X size={12} className="text-white" />
                                            </Button>
                                        </div>
                                    ))}
                                    {previews.length < 5 && (
                                        <div {...getRootProps()} className="aspect-square w-[84px] h-[84px] border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer hover:bg-muted/50">
                                            <Plus className="text-muted-foreground" />
                                            <input {...getInputProps()} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {/* Check-out */}
                    {(segment?.status === 'CheckedIn' || segment?.status === 'CheckedOut') && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-dashed">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ảnh khi check-out</p>
                            </div>
                            <div className="flex flex-row flex-wrap gap-4">
                                {/* 1. Hiển thị ảnh ĐÃ CÓ từ API (Khi đã hoàn thành lượt thuê) */}
                                {segment?.checkOutImages?.map((url, i) => (
                                    <img key={i} src={url} className="w-[84px] h-[84px] rounded-xl object-cover bg-muted border" alt="Checkout API" />
                                ))}

                                {/* 2. Hiển thị vùng UPLOAD nếu status là CheckedIn (Đang cầm xe, chuẩn bị trả) */}
                                {segment?.status === 'CheckedIn' && (
                                    <>
                                        {previews.map((url, index) => (
                                            <div key={url} className="relative aspect-square rounded-2xl overflow-hidden border">
                                                <img src={url} className="object-cover w-[84px] h-[84px]" />
                                                <Button onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="absolute top-1 right-1 bg-red-500 rounded-full p-1 h-6 w-6">
                                                    <X size={12} className="text-white" />
                                                </Button>
                                            </div>
                                        ))}
                                        {previews.length < 5 && (
                                            <div {...getRootProps()} className="aspect-square w-[84px] h-[84px] border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer hover:bg-muted/50">
                                                <Plus className="text-muted-foreground" />
                                                <input {...getInputProps()} />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action button */}
                {segment?.status !== "CheckedOut" && (
                    <Button
                        variant="outline"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full text-[13px] font-bold text-foreground h-11 border-border shadow-sm mt-4 rounded-xl hover:bg-muted transition-none">
                        {isSubmitting ? "Đang xử lý..." : (segment?.status === 'Pending' ? 'Check In' : 'Check Out')}
                    </Button>
                )}
            </div>
        </Card>
    )
}