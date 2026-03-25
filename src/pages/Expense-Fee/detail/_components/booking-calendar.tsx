import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import bookingQueries from "@/queries/booking.query";

export default function BookingCalendar({ vehicleId }: { vehicleId?: string }) {
    const [open, setOpen] = useState(false);

    // Only fetch if vehicleId exists
    const { data } = bookingQueries.useAvaliableBooking({
        vehicleId: vehicleId || "",
        pageNumber: 1,
        pageSize: 9999
    });

    // Extract all booked dates from all items
    const bookedDates = data?.data?.data?.items?.flatMap(item => item.bookedDates) || [];

    // Convert string dates to Date objects for the calendar disabled prop
    const disabledDates = bookedDates.map(dateStr => new Date(dateStr));

    console.log("213123 ", vehicleId);
    console.log("saada ", disabledDates);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="default" className="gap-1.5" disabled={!vehicleId}>
                    <CalendarDays className="h-4 w-4" />
                    Xem lịch xe
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md flex flex-col items-center">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-center w-full">Lịch trình xe</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center w-full mt-4">
                    <Calendar
                        mode="multiple"
                        disabled={disabledDates}
                        className="rounded-md border shadow"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
