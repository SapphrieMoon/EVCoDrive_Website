export interface BaseDetailProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    id: string | null
}

export interface RejectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (reason: string) => void;
    isLoading: boolean;
}