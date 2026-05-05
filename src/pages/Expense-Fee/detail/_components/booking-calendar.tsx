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
import { expenseFeeQueries } from "@/queries/expense-fee.query";
import { toast } from "sonner";
import { format, eachDayOfInterval } from "date-fns";
import type { DateRange } from "react-day-picker";

export default function BookingCalendar({ vehicleId, expenseFeeId, serviceDates, groupId }: { vehicleId?: string, expenseFeeId?: string, serviceDates?: string[], groupId?: string }) {
    const [open, setOpen] = useState(false);

    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());


    const [date, setDate] = useState<DateRange | undefined>(undefined);


    const { data, refetch } = bookingQueries.useAvaliableBooking({
        vehicleId: vehicleId || "",
        month: month + 1,
        year: year,
    });

    const { data: scheduleData } = expenseFeeQueries.useScheduleByGroup(groupId || "");
    const scheduledGroupDates = scheduleData?.data?.data?.flatMap(fee => fee.serviceDates) || [];


    const bookedDates = [
        ...(data?.data?.data?.items?.flatMap((item) => item.bookedDates) || []),
        ...(serviceDates || []),
        ...scheduledGroupDates,
    ];

    const disabledDates = bookedDates.map((dateStr) => {
        const [y, m, d] = dateStr.split('-');
        return new Date(Number(y), Number(m) - 1, Number(d));
    });


    const handleMonthChange = (date: Date) => {
        const newMonth = date.getMonth();
        const newYear = date.getFullYear();

        setMonth(newMonth);
        setYear(newYear);


        refetch();
    };

    const scheduleServiceMutation = expenseFeeQueries.useScheduleService();

    const handleConfirm = () => {
        if (!date?.from) return;

        const datesToSubmit = date.to
            ? eachDayOfInterval({ start: date.from, end: date.to })
            : [date.from];

        const dateStrings = datesToSubmit.map(d => format(d, "yyyy-MM-dd"));

        const hasDisabledDate = dateStrings.some(d => bookedDates.includes(d));
        if (hasDisabledDate) {
            toast.error("Khoảng thời gian đã chọn bao gồm ngày đã có lịch");
            return;
        }

        scheduleServiceMutation.mutate({
            id: expenseFeeId || "",
            body: dateStrings
        }, {
            onSuccess: () => {
                setOpen(false);
                toast.success("Lịch bảo dưỡng đã được cập nhật");
            }
        })
    };

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
                    <DialogTitle className="text-center w-full">
                        Chọn ngày bảo dưỡng
                    </DialogTitle>
                </DialogHeader>

                <div className="flex justify-center w-full mt-4">
                    <Calendar
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        onMonthChange={handleMonthChange}
                        disabled={disabledDates}
                        showOutsideDays={false}
                        className="rounded-md border shadow"
                    />
                </div>


                <div className="w-full mt-4 flex justify-end">
                    <Button onClick={handleConfirm} disabled={scheduleServiceMutation.isPending || !date?.from}>
                        {scheduleServiceMutation.isPending ? "Đang xử lý..." : "Xác nhận"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
