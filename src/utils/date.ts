export const formatDate = (
    dateString: string | undefined | null,
    includeTime: boolean = true // Mặc định là có giờ
) => {
    if (!dateString) return "---"

    const date = new Date(dateString)

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }

    // Nếu muốn có cả giờ:
    if (includeTime) {
        options.hour = "2-digit"
        options.minute = "2-digit"
    }

    return new Intl.DateTimeFormat("vi-VN", options).format(date)
}

export const formatTime = (date: string | Date | undefined): string => {
    if (!date) return "---";

    const d = new Date(date);

    if (isNaN(d.getTime()) && typeof date === "string") {
        const [hours, minutes] = date.split(":");
        const h = parseInt(hours);
        const m = parseInt(minutes);
        return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, '0')}`;
    }

    const hours = d.getHours();
    const minutes = d.getMinutes();

    // Nếu phút = 0 thì chỉ hiện "6h", ngược lại hiện "6h30"
    return minutes === 0 ? `${hours}h` : `${hours}h${minutes.toString().padStart(2, '0')}`;
};