import "@tanstack/react-table"
import type { VehicleAction, VehicleStatus } from "./vehicle.type"

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        onViewDetail?: (id: string) => void
        onEdit?: (id: string) => void
        onApprove?: (id: string, status: VehicleAction) => void
        onReject?: (id: string, status: VehicleAction) => void
    }
}