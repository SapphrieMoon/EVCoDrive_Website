export const GroupByEnum = {
    Day: "day",
    Week: "week",
    Month: "month",
    Year: "year",
} as const

export type GroupByEnum = typeof GroupByEnum[keyof typeof GroupByEnum]

export type DashboardParams = {
    From?: string;
    To?: string;
    GroupBy?: GroupByEnum
}

export interface Overview {
    totalUsers: number;
    activeUsers: number;

    totalVehicles: number;
    activeVehicles: number;

    totalRevenue: number;
    totalTransactions: number;

    totalBookings: number;

    totalInvestors: number;
    totalInvestmentAmount: number;

    growth: {
        usersPercent: number;
        revenuePercent: number;
        bookingsPercent: number;
    };
}

export interface ChartData {
    time: string;
    value: number;
}