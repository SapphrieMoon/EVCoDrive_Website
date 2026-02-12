import { MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CurrentStation } from "@/types/station.type"

export const StationCard = ({ station }: { station: CurrentStation | null }) => {
    if (!station) return (
        <Card className="border-dashed bg-muted/20">
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
                Xe hiện không ở trạm sạc nào
            </CardContent>
        </Card>
    )

    const googleMapsUrl = `https://www.google.com/maps?q=${station.latitude},${station.longitude}`

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase">
                    <MapPin className="h-4 w-4 text-primary" /> Vị trí hiện tại
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-1">
                    <p className="font-bold text-sm text-primary">{station.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {station.address}
                    </p>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-[10px] uppercase font-bold tracking-wider"
                    asChild
                >
                    <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                        Mở Google Maps <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                </Button>
            </CardContent>
        </Card>
    )
}