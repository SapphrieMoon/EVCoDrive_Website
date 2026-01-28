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