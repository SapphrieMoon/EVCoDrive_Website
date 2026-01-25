import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteActionProps {
    onConfirm: () => void
    isLoading?: boolean
}

export const DeleteAction = ({ onConfirm, isLoading }: DeleteActionProps) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive/90"
            onClick={() => {
                if (confirm("Xóa nhé?")) onConfirm() // Hoặc dùng Modal xịn của bạn
            }}
            disabled={isLoading}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}