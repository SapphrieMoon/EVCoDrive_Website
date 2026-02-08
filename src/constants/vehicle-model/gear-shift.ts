export const GEAR_SHIFT_MAPPING: Record<string, { label: string; color: string }> = {
    "Single Speed": {
        label: "Số đơn cấp (EV)",
        color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    "Manual": {
        label: "Số sàn",
        color: "bg-gray-50 text-gray-700 border-gray-200",
    },
    "Automatic": {
        label: "Số tự động",
        color: "bg-purple-50 text-purple-700 border-purple-200",
    },
}

// Helper để lấy label an toàn
export const getGearShiftLabel = (type: string | undefined) => {
    if (!type) return "Chưa xác định"
    return GEAR_SHIFT_MAPPING[type]?.label || type // Trả về chính nó nếu chưa có trong map
}