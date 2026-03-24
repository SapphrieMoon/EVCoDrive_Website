import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { expenseFeeTypeQueries } from "@/queries/expense-fee.query";
import { Tag } from "lucide-react";

export default function ExpenseFeeTypeCard({ typeId }: { typeId: string }) {
    const { data } = expenseFeeTypeQueries.useDetail(typeId);
    const type = data?.data.data;

    if (!type) return null;

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Tag className="h-4 w-4" /> Loại khoản chi
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <p className="font-bold text-lg tracking-tight leading-none">{type.expenseFeeTypeName}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{type.expenseFeeTypeDescription}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] py-2 border-t border-primary/10 font-mono text-muted-foreground truncate">
                    ID: {type.expenseFeeTypeId}
                </div>
            </CardContent>
        </Card>
    );
}