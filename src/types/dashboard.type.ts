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
