// _components/group-mini-card.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import path from "@/constants/path";
import { CO_OWNER_GROUP_STATUS_MAPPING } from "@/constants/status/co-owner-group/co-owner-group-status";
import { cn } from "@/lib/utils";
import coOwnerGroupQueries from "@/queries/co-owner-group.query";
import { ArrowUpRight, ShieldCheck, Users2 } from "lucide-react";
import { generatePath, useNavigate } from "react-router-dom";

export default function GroupCard({ groupId }: { groupId: string }) {
    const navigate = useNavigate()
    const { data } = coOwnerGroupQueries.useDetail(groupId);
    const group = data?.data.data;

    const statusConfig = group ? CO_OWNER_GROUP_STATUS_MAPPING[group.status] : {
        label: "Không tìm thấy",
        color: "text-slate-500"
    };

    if (!group) return null
    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Users2 className="h-4 w-4" /> Nhóm đồng sở hữu
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <p className="font-bold text-lg tracking-tight leading-none">{group?.groupName}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{group?.description}</p>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-y border-primary/10">
                    <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Trạng thái</span>
                    <Badge
                        variant="outline"
                        className={cn("text-[10px] font-bold border-none px-2 py-0", statusConfig.color)}
                    >
                        {statusConfig.label}
                    </Badge>
                </div>

                <Button
                    className="w-full group"
                    variant="default"
                    onClick={() => navigate(generatePath(path.coOwnerGroupDetail, { id: group?.coOwnerGroupId }))}
                >
                    Truy cập trang nhóm
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
            </CardContent>
        </Card>
    );
}