import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import stationQueries from "@/queries/station.query"
import type { BaseDetailProps } from "@/types/commons/dialog.type"
import { Clock, ExternalLink, MapPin, Navigation } from "lucide-react"

export function StationDetail({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = stationQueries.useDetail(id as string)
    const station = data?.data.data

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Chi tiết trạm sạc
                    </SheetTitle>
                    <SheetDescription>
                        Quản lý thông tin vị trí và vận hành trạm sạc
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <DetailSkeleton />
                ) : (
                    <div className="space-y-6 py-6">
                        {/* Status & Name Header */}
                        <div className="flex flex-col items-center justify-center space-y-3 bg-muted/30 py-6 rounded-xl border border-dashed">
                            <div className="p-3 bg-background rounded-full shadow-sm">
                                <MapPin className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="font-bold text-lg leading-tight">{station?.name}</h3>
                                <p className="text-sm text-muted-foreground px-4">{station?.address}</p>
                            </div>
                            {/* {station && (
                                <Badge className={cn("mt-2", STATION_STATUS_MAPPING[station.status].className)}>
                                    {STATION_STATUS_MAPPING[station.status].label}
                                </Badge>
                            )} */}
                        </div>

                        {/* Operational Info */}
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" /> Vận hành
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Giờ mở cửa</span>
                                    <span className="font-mono font-bold text-primary italic">
                                        {station && new Date(station.openTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Giờ đóng cửa</span>
                                    <span className="font-mono font-bold text-destructive italic">
                                        {station && new Date(station.closeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Location Coordinates */}
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Navigation className="h-4 w-4" /> Tọa độ địa lý
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground italic">Vĩ độ (Latitude)</span>
                                    <span className="font-mono">{station?.latitude}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground italic">Kinh độ (Longitude)</span>
                                    <span className="font-mono">{station?.longitude}</span>
                                </div>
                                <a
                                    href={`https://www.google.com/maps?q=${station?.latitude},${station?.longitude}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 w-full mt-2 py-2 text-xs font-medium text-blue-600 border border-blue-200 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Mở trong Google Maps
                                </a>
                            </div>
                        </div>

                        {/* System Info */}
                        {/* <div className="grid grid-cols-1 gap-3 pt-4 border-t">
                            <InfoItem icon={Hash} label="Mã định danh" value={station?.stationId} isMono />
                            <InfoItem icon={CalendarDays} label="Ngày khởi tạo" value={formatDate(station?.createdDate)} />
                            <InfoItem icon={Activity} label="Cập nhật gần nhất" value={formatDate(station?.updatedDate)} />
                        </div> */}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

