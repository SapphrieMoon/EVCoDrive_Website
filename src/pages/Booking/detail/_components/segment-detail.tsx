import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon } from "lucide-react"

export default function SegmentDetail() {
    return (
        <Card className="col-span-5 p-0 sticky top-6 h-fit border border-border shadow-sm flex flex-col rounded-lg bg-card text-card-foreground ">
            {/* Header */}
            <div className="flex justify-start items-center gap-3 p-5 border-b border-border">
                <div className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-primary-foreground font-bold italic">
                    i
                </div>
                <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-foreground text-lg tracking-tight">Segment Detail</h3>
                    <span className="text-muted-foreground font-medium text-sm">(Mar 18)</span>
                </div>
            </div>

            <div className="p-5 flex flex-col gap-6">
                {/* Scheduled Times */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">SCHEDULED IN</p>
                        <p className="text-[15px] font-bold text-foreground">Mar 18 08:00</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">SCHEDULED OUT</p>
                        <p className="text-[15px] font-bold text-foreground">Mar 18 18:00</p>
                    </div>
                </div>

                {/* Actual Times */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-primary mb-1.5 tracking-wider uppercase">ACTUAL IN</p>
                        <p className="text-[15px] font-bold text-foreground">08:30</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-muted-foreground mb-1.5 tracking-wider uppercase">ACTUAL OUT</p>
                        <p className="text-[15px] font-bold text-muted-foreground">—</p>
                    </div>
                </div>

                {/* Odometer */}
                <div className="bg-muted/50 flex items-center justify-between p-4 rounded-xl border border-border mt-2">
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-widest">START ODO</p>
                        <p className="text-[15px] font-bold text-foreground">
                            1,240 <span className="text-xs text-muted-foreground font-semibold ml-0.5">km</span>
                        </p>
                    </div>
                    <div className="h-6 w-px bg-border"></div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-widest">END ODO</p>
                        <p className="text-[15px] font-bold text-muted-foreground">—</p>
                    </div>
                </div>

                {/* Photos */}
                <div className="mt-2">
                    <div className="flex items-center gap-2 mb-3">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">CHECK-IN PHOTOS</p>
                    </div>
                    <div className="flex gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=150&q=80"
                            alt="Dashboard"
                            className="w-[84px] h-[84px] rounded-xl object-cover bg-muted shadow-sm border border-border/50"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=150&q=80"
                            alt="Front View"
                            className="w-[84px] h-[84px] rounded-xl object-cover bg-muted shadow-sm border border-border/50"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=150&q=80"
                            alt="Side View"
                            className="w-[84px] h-[84px] rounded-xl object-cover bg-muted shadow-sm border border-border/50"
                        />
                    </div>
                </div>

                {/* Action button */}
                <Button variant="outline" className="w-full text-[13px] font-bold text-foreground h-11 border-border shadow-sm mt-4 rounded-xl hover:bg-muted transition-none">
                    Edit Segment Data
                </Button>
            </div>
        </Card>
    )
}