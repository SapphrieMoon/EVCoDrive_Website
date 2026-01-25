import type { ColumnDef } from "@tanstack/react-table"
import type { VehicleBrand } from "@/types/vehicle-brand.type"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const BrandActionCell = ({ brand }: { brand: VehicleBrand }) => {
    const navigate = useNavigate()

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                onClick={() => navigate(`/vehicle-brands/${brand.vehicleBrandId}`)}
            >
                Detail
            </Button>

            <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/vehicle-brands/${brand.vehicleBrandId}/edit`)}
            >
                Edit
            </Button>
        </div>
    )
}

export const vehicleBrandColumns: ColumnDef<VehicleBrand>[] = [
    {
        accessorKey: "name",
        header: "Brand Name"
    },
    {
        accessorKey: "logoUrl",
        header: "Logo",
        cell: ({ row }) => {
            const brand = row.original

            return (
                <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-8 object-contain"
                />
            )
        }
    },
    {
        accessorKey: "createdDate",
        header: "Created Date"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <BrandActionCell brand={row.original} />
    }
]
