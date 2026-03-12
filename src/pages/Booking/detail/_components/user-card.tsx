import { Card } from "@/components/ui/card"
import { User2, Briefcase } from "lucide-react"

export default function UserCard({ id }: { id: string }) {
    return (
        <Card className="p-5 flex items-start gap-4 shadow-sm flex flex-row">
            <div className="flex-none h-14 w-14 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                <User2 size={28} className="fill-current" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Thông tin cá nhân
                </div>
                <div className="text-lg font-semibold leading-tight text-foreground">
                    John Doe
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                    ID: {id}
                </div>
                <div className="text-sm text-muted-foreground italic flex items-center gap-1.5 mt-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Chuyến đi công tác xa</span>
                </div>
            </div>
        </Card>
    )
}