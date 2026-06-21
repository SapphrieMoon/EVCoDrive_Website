import type MockAdapter from "axios-mock-adapter";
import * as mockData from "./data";

function paginate<T>(items: T[], pageNumber = 1, pageSize = 10) {
  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  return {
    items: paginatedItems,
    totalCount,
    pageNumber,
    pageSize,
    totalPages,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages,
  };
}

export function setupMockHandlers(mock: MockAdapter) {
  // ================= AUTHENTICATION =================
  mock.onPost("/auth/login").reply((config) => {
    try {
      const { email } = JSON.parse(config.data || "{}");
      return [
        200,
        {
          message: "Login successful",
          data: {
            token: "mock-jwt-token-12345",
            refreshToken: "mock-refresh-token-12345",
            tokenExpiry: new Date(Date.now() + 3600000).toISOString(),
            user: {
              ...mockData.mockUser,
              email: email || mockData.mockUser.email,
            },
            stationId: "s-1",
            stationName: "HN Dong Da Charging Station",
          },
        },
      ];
    } catch {
      return [
        200,
        {
          message: "Login successful",
          data: {
            token: "mock-jwt-token-12345",
            refreshToken: "mock-refresh-token-12345",
            tokenExpiry: new Date(Date.now() + 3600000).toISOString(),
            user: mockData.mockUser,
            stationId: "s-1",
            stationName: "HN Dong Da Charging Station",
          },
        },
      ];
    }
  });

  mock.onPost("/auth/logout").reply(200, {
    message: "Logout successful",
  });

  mock.onGet("/auth/profile").reply(200, {
    message: "Profile retrieved successfully",
    data: mockData.mockUserProfile,
  });

  mock.onPost("/auth/refresh-token").reply(200, {
    message: "Token refreshed",
    data: {
      access_token: "mock-jwt-token-refresh-12345",
    },
  });

  // ================= DASHBOARD =================
  mock.onGet(/\/admin\/dashboard\/overview(\?.*)?/).reply(200, mockData.mockOverview);

  mock.onGet(/\/admin\/dashboard\/revenue-chart(\?.*)?/).reply(200, mockData.mockRevenueChart);

  mock.onGet(/\/admin\/dashboard\/booking-chart(\?.*)?/).reply(200, mockData.mockBookingChart);

  mock.onGet(/\/admin\/dashboard\/top-vehicles(\?.*)?/).reply(200, mockData.mockTopVehicles);

  // ================= VEHICLES =================
  // Pagination
  mock.onGet(/\/vehicles\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const status = url.searchParams.get("status");

    let filtered = [...mockData.mockVehicles];
    if (status) {
      filtered = filtered.filter((v) => v.vehicleStatus === status);
    }

    return [
      200,
      {
        message: "Vehicles fetched successfully",
        data: paginate(filtered, pageNumber, pageSize),
      },
    ];
  });

  // Detail
  mock.onGet(/\/vehicles\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const vehicle = mockData.mockVehicleDetails[id] || mockData.mockVehicleDetails["v-1"];

    return [
      200,
      {
        message: "Vehicle details fetched successfully",
        data: vehicle,
      },
    ];
  });

  // Update Status
  mock.onPatch(/\/vehicles\/[a-zA-Z0-9-]+\/status/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 2];
    const status = new URL(config.url || "", "http://localhost").searchParams.get("status");

    if (mockData.mockVehicleDetails[id]) {
      mockData.mockVehicleDetails[id].vehicleStatus = status as any;
    }
    const idx = mockData.mockVehicles.findIndex((v) => v.vehicleId === id);
    if (idx !== -1) {
      mockData.mockVehicles[idx].vehicleStatus = status as any;
    }

    return [
      200,
      {
        message: "Vehicle status updated successfully",
      },
    ];
  });

  // ================= CO-OWNER GROUPS =================
  mock.onGet(/\/coownergroups(\?.*)?/).reply(200, {
    message: "Co-owner groups fetched successfully",
    data: mockData.mockCoOwnerGroups,
  });

  mock.onGet(/\/coownergroups\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Co-owner groups fetched successfully",
        data: paginate(mockData.mockCoOwnerGroups, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/coownergroups\/[a-zA-Z0-9-]+\/details/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 2]; // e.g. /coownergroups/:id/details
    const detail = mockData.mockCoOwnerGroupDetails[id] || mockData.mockCoOwnerGroupDetails["cg-1"];
    return [
      200,
      {
        message: "Co-owner group details fetched successfully",
        data: detail,
      },
    ];
  });

  mock.onPatch(/\/coownergroups\/[a-zA-Z0-9-]+\/status/).reply(200, {
    message: "Status updated successfully",
  });

  mock.onPatch(/\/coownergroups\/[a-zA-Z0-9-]+\/approve/).reply(200, {
    message: "Approved successfully",
  });

  mock.onPatch(/\/coownergroups\/[a-zA-Z0-9-]+\/reject/).reply(200, {
    message: "Rejected successfully",
  });

  // ================= CONTRACTS =================
  mock.onGet(/\/contracts(\?.*)?/).reply(200, {
    message: "Contracts fetched successfully",
    data: paginate(mockData.mockContracts, 1, 10),
  });

  mock.onGet(/\/contracts\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Contracts fetched successfully",
        data: paginate(mockData.mockContracts, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/contracts\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const contract = mockData.mockContracts.find((c) => c.contractId === id) || mockData.mockContracts[0];

    return [
      200,
      {
        message: "Contract details fetched successfully",
        data: contract,
      },
    ];
  });

  mock.onGet(/\/contracts\/[a-zA-Z0-9-]+\/pdf/).reply(200, new Blob(["dummy pdf content"], { type: "application/pdf" }), {
    "Content-Type": "application/pdf",
  });

  // ================= VEHICLE BRANDS =================
  mock.onGet(/\/vehiclebrands(\?.*)?/).reply(200, {
    message: "Brands fetched successfully",
    data: mockData.mockVehicleBrands,
  });

  mock.onGet(/\/vehiclebrands\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Brands fetched successfully",
        data: paginate(mockData.mockVehicleBrands, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/vehiclebrands\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const brand = mockData.mockVehicleBrands.find((b) => b.vehicleBrandId === id) || mockData.mockVehicleBrands[0];

    return [
      200,
      {
        message: "Brand details fetched successfully",
        data: brand,
      },
    ];
  });

  // ================= VEHICLE MODELS =================
  mock.onGet(/\/vehiclemodels(\?.*)?/).reply(200, {
    message: "Models fetched successfully",
    data: mockData.mockVehicleModels,
  });

  mock.onGet(/\/vehiclemodels\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Models fetched successfully",
        data: paginate(mockData.mockVehicleModels, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/vehiclemodels\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const model = mockData.mockVehicleModels.find((m) => m.vehicleModelId === id) || mockData.mockVehicleModels[0];

    return [
      200,
      {
        message: "Model details fetched successfully",
        data: model,
      },
    ];
  });

  // ================= STATIONS =================
  mock.onGet(/\/stations(\?.*)?/).reply(200, {
    message: "Stations fetched successfully",
    data: mockData.mockStations,
  });

  mock.onGet(/\/stations\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Stations fetched successfully",
        data: paginate(mockData.mockStations, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/stations\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const station = mockData.mockStations.find((s) => s.stationId === id) || mockData.mockStations[0];
    return [
      200,
      {
        message: "Station details fetched successfully",
        data: station,
      },
    ];
  });

  // ================= MEMBERS =================
  mock.onGet(/\/members\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Members fetched successfully",
        data: paginate(mockData.mockMembers, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/members\/[a-zA-Z0-9-]+\/profile/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 2];
    const member = mockData.mockMembers.find((m) => m.memberId === id) || mockData.mockMembers[0];

    return [
      200,
      {
        message: "Member profile fetched successfully",
        data: {
          memberId: member.memberId,
          accountId: member.accountId,
          fullName: member.fullName,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
          memberSince: member.createdDate,
          currentGroups: [],
          purchaseHistory: [],
          sellHistory: [],
        },
      },
    ];
  });

  // ================= OPERATORS =================
  mock.onGet(/\/operators(\?.*)?/).reply((_config) => {
    return [
      200,
      {
        message: "Operators fetched successfully",
        data: mockData.mockOperators[0],
      },
    ];
  });

  mock.onGet(/\/operators\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Operators fetched successfully",
        data: paginate(mockData.mockOperators, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/operators\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const operator = mockData.mockOperators.find((o) => o.operatorId === id) || mockData.mockOperators[0];

    return [
      200,
      {
        message: "Operator fetched successfully",
        data: operator,
      },
    ];
  });

  // ================= STAFFS =================
  mock.onGet(/\/staffs(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Staffs fetched successfully",
        data: paginate(mockData.mockStaffs, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/staffs\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const staff = mockData.mockStaffs.find((s) => s.staffId === id) || mockData.mockStaffs[0];

    return [
      200,
      {
        message: "Staff fetched successfully",
        data: staff,
      },
    ];
  });

  // ================= EXPENSES =================
  mock.onGet(/\/expenses\/pagination(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Expenses fetched successfully",
        data: paginate(mockData.mockExpenseFees, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/expenses\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const detail = mockData.mockExpenseFeeDetails[id] || mockData.mockExpenseFeeDetails["ef-1"];

    return [
      200,
      {
        message: "Expense details fetched successfully",
        data: detail,
      },
    ];
  });

  // Expense Fee Types
  mock.onGet(/\/expense-fee-types\/all(\?.*)?/).reply(200, {
    message: "Expense fee types fetched",
    data: mockData.mockExpenseFeeTypes,
  });

  mock.onGet(/\/expense-fee-types(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Expense fee types fetched",
        data: paginate(mockData.mockExpenseFeeTypes, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/expense-fee-types\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const type = mockData.mockExpenseFeeTypes.find((t) => t.expenseFeeTypeId === id) || mockData.mockExpenseFeeTypes[0];

    return [
      200,
      {
        message: "Expense fee type detail fetched",
        data: type,
      },
    ];
  });

  // ================= EXTRA FEES =================
  mock.onGet(/\/extra-fee-types\/all(\?.*)?/).reply(200, {
    message: "Extra fee types fetched",
    data: mockData.mockExtraFeeTypes,
  });

  mock.onGet(/\/extra-fee-types(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Extra fee types fetched",
        data: paginate(mockData.mockExtraFeeTypes, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/extra-fee-types\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const type = mockData.mockExtraFeeTypes.find((t) => t.extraFeeTypeId === id) || mockData.mockExtraFeeTypes[0];

    return [
      200,
      {
        message: "Extra fee type detail fetched",
        data: type,
      },
    ];
  });

  // ================= INVOICES =================
  mock.onGet(/\/invoices$/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Invoices fetched successfully",
        data: paginate(mockData.mockInvoices, pageNumber, pageSize),
      },
    ];
  });

  mock.onGet(/\/invoices\/[a-zA-Z0-9-]+$/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 1];
    const invoice = mockData.mockInvoices.find((i) => i.invoiceId === id) || mockData.mockInvoices[0];

    return [
      200,
      {
        message: "Invoice detail fetched successfully",
        data: invoice,
      },
    ];
  });

  // ================= WITHDRAWALS =================
  mock.onGet(/\/wallets\/withdrawals(\?.*)?/).reply((config) => {
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Withdrawals fetched successfully",
        data: paginate(mockData.mockWalletWithdraws, pageNumber, pageSize),
      },
    ];
  });

  mock.onPut(/\/wallets\/withdrawals\/[a-zA-Z0-9-]+\/status/).reply((config) => {
    const parts = config.url?.split("/") || [];
    const id = parts[parts.length - 2];
    const { status } = JSON.parse(config.data || "{}");

    const idx = mockData.mockWalletWithdraws.findIndex((w) => w.walletWithdrawId === id);
    if (idx !== -1) {
      mockData.mockWalletWithdraws[idx].status = status;
    }

    return [
      200,
      {
        message: "Withdrawal status updated successfully",
      },
    ];
  });

  // ================= BOOKINGS =================
  mock.onGet(/\/bookings(\?.*)?/).reply((config) => {
    const rawPath = config.url?.split("?")[0] || "";
    const pathParts = rawPath.split("/").filter(Boolean);
    
    // Check if detail request: /bookings/:id
    if (pathParts.length > 1) {
      const id = pathParts[pathParts.length - 1];
      const detail = mockData.mockBookingDetails[id] || mockData.mockBookingDetails["b-1"];
      return [
        200,
        {
          message: "Booking details fetched successfully",
          data: detail,
        },
      ];
    }

    // Pagination
    const url = new URL(config.url || "", "http://localhost");
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    return [
      200,
      {
        message: "Bookings fetched successfully",
        data: paginate(mockData.mockBookings, pageNumber, pageSize),
      },
    ];
  });
}
