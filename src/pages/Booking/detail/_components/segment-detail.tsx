import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Plus, X } from "lucide-react"
import bookingQueries from "@/queries/booking.query"
import { formatDate } from "@/utils/date"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useDropzone } from 'react-dropzone'
import { SEGMENT_STATUS_MAPPING } from "@/constants/status/booking/segment-status"
import { toast } from "sonner"
import { CardSkeleton } from "@/common/skeletons/card-skeleton"
import imageCompression from 'browser-image-compression';
import type { DamageResult } from "@/types/booking.type"
import vehicleQueries from "@/queries/vehicle.query"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkInSchema, checkOutSchema, type CheckInFormValues, type CheckOutFormValues } from "@/schema/booking.schema"
import { Textarea } from "@/components/ui/textarea"

export default function SegmentDetail({ segmentId, vehicleId }: { segmentId?: string, vehicleId?: string }) {
    const { data, isPending } = bookingQueries.useHandoverLogs(segmentId as string)
    const segment = data?.data.data
    const { data: vehicleData } = vehicleQueries.useDetail(vehicleId as string)
    const vehicle = vehicleData?.data.data
    const configStatus = segment?.status ? SEGMENT_STATUS_MAPPING[segment.status] : null;

    const [previews, setPreviews] = useState<string[]>([]);
    const [damageResult, setDamageResult] = useState<DamageResult | null>(null);

    const checkInMutation = bookingQueries.useCheckIn();
    const checkOutMutation = bookingQueries.useCheckOut();
    const detectDamageMutation = bookingQueries.useDetectDamage();
    const isSubmitting = checkInMutation.isPending || checkOutMutation.isPending;

    const isCheckIn = segment?.status === 'Pending';
    const isCheckOut = segment?.status === 'CheckedIn';

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<CheckInFormValues & CheckOutFormValues>({
        resolver: zodResolver(isCheckIn ? checkInSchema : checkOutSchema) as any,
        defaultValues: {
            startOdometer: (segment?.startOdo || "") as unknown as number,
            startBatteryLevel: (segment?.startBatteryLevel || "") as unknown as number,
            checkInNote: segment?.checkInNote ?? '',
            actualCheckInDate: segment?.actualCheckInDate ? new Date(segment.actualCheckInDate).toISOString().slice(0, 10) : "",
            images: [],
            endOdometer: (segment?.endOdo || segment?.startOdo || "") as unknown as number,
            endBatteryLevel: (segment?.endBatteryLevel || segment?.startBatteryLevel || "") as unknown as number,
            checkOutNote: segment?.checkOutNote ?? '',
            actualCheckOutDate: segment?.actualCheckOutDate ? new Date(segment.actualCheckOutDate).toISOString().slice(0, 10) : "",
        }
    });

    const formImages = watch("images") || [];

    useEffect(() => {
        if (segment) {
            reset({
                startOdometer: (segment.startOdo || "") as unknown as number,
                startBatteryLevel: (segment.startBatteryLevel || "") as unknown as number,
                checkInNote: segment.checkInNote ?? '',
                actualCheckInDate: segment.actualCheckInDate ? new Date(segment.actualCheckInDate).toISOString().slice(0, 10) : "",
                images: [],
                endOdometer: (segment.endOdo || segment.startOdo || "") as unknown as number,
                endBatteryLevel: (segment.endBatteryLevel || segment.startBatteryLevel || "") as unknown as number,
                checkOutNote: segment.checkOutNote ?? '',
                actualCheckOutDate: segment.actualCheckOutDate ? new Date(segment.actualCheckOutDate).toISOString().slice(0, 10) : "",
            });
            setPreviews([]);
            setDamageResult(null);
        }
    }, [segment, reset]);

    const removeImage = (index: number) => {
        URL.revokeObjectURL(previews[index]);
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setValue("images", formImages.filter((_, i) => i !== index));
    };

    const compressImage = async (file: File) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1280,
            useWebWorker: true,
        };
        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error("Compress error:", error);
            return file;
        }
    };

    const onDrop = async (acceptedFiles: File[]) => {
        const compressedFiles = await Promise.all(
            acceptedFiles.map(file => compressImage(file))
        );
        const newList = [...formImages, ...compressedFiles].slice(0, 5);
        setValue("images", newList);

        const newPreviews = compressedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews].slice(0, 5));
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg']
        },
        maxFiles: 5,
        maxSize: 5 * 1024 * 1024,
        onDrop
    });

    const onSubmit = (data: CheckInFormValues & CheckOutFormValues) => {
        if (!segment?.bookingId || !segmentId) {
            toast.error("Thiếu thông tin lịch trình!");
            return;
        }

        const totalImageSize = (data.images || []).reduce((acc, file) => acc + (file.size || 0), 0);
        console.log(`Dung lượng tổng cộng của ${data.images?.length || 0} ảnh:`, (totalImageSize / (1024 * 1024)).toFixed(2), "MB");


        if (isCheckIn) {
            if (vehicle && Number(data.startOdometer) < vehicle.odometer) {
                toast.error(`Số km lúc đầu phải lớn hơn hoặc bằng ${vehicle.odometer} km!`);
                return;
            }

            checkInMutation.mutate({
                bookingId: segment.bookingId,
                handoverLogId: segmentId,
                body: {
                    startOdometer: Number(data.startOdometer),
                    startBatteryLevel: Number(data.startBatteryLevel),
                    checkInNote: data.checkInNote || '',
                    actualCheckInDate: data.actualCheckInDate,
                    images: data.images || []
                }
            }, {
                onSuccess: () => {
                    toast.success("Check-in thành công!");
                }
            });

        } else if (isCheckOut) {
            if (segment.startOdo !== undefined && Number(data.endOdometer) < segment.startOdo) {
                toast.error(`Số km lúc sau phải lớn hơn hoặc bằng ${segment.startOdo} km!`);
                return;
            }

            checkOutMutation.mutate({
                bookingId: segment.bookingId,
                handoverLogId: segmentId,
                body: {
                    endOdometer: Number(data.endOdometer),
                    endBatteryLevel: Number(data.endBatteryLevel),
                    checkOutNote: data.checkOutNote || '',
                    actualCheckOutDate: data.actualCheckOutDate,
                    images: data.images || []
                }
            }, {
                onSuccess: () => {
                    toast.success("Check-out thành công!");
                }
            });
        }
    };

    const handleAnalyzeDamage = async () => {
        if (!formImages?.length) {
            toast.error("Vui lòng tải ảnh lên trước khi phân tích!");
            return;
        }
        try {
            detectDamageMutation.mutate(formImages, {
                onSuccess: (res: any) => {
                    const data = res.data?.data || res.data;
                    setDamageResult(data);

                    let noteText = "Không phát hiện hư hại mới.";
                    if (data.isDamaged && data.detailsByImage) {
                        noteText = `Phát hiện hư hại (${data.damagePercentage}%):\n` +
                            Object.entries(data.detailsByImage).map(([imgKey, desc]) => `- ${imgKey}: ${desc}`).join('\n');
                    } else if (data.isDamaged && data.summary) {
                        noteText = `Phát hiện hư hại:\n${data.summary}`;
                    }

                    setValue("checkOutNote", noteText, { shouldValidate: true });
                    toast.success("Phân tích hoàn tất!");
                },
                onError: (error) => {
                    console.error("Lỗi AI:", error);
                    toast.error("Phân tích thất bại!");
                }
            });
        } catch (error) {
            console.error("Lỗi khi xử lý file:", error);
            toast.error("Lỗi khi chuẩn bị ảnh!");
        }
    };

    if (isPending) return (
        <div className="col-span-5 p-0 sticky top-6 h-fit shadow-sm flex flex-col text-card-foreground">
            <CardSkeleton />
        </div>
    );
    if (!segment) return <div>Không tìm thấy dữ liệu</div>;

    return (
        <Card className="col-span-5 p-0 sticky top-6 h-fit border border-border shadow-sm flex flex-col rounded-lg bg-card text-card-foreground">
            {/* Header */}
            <div className="flex justify-start items-center gap-3 p-5 border-b border-border">
                <div className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-primary-foreground font-bold italic">
                    i
                </div>
                <div className="flex items-center justify-between gap-2 w-full">
                    <div>
                        <h3 className="font-bold text-foreground text-lg tracking-tight">Chi tiết lịch đặt</h3>
                        <p className="text-sm text-muted-foreground">ID: {segmentId}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Badge className="mr-2 p-3" variant={configStatus?.color}>{configStatus?.label}</Badge>
                        <span className="text-muted-foreground font-medium text-sm">Ngày tạo: {formatDate(segment?.handoverDate, false)}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit as any)} className="p-5 flex flex-col gap-6">
                {/* Scheduled Times */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">Ngày bàn giao xe dự kiến</p>
                        <p className="text-[15px] font-bold text-foreground">{formatDate(segment?.checkInDate, false)}</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">Ngày trả xe dự kiến</p>
                        <p className="text-[15px] font-bold text-foreground">{formatDate(segment?.checkOutDate, false)}</p>
                    </div>
                </div>

                {/* Actual Times */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-primary mb-1.5 tracking-wider uppercase">Ngày nhận xe thực tế</p>
                        {isCheckIn ? (
                            <div className="flex flex-col gap-0.5">
                                <input
                                    type="date"
                                    {...register("actualCheckInDate")}
                                    className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 ${errors.actualCheckInDate ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'}`}
                                />
                                {errors.actualCheckInDate && <p className="text-[10px] font-medium text-destructive mt-1">{errors.actualCheckInDate.message as string}</p>}
                            </div>
                        ) : (
                            <p className="text-[15px] font-bold text-foreground">
                                {segment?.actualCheckInDate ? formatDate(segment?.actualCheckInDate, false) : "---"}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-muted-primary mb-1.5 tracking-wider uppercase">Ngày trả xe thực tế</p>
                        {isCheckOut ? (
                            <div className="flex flex-col gap-0.5">
                                <input
                                    type="date"
                                    {...register("actualCheckOutDate")}
                                    className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 ${errors.actualCheckOutDate ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'}`}
                                />
                                {errors.actualCheckOutDate && <p className="text-[10px] font-medium text-destructive mt-1">{errors.actualCheckOutDate.message as string}</p>}
                            </div>
                        ) : (
                            <p className="text-[15px] font-bold text-muted-primary">
                                {segment?.actualCheckOutDate ? formatDate(segment?.actualCheckOutDate, false) : "---"}
                            </p>
                        )}
                    </div>
                </div>

                {/* Dashboard: Odometer & Battery */}
                <div className="bg-muted/50 rounded-xl border border-border mt-2 p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Start odometer */}
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-widest">
                                Km lúc đầu
                            </p>
                            {isCheckIn ? (
                                <div className="flex flex-col gap-0.5">
                                    <div className={`flex items-center gap-1 border-b-2 transition-colors pb-1 ${errors.startOdometer ? 'border-destructive focus-within:border-destructive text-destructive' : 'border-primary/30 focus-within:border-primary'}`}>
                                        <input
                                            type="number"
                                            {...register("startOdometer")}
                                            className={`bg-transparent font-bold text-lg w-full outline-none ${errors.startOdometer ? 'text-destructive placeholder:text-destructive/50' : ''}`}
                                            placeholder="0"
                                        />
                                        <span className={`text-xs font-semibold ${errors.startOdometer ? 'text-destructive' : 'text-muted-foreground'}`}>km</span>
                                    </div>
                                    {errors.startOdometer && <p className="text-[10px] font-medium text-destructive mt-1">{errors.startOdometer.message}</p>}
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
                            {isCheckOut ? (
                                <div className="flex flex-col gap-0.5 items-end">
                                    <div className={`flex items-center gap-1 border-b-2 transition-colors pb-1 justify-end ${errors.endOdometer ? 'border-destructive focus-within:border-destructive text-destructive' : 'border-primary/30 focus-within:border-primary'}`}>
                                        <input
                                            type="number"
                                            {...register("endOdometer")}
                                            className={`bg-transparent font-bold text-lg w-full text-right outline-none ${errors.endOdometer ? 'text-destructive placeholder:text-destructive/50' : ''}`}
                                            placeholder="0"
                                        />
                                        <span className={`text-xs font-semibold ${errors.endOdometer ? 'text-destructive' : 'text-muted-foreground'}`}>km</span>
                                    </div>
                                    {errors.endOdometer && <p className="text-[10px] font-medium text-destructive mt-1">{errors.endOdometer.message}</p>}
                                </div>
                            ) : (
                                <p className="text-[15px] font-bold text-foreground italic">
                                    {segment?.status === 'CheckedOut' ? (
                                        <>
                                            {segment?.endOdo?.toLocaleString()}
                                            <span className="text-xs text-muted-foreground font-semibold ml-0.5">km</span>
                                        </>
                                    ) : "—"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                        {/* Start Battery */}
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-widest">
                                % Pin/Bình lúc đầu
                            </p>
                            {isCheckIn ? (
                                <div className="flex flex-col gap-0.5">
                                    <div className={`flex items-center gap-1 border-b-2 transition-colors pb-1 ${errors.startBatteryLevel ? 'border-destructive focus-within:border-destructive text-destructive' : 'border-primary/30 focus-within:border-primary'}`}>
                                        <input
                                            type="number"
                                            {...register("startBatteryLevel")}
                                            className={`bg-transparent font-bold text-lg w-full outline-none ${errors.startBatteryLevel ? 'text-destructive placeholder:text-destructive/50' : ''}`}
                                            placeholder="0"
                                        />
                                        <span className={`text-xs font-semibold ${errors.startBatteryLevel ? 'text-destructive' : 'text-muted-foreground'}`}>%</span>
                                    </div>
                                    {errors.startBatteryLevel && <p className="text-[10px] font-medium text-destructive mt-1">{errors.startBatteryLevel.message}</p>}
                                </div>
                            ) : (
                                <p className="text-[15px] font-bold text-foreground italic">
                                    {segment?.startBatteryLevel != null ? segment.startBatteryLevel.toLocaleString() : "—"} <span className="text-xs text-muted-foreground font-semibold ml-0.5">%</span>
                                </p>
                            )}
                        </div>

                        <div className="h-8 w-px bg-border"></div>

                        {/* End Battery */}
                        <div className="flex-1 text-right">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-widest text-right">
                                % Pin/Bình lúc sau
                            </p>
                            {isCheckOut ? (
                                <div className="flex flex-col gap-0.5 items-end">
                                    <div className={`flex items-center gap-1 border-b-2 transition-colors pb-1 justify-end ${errors.endBatteryLevel ? 'border-destructive focus-within:border-destructive text-destructive' : 'border-primary/30 focus-within:border-primary'}`}>
                                        <input
                                            type="number"
                                            {...register("endBatteryLevel")}
                                            className={`bg-transparent font-bold text-lg w-full text-right outline-none ${errors.endBatteryLevel ? 'text-destructive placeholder:text-destructive/50' : ''}`}
                                            placeholder="0"
                                        />
                                        <span className={`text-xs font-semibold ${errors.endBatteryLevel ? 'text-destructive' : 'text-muted-foreground'}`}>%</span>
                                    </div>
                                    {errors.endBatteryLevel && <p className="text-[10px] font-medium text-destructive mt-1">{errors.endBatteryLevel.message}</p>}
                                </div>
                            ) : (
                                <p className="text-[15px] font-bold text-foreground italic">
                                    {segment?.status === 'CheckedOut' ? (
                                        <>
                                            {segment?.endBatteryLevel != null ? segment.endBatteryLevel.toLocaleString() : "—"}
                                            <span className="text-xs text-muted-foreground font-semibold ml-0.5">%</span>
                                        </>
                                    ) : "—"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-4">
                    {(isCheckIn || (segment?.checkInNote && segment.checkInNote.length > 0)) && (
                        <div className="flex flex-col gap-2">
                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ghi chú lúc nhận xe</p>
                            {isCheckIn ? (
                                <div className="flex flex-col gap-1">
                                    <Textarea
                                        {...register("checkInNote")}
                                        placeholder="Thêm ghi chú của bạn ở đây..."
                                        className={`resize-none h-20 ${errors.checkInNote ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                    />
                                    {errors.checkInNote && <p className="text-[10px] font-medium text-destructive mt-0.5">{errors.checkInNote.message as string}</p>}
                                </div>
                            ) : (
                                <div className="text-sm bg-muted/40 p-3 rounded-lg border border-border">
                                    {segment?.checkInNote || "Không có ghi chú"}
                                </div>
                            )}
                        </div>
                    )}

                    {(isCheckOut || (segment?.checkOutNote && segment.checkOutNote.length > 0)) && (
                        <div className="flex flex-col gap-2 mt-2">
                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ghi chú lúc trả xe</p>
                            {isCheckOut ? (
                                <div className="flex flex-col gap-1">
                                    <Textarea
                                        {...register("checkOutNote")}
                                        placeholder="Thêm ghi chú của bạn ở đây..."
                                        className={`resize-none h-20 ${errors.checkOutNote ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                    />
                                    {errors.checkOutNote && <p className="text-[10px] font-medium text-destructive mt-0.5">{errors.checkOutNote.message as string}</p>}
                                </div>
                            ) : (
                                <div className="text-sm bg-muted/40 p-3 rounded-lg border border-border">
                                    {segment?.checkOutNote || "Không có ghi chú"}
                                </div>
                            )}
                        </div>
                    )}

                    {segment?.status === 'Cancelled' && segment?.cancellationReason && (
                        <div className="flex flex-col gap-2 mt-2">
                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Lý do hủy</p>
                            <div className="text-sm bg-destructive/10 text-destructive p-3 rounded-lg border border-destructive/20 font-medium">
                                {segment.cancellationReason}
                            </div>
                        </div>
                    )}
                </div>

                {/* Photos */}
                <div className="flex flex-col gap-6">
                    <div className="mt-2">
                        {/* Check-in */}
                        <div className="flex items-center gap-2 mb-3">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ảnh khi bàn giao xe</p>
                        </div>
                        <div className="flex flex-row flex-wrap gap-4">
                            {segment?.checkInImages?.map((url, i) => (
                                <img key={i} src={url} className="w-[84px] h-[84px] rounded-xl object-cover bg-muted border" alt="Checkin API" />
                            ))}

                            {isCheckIn && (
                                <>
                                    {previews.map((url, index) => (
                                        <div key={url} className="relative aspect-square rounded-2xl overflow-hidden border">
                                            <img src={url} className="object-cover w-[84px] h-[84px]" alt="Preview" />
                                            <Button type="button" onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="absolute top-1 right-1 bg-red-500 rounded-full p-1 h-6 w-6">
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
                                    {errors.images && <p className="text-[10px] font-medium text-destructive mt-1 w-full">{errors.images.message as string}</p>}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Check-out */}
                    {(segment?.status === 'CheckedIn' || segment?.status === 'CheckedOut') && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-dashed">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ảnh khi trả xe</p>
                            </div>
                            <div className="flex flex-row flex-wrap gap-4">
                                {segment?.checkOutImages?.map((url, i) => (
                                    <img key={i} src={url} className="w-[84px] h-[84px] rounded-xl object-cover bg-muted border" alt="Checkout API" />
                                ))}

                                {isCheckOut && (
                                    <>
                                        {previews.map((url, index) => (
                                            <div key={url} className="relative aspect-square rounded-2xl overflow-hidden border">
                                                <img src={url} className="object-cover w-[84px] h-[84px]" alt="Preview" />
                                                <Button type="button" onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="absolute top-1 right-1 bg-red-500 rounded-full p-1 h-6 w-6">
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
                                        {errors.images && <p className="text-[10px] font-medium text-destructive mt-1 w-full">{errors.images.message as string}</p>}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Damage Result */}
                {damageResult && (
                    <div className="bg-muted/50 p-4 rounded-xl border border-border flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-[13px] uppercase tracking-wider text-primary">
                                🔍 Kết quả phân tích AI
                            </h4>
                            <Badge variant={damageResult.isDamaged ? "destructive" : "secondary"}>
                                {damageResult.isDamaged ? "Phát hiện hư hại" : "Bình thường"}
                            </Badge>
                        </div>
                        <p className="text-[14px] font-medium text-foreground">{damageResult.summary}</p>

                        {damageResult.isDamaged && (
                            <div className="flex flex-col gap-2 border-t border-border pt-3">
                                <p className="text-[13px]">
                                    <span className="font-semibold text-muted-foreground mr-1">Tỷ lệ hư hại:</span>
                                    <span className="font-bold text-destructive">{damageResult.damagePercentage}%</span>
                                </p>
                                <div className="text-[13px] flex flex-col gap-1.5 mt-1">
                                    <span className="font-semibold text-muted-foreground">Chi tiết:</span>
                                    <ul className="list-disc list-inside space-y-1">
                                        {Object.entries(damageResult.detailsByImage).map(([imgKey, desc]) => (
                                            <li key={imgKey} className="text-foreground leading-relaxed">
                                                <span className="font-medium mr-1">{imgKey}:</span>
                                                <span className="text-muted-foreground">{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Action button */}
                {isCheckIn && (
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-[13px] font-bold text-primary-foreground h-11 border-border shadow-sm mt-4 rounded-xl hover:bg-muted transition-none"
                    >
                        {isSubmitting ? "Đang xử lý..." : 'Xác nhận bàn giao xe'}
                    </Button>
                )}

                {isCheckOut && (
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            type="button"
                            onClick={() => handleAnalyzeDamage()}
                            disabled={detectDamageMutation.isPending || formImages.length === 0}
                            className="w-full text-[13px] font-bold h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        >
                            {detectDamageMutation.isPending ? "Đang phân tích..." : "🔍 Phân tích hư hỏng bằng AI"}
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full text-[13px] font-bold text-primary-foreground h-11 border-border shadow-sm rounded-xl hover:bg-muted transition-none"
                        >
                            {isSubmitting ? "Đang xử lý..." : 'Xác nhận trả xe'}
                        </Button>
                    </div>
                )}
            </form>
        </Card>
    )
}