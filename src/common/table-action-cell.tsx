import { Button } from "@/components/ui/button"
import { Eye, Pencil } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

interface TableActionCellProps {
    editUrl?: string
    detailUrl?: string
    children?: ReactNode
}

export const TableActionCell = ({ editUrl, detailUrl, children }: TableActionCellProps) => {
    return (
        <div>
            {editUrl && (
                <Button>
                    <Link to={editUrl}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
            )}

            {detailUrl && (
                <Button variant="ghost" size="icon" asChild title="Chi tiết">
                    <Link to={detailUrl}>
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
            )}

            {children}
        </div>
    )
}