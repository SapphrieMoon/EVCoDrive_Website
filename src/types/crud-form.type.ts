export type CrudFormMode = "create" | "update"

export interface BaseCrudFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: CrudFormMode
    id?: string | null
}