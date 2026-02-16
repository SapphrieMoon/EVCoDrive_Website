import { ModelPicker } from "@/components/common/model-picker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import vehicleModelQueries from "@/queries/vehicle-model.query";
import { FilterIcon, RotateCcw } from "lucide-react";

import type { VehiclePaginationParams } from "@/types/vehicle.type";

interface VehicleFilterSidebarProps {
    filters: Omit<VehiclePaginationParams, "pageNumber" | "pageSize">;
    setFilters: React.Dispatch<React.SetStateAction<Omit<VehiclePaginationParams, "pageNumber" | "pageSize">>>;
}

export const VehicleFilterSidebar = ({ filters, setFilters }: VehicleFilterSidebarProps) => {
    const { data: modelsData, isLoading: modelsIsLoading } = vehicleModelQueries.useAll()
    // const { data: coOwerGroupsData, isLoading: coOwerGroupsIsLoading } = coOwnerGroupQueries.useAll()

    const handleReset = () => {
        setFilters({
            sortBy: "createdDate",
            sortOrder: "desc",
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <FilterIcon className="h-4 w-4" /> Bộ lọc
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px]">
                <SheetHeader>
                    <div className="flex items-center justify-between mt-8">
                        <SheetTitle className="uppercase font-black text-2xl tracking-tighter">
                            Lọc phương tiện
                        </SheetTitle>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="h-8 px-2 hover:bg-destructive/10 hover:text-destructive transition-colors gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase">Làm mới</span>
                        </Button>
                    </div>
                    <Separator className="opacity-50" />
                </SheetHeader>

                <div className="space-y-6 py-6 ml-4">
                    {/* YearFrom - YearTo */}
                    {/* <div className="space-y-4">
                        <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">
                            Năm sản xuất (Range)
                        </Label>
                        <div className="flex items-center gap-4">
                            <div className="space-y-1.5 flex-1">
                                <Label htmlFor="yearFrom" className="text-xs font-medium text-muted-foreground">Từ năm</Label>
                                <Input
                                    id="yearFrom"
                                    type="number"
                                    min={1900}
                                    max={new Date().getFullYear() + 1}
                                    placeholder="2020"
                                    className="h-9"
                                    value={filters.yearFrom ?? ""}
                                    onChange={(e) => setFilters((prev: any) => ({ ...prev, yearFrom: e.target.value ? Number(e.target.value) : undefined }))}
                                />
                            </div>
                            <div className="pt-6 text-muted-foreground">-</div>
                            <div className="space-y-1.5 flex-1">
                                <Label htmlFor="yearTo" className="text-xs font-medium text-muted-foreground">Đến năm</Label>
                                <Input
                                    id="yearTo"
                                    type="number"
                                    min={1900}
                                    max={new Date().getFullYear() + 1}
                                    placeholder={new Date().getFullYear().toString()}
                                    className="h-9"
                                    value={filters.yearTo ?? ""}
                                    onChange={(e) => setFilters((prev: any) => ({ ...prev, yearTo: e.target.value ? Number(e.target.value) : undefined }))}
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* Filter Model xe */}
                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Dòng xe (Model)</Label>
                        <ModelPicker
                            models={modelsData?.data.data}
                            isLoading={modelsIsLoading}
                            value={filters.vehicleModelId}
                            onChange={(val: string) => setFilters((p: any) => ({ ...p, vehicleModelId: val }))}
                        />
                    </div>

                    {/* Filter CoOwnerGroup */}
                    {/* <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nhóm chủ sở hữu</Label>
                            <ModelPicker
                                models={coOwerGroupsData?.data.data}
                                isLoading={coOwerGroupsIsLoading}
                                value={filters.coOwnerGroupId}
                                onChange={(val: string) => setFilters((p: any) => ({ ...p, coOwnerGroupId: val }))}
                            />
                        </div> */}
                </div>
            </SheetContent>
        </Sheet>
    );
};