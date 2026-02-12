import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilterIcon, RotateCcw } from "lucide-react";

export const VehicleFilterSidebar = ({ filters, setFilters }: any) => {
    const handleReset = () => {
        setFilters({
            searchTerm: "",
            status: undefined,
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
                    <div className="flex items-center justify-between">
                        <SheetTitle className="uppercase italic font-black text-2xl">Lọc phương tiện</SheetTitle>
                        <Button variant="ghost" size="sm" onClick={handleReset}>
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </SheetHeader>

                <div className="space-y-6 py-6">
                    {/* Ở đây bạn sẽ nhét các Select cho Status, 
                        Input cho YearFrom/YearTo, v.v. */}
                    <p className="text-xs text-muted-foreground italic">
                        Gợi ý: Phú có thể thêm Select cho trạm sạc hoặc dòng xe ở đây!
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
};