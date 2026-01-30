import "@tanstack/react-table"

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        onViewDetail?: (id: string) => void
        onEdit?: (id: string) => void
    }
}