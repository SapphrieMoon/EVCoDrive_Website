import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { RejectDialogProps } from "@/types/commons/dialog.type";
import { useState } from "react";

export const RejectDialog = ({ open, onOpenChange, onConfirm, isLoading }: RejectDialogProps) => {
    const [reason, setReason] = useState("");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="uppercase italic font-black text-destructive">Từ chối phương tiện</DialogTitle>
                    <DialogDescription>
                        Vui lòng nhập lý do từ chối để thông báo cho chủ sở hữu xe.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Textarea
                        placeholder="Ví dụ: Ảnh giấy tờ xe bị mờ, thông số pin không khớp..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onConfirm(reason)}
                        disabled={!reason.trim() || isLoading}
                    >
                        {isLoading ? "Đang xử lý..." : "Xác nhận từ chối"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};