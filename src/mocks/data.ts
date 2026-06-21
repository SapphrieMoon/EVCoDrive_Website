import type { User, UserProfile, Member } from "@/types/user.type";
import type { Overview, ChartData, TopVehicleList } from "@/types/dashboard.type";
import type { Vehicle, VehicleDetail } from "@/types/vehicle.type";
import type { Station } from "@/types/station.type";
import { VehicleStatus } from "@/types/vehicle.type";
import { GearShiftType, type VehicleModel } from "@/types/vehicle-model.type";
import type { CoOwnerGroup, CoOwnerGroupDetail } from "@/types/co-owner-group.type";
import type { Contract } from "@/types/contract.type";
import type { VehicleBrand } from "@/types/vehicle-brand.type";
import type { Staff } from "@/types/staff.type";
import type { Operator } from "@/types/operator";
import type { ExpenseFee, ExpenseFeeDetail, ExpenseFeeType } from "@/types/expense-fee.type";
import type { ExtraFeeType } from "@/types/extra-fee.type";
import type { Invoice } from "@/types/invoice.type";
import type { WalletWithdraw } from "@/types/withdraw.type";

// ================= USERS & PROFILE =================
export const mockUser: User = {
  id: "u-1",
  email: "admin@evcodrive.io.vn",
  identityCode: "0123456789",
  fullName: "EVCoDrive Admin",
  phone: "0987654321",
  dateOfBirth: "1995-05-15",
  gender: "Male",
  nationality: "Vietnam",
  homeTown: "Ha Noi",
  address: "123 Lang Street, Dong Da, Ha Noi",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  role: "Admin",
  isActive: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: null,
};

export const mockUserProfile: UserProfile = {
  id: "u-1",
  email: "admin@evcodrive.io.vn",
  identityCode: "0123456789",
  fullName: "EVCoDrive Admin",
  phone: "0987654321",
  dateOfBirth: "1995-05-15",
  gender: "Male",
  nationality: "Vietnam",
  homeTown: "Ha Noi",
  address: "123 Lang Street, Dong Da, Ha Noi",
  latitude: 21.028511,
  longitude: 105.804817,
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  role: "Admin",
  isActive: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: null,
};

// ================= SYSTEM OVERVIEW (DASHBOARD) =================
export const mockOverview: Overview = {
  totalUsers: 1250,
  activeUsers: 840,
  totalVehicles: 320,
  activeVehicles: 285,
  totalRevenue: 1543200000,
  totalTransactions: 3420,
  totalBookings: 2450,
  totalInvestors: 180,
  totalInvestmentAmount: 5000000000,
  growth: {
    usersPercent: 12.5,
    revenuePercent: 18.2,
    bookingsPercent: 8.7,
  },
};

export const mockRevenueChart: ChartData[] = [
  { time: "Jan", value: 120000000 },
  { time: "Feb", value: 150000000 },
  { time: "Mar", value: 180000000 },
  { time: "Apr", value: 220000000 },
  { time: "May", value: 310000000 },
  { time: "Jun", value: 563200000 },
];

export const mockBookingChart: ChartData[] = [
  { time: "Jan", value: 200 },
  { time: "Feb", value: 250 },
  { time: "Mar", value: 310 },
  { time: "Apr", value: 420 },
  { time: "May", value: 580 },
  { time: "Jun", value: 690 },
];

export const mockTopVehicles: TopVehicleList[] = [
  { brand: "VinFast", model: "VF 8 Eco", usageCount: 142 },
  { brand: "VinFast", model: "VF 9 Plus", usageCount: 98 },
  { brand: "VinFast", model: "VF e34", usageCount: 88 },
  { brand: "Hyundai", model: "Ioniq 5", usageCount: 65 },
  { brand: "VinFast", model: "VF 5 Plus", usageCount: 54 },
];

// ================= VEHICLES =================
export const mockVehicles: Vehicle[] = [
  {
    vehicleId: "v-1",
    licensePlate: "29A-999.99",
    chassisNumber: "VIN1234567890ABC1",
    engineNumber: "ENG9876543210XYZ1",
    color: "Crimson Red",
    year: 2024,
    vehicleStatus: VehicleStatus.Active,
    batteryHealth: 98,
    odometer: 12450,
    modelName: "VF 8 Eco",
    brandName: "VinFast",
    groupName: "HN EV Lovers",
    thumbnailUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
    createdDate: "2024-01-10T08:00:00Z",
  },
  {
    vehicleId: "v-2",
    licensePlate: "30E-888.88",
    chassisNumber: "VIN1234567890ABC2",
    engineNumber: "ENG9876543210XYZ2",
    color: "Sleek White",
    year: 2024,
    vehicleStatus: VehicleStatus.Inspecting,
    batteryHealth: 100,
    odometer: 150,
    modelName: "VF 9 Plus",
    brandName: "VinFast",
    groupName: "Saigon EV Club",
    thumbnailUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80",
    createdDate: "2024-02-15T09:30:00Z",
  },
  {
    vehicleId: "v-3",
    licensePlate: "51K-777.77",
    chassisNumber: "VIN1234567890ABC3",
    engineNumber: "ENG9876543210XYZ3",
    color: "Deep Ocean Blue",
    year: 2023,
    vehicleStatus: VehicleStatus.Maintenance,
    batteryHealth: 92,
    odometer: 32800,
    modelName: "VF e34",
    brandName: "VinFast",
    groupName: "Da Nang Green EV",
    thumbnailUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
    createdDate: "2023-06-20T10:15:00Z",
  },
  {
    vehicleId: "v-4",
    licensePlate: "43A-666.66",
    chassisNumber: "VIN1234567890ABC4",
    engineNumber: "ENG9876543210XYZ4",
    color: "Urban Gray",
    year: 2024,
    vehicleStatus: VehicleStatus.Pending,
    batteryHealth: 99,
    odometer: 1200,
    modelName: "VF 5 Plus",
    brandName: "VinFast",
    groupName: "Green Mobility Corp",
    thumbnailUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80",
    createdDate: "2024-03-01T14:00:00Z",
  },
];

export const mockVehicleDetails: Record<string, VehicleDetail> = {
  "v-1": {
    vehicleId: "v-1",
    memberId: "m-1",
    licensePlate: "29A-999.99",
    chassisNumber: "VIN1234567890ABC1",
    engineNumber: "ENG9876543210XYZ1",
    color: "Crimson Red",
    year: 2024,
    odometer: 12450,
    batteryHealth: 98,
    isBrandNew: "False",
    vehicleStatus: VehicleStatus.Active,
    lastMaintenanceDate: "2024-05-10T08:00:00Z",
    createdDate: "2024-01-10T08:00:00Z",
    updatedDate: "2024-05-10T08:00:00Z",
    vehicleModel: {
      vehicleModelId: "vm-1",
      name: "VF 8 Eco",
      brandName: "VinFast",
      gearShiftType: GearShiftType.AUTOMATIC,
      range: 420,
      batteryCapacity: 88.8,
      seatingCapacity: 5,
    },
    coOwnerGroup: {
      coOwnerGroupId: "cg-1",
      name: "HN EV Lovers",
      description: "Ha Noi EV Co-owners Group",
      totalShare: 100,
      sharePrice: 50000000,
      status: "Active",
    },
    currentStation: {
      stationId: "s-1",
      name: "HN Dong Da Charging Station",
      address: "100 Thai Ha, Dong Da, Ha Noi",
      latitude: 21.0116,
      longitude: 105.8211,
    },
    images: [
      {
        mediaId: "img-1",
        name: "VF8 Exterior",
        url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
        secureUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
        type: "Exterior",
        width: 800,
        height: 600,
      },
      {
        mediaId: "img-2",
        name: "VF8 Interior",
        url: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
        secureUrl: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
        type: "Interior",
        width: 800,
        height: 600,
      },
    ],
  },
  "v-2": {
    vehicleId: "v-2",
    memberId: "m-2",
    licensePlate: "30E-888.88",
    chassisNumber: "VIN1234567890ABC2",
    engineNumber: "ENG9876543210XYZ2",
    color: "Sleek White",
    year: 2024,
    odometer: 150,
    batteryHealth: 100,
    isBrandNew: "True",
    vehicleStatus: VehicleStatus.Inspecting,
    lastMaintenanceDate: null,
    createdDate: "2024-02-15T09:30:00Z",
    updatedDate: "2024-02-15T09:30:00Z",
    vehicleModel: {
      vehicleModelId: "vm-2",
      name: "VF 9 Plus",
      brandName: "VinFast",
      gearShiftType: GearShiftType.AUTOMATIC,
      range: 580,
      batteryCapacity: 123,
      seatingCapacity: 7,
    },
    coOwnerGroup: {
      coOwnerGroupId: "cg-2",
      name: "Saigon EV Club",
      description: "Saigon EV Co-owners Group",
      totalShare: 150,
      sharePrice: 70000000,
      status: "Active",
    },
    currentStation: {
      stationId: "s-2",
      name: "HCM District 1 Central Station",
      address: "1 Le Loi, District 1, HCMC",
      latitude: 10.7769,
      longitude: 106.7009,
    },
    images: [
      {
        mediaId: "img-3",
        name: "VF9 Exterior",
        url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        secureUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        type: "Exterior",
        width: 800,
        height: 600,
      },
    ],
  },
};

// ================= STATIONS =================
export const mockStations: Station[] = [
  {
    stationId: "s-1",
    name: "HN Dong Da Charging Station",
    address: "100 Thai Ha, Dong Da, Ha Noi",
    openTime: "2024-01-01T06:00:00Z",
    closeTime: "2024-01-01T22:00:00Z",
    latitude: 21.0116,
    longitude: 105.8211,
    isOpen: "open",
    status: "Active",
    createdDate: "2024-01-01T06:00:00Z",
    updatedDate: "2024-01-01T06:00:00Z",
  },
  {
    stationId: "s-2",
    name: "HCM District 1 Central Station",
    address: "1 Le Loi, District 1, HCMC",
    openTime: "2024-01-01T06:00:00Z",
    closeTime: "2024-01-01T23:00:00Z",
    latitude: 10.7769,
    longitude: 106.7009,
    isOpen: "open",
    status: "Active",
    createdDate: "2024-01-01T06:00:00Z",
    updatedDate: "2024-01-01T06:00:00Z",
  },
  {
    stationId: "s-3",
    name: "Da Nang Ngu Hanh Son Station",
    address: "250 Vo Nguyen Giap, Ngu Hanh Son, Da Nang",
    openTime: "2024-01-01T07:00:00Z",
    closeTime: "2024-01-01T21:00:00Z",
    latitude: 16.0544,
    longitude: 108.2435,
    isOpen: "open",
    status: "Active",
    createdDate: "2024-01-01T06:00:00Z",
    updatedDate: "2024-01-01T06:00:00Z",
  },
];

// ================= MEMBERS =================
export const mockMembers: Member[] = [
  {
    memberId: "m-1",
    accountId: "acc-1",
    email: "nguyenvan.a@gmail.com",
    fullName: "Nguyen Van A",
    phone: "0901234567",
    isActive: true,
    isBlocked: false,
    blockReason: "",
    createdDate: "2024-01-15T08:00:00Z",
    updatedDate: "2024-05-15T10:00:00Z",
  },
  {
    memberId: "m-2",
    accountId: "acc-2",
    email: "tranthis.b@gmail.com",
    fullName: "Tran Thi B",
    phone: "0912345678",
    isActive: true,
    isBlocked: false,
    blockReason: "",
    createdDate: "2024-02-10T09:15:00Z",
    updatedDate: "2024-02-10T09:15:00Z",
  },
  {
    memberId: "m-3",
    accountId: "acc-3",
    email: "lehoang.c@gmail.com",
    fullName: "Le Hoang C",
    phone: "0934567890",
    isActive: false,
    isBlocked: true,
    blockReason: "Violation of rental policies",
    createdDate: "2023-11-20T14:30:00Z",
    updatedDate: "2024-04-12T16:00:00Z",
  },
];

// ================= BOOKINGS =================
export const mockBookings = [
  {
    bookingId: "b-1",
    licensePlate: "29A-999.99",
    modelName: "VF 8 Eco",
    thumbnailUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
    customerName: "Nguyen Van A",
    phone: "0901234567",
    startDate: "2026-06-22T08:00:00Z",
    endDate: "2026-06-25T17:00:00Z",
    bookingStatus: "Paid",
    totalAmount: 3200000,
  },
  {
    bookingId: "b-2",
    licensePlate: "51K-777.77",
    modelName: "VF e34",
    thumbnailUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
    customerName: "Tran Thi B",
    phone: "0912345678",
    startDate: "2026-06-20T09:00:00Z",
    endDate: "2026-06-21T18:00:00Z",
    bookingStatus: "Completed",
    totalAmount: 1200000,
  },
  {
    bookingId: "b-3",
    licensePlate: "30E-888.88",
    modelName: "VF 9 Plus",
    thumbnailUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80",
    customerName: "Pham Xuan D",
    phone: "0945678901",
    startDate: "2026-06-23T10:00:00Z",
    endDate: "2026-06-24T18:00:00Z",
    bookingStatus: "Pending",
    totalAmount: 2000000,
  },
];

export const mockBookingDetails: Record<string, any> = {
  "b-1": {
    bookingId: "b-1",
    totalAmount: 3200000,
    bookingStatus: "Paid",
    startDate: "2026-06-22T08:00:00Z",
    endDate: "2026-06-25T17:00:00Z",
    customerName: "Nguyen Van A",
    phone: "0901234567",
    email: "nguyenvan.a@gmail.com",
    licensePlate: "29A-999.99",
    vehicleModelName: "VF 8 Eco",
    vehicleBrandName: "VinFast",
    vehicleColor: "Crimson Red",
    vehicleThumbnail: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
    startOdometer: 12450,
    endOdometer: null,
    actualStartDate: null,
    actualEndDate: null,
    extraFees: [],
    segments: [
      {
        segmentId: "bs-1",
        title: "Initial Handover",
        status: "Pending",
        scheduledTime: "2026-06-22T08:00:00Z",
      },
    ],
  },
};

// ================= CO-OWNER GROUPS =================
export const mockCoOwnerGroups: CoOwnerGroup[] = [
  {
    coOwnerGroupId: "cg-1",
    name: "HN EV Lovers",
    description: "Ha Noi EV Co-owners Group",
    totalShare: 100,
    sharePrice: 50000000,
    coOwnerGroupStatus: "Active",
    createdDate: "2024-01-01T00:00:00Z",
    updatedDate: "2024-01-01T00:00:00Z",
  },
  {
    coOwnerGroupId: "cg-2",
    name: "Saigon EV Club",
    description: "Saigon EV Co-owners Group",
    totalShare: 150,
    sharePrice: 70000000,
    coOwnerGroupStatus: "Active",
    createdDate: "2024-02-15T00:00:00Z",
    updatedDate: "2024-02-15T00:00:00Z",
  },
];

export const mockCoOwnerGroupDetails: Record<string, CoOwnerGroupDetail> = {
  "cg-1": {
    coOwnerGroupId: "cg-1",
    groupName: "HN EV Lovers",
    description: "Ha Noi EV Co-owners Group",
    vehicleId: "v-1",
    vehicleLicensePlate: "29A-999.99",
    totalShares: 100,
    sharePrice: 50000000,
    status: "Active",
    coOwnershipContractUrl: "https://evcodrive.io.vn/contracts/dummy.pdf",
    vehicleRegistrationCertificateUrl: "https://evcodrive.io.vn/certs/dummy.pdf",
    shareHolders: [],
    shareUnits: [],
    contracts: [],
  },
  "cg-2": {
    coOwnerGroupId: "cg-2",
    groupName: "Saigon EV Club",
    description: "Saigon EV Co-owners Group",
    vehicleId: "v-2",
    vehicleLicensePlate: "30E-888.88",
    totalShares: 150,
    sharePrice: 70000000,
    status: "Active",
    coOwnershipContractUrl: "https://evcodrive.io.vn/contracts/dummy.pdf",
    vehicleRegistrationCertificateUrl: "https://evcodrive.io.vn/certs/dummy.pdf",
    shareHolders: [],
    shareUnits: [],
    contracts: [],
  },
};

// ================= CONTRACTS =================
export const mockContracts: Contract[] = [
  {
    contractId: "c-1",
    contractTypeId: "ct-1",
    contractTypeName: "Co-ownership Contract",
    contractTypeCode: "CO_OWN",
    vehicleId: "v-1",
    vehicleModelName: "VF 8 Eco",
    partyAEmail: "admin@evcodrive.io.vn",
    partyBEmail: "nguyenvan.a@gmail.com",
    buyRequestId: "br-1",
    partyAId: "u-1",
    partyAName: "EVCoDrive Admin",
    partyBId: "m-1",
    partyBName: "Nguyen Van A",
    contractNumber: "HD-2026-0001",
    title: "Hợp đồng đồng sở hữu xe VF 8 Eco",
    description: "Hợp đồng đồng sở hữu xe giữa hệ thống EVCoDrive và Nguyễn Văn A.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    signedDate: "2026-06-20T08:00:00Z",
    contractStatuses: "Completed",
    partyAVerifiedAt: "2026-06-20T08:00:00Z",
    partyAVerifiedEmail: "admin@evcodrive.io.vn",
    partyBVerifiedAt: "2026-06-20T08:15:00Z",
    partyBVerifiedEmail: "nguyenvan.a@gmail.com",
    isFullyVerified: true,
    createdDate: "2026-06-19T10:00:00Z",
    updatedDate: "2026-06-20T08:15:00Z",
  },
];

// ================= VEHICLE BRANDS & MODELS =================
export const mockVehicleBrands: VehicleBrand[] = [
  {
    vehicleBrandId: "vb-1",
    name: "VinFast",
    logoUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=150&q=80",
    createdDate: "2025-01-01T00:00:00Z",
    updatedDate: "2025-01-01T00:00:00Z",
  },
  {
    vehicleBrandId: "vb-2",
    name: "Hyundai",
    logoUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=150&q=80",
    createdDate: "2025-01-01T00:00:00Z",
    updatedDate: "2025-01-01T00:00:00Z",
  },
];

export const mockVehicleModels: VehicleModel[] = [
  {
    vehicleModelId: "vm-1",
    name: "VF 8 Eco",
    vehicleBrand: {
      vehicleBrandId: "vb-1",
      name: "VinFast",
      logoUrl: "",
    },
    gearShiftType: GearShiftType.AUTOMATIC,
    range: 420,
    batteryCapacity: 88.8,
    seatingCapacity: 5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    vehicleModelId: "vm-2",
    name: "VF 9 Plus",
    vehicleBrand: {
      vehicleBrandId: "vb-1",
      name: "VinFast",
      logoUrl: "",
    },
    gearShiftType: GearShiftType.AUTOMATIC,
    range: 580,
    batteryCapacity: 123,
    seatingCapacity: 7,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
];

// ================= STAFF & OPERATORS =================
export const mockStaffs: Staff[] = [
  {
    staffId: "st-1",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    name: "Le Thu Thao",
    phoneNumber: "0902222333",
    address: "456 Thai Ha, Dong Da, Ha Noi",
    stationId: "s-1",
    stationName: "HN Dong Da Charging Station",
    createdDate: "2025-03-01T08:00:00Z",
    updatedDate: "2025-03-01T08:00:00Z",
  },
];

export const mockOperators: Operator[] = [
  {
    operatorId: "op-1",
    accountId: "acc-op1",
    email: "operator.hn@evcodrive.io.vn",
    fullName: "Tran Xuan Quang",
    phone: "0904444555",
    stationId: "s-1",
    stationName: "HN Dong Da Charging Station",
    isActive: true,
    createdDate: "2025-02-01T08:00:00Z",
    updatedDate: "2025-02-01T08:00:00Z",
  },
];

// ================= EXPENSES & FEES =================
export const mockExpenseFees: ExpenseFee[] = [
  {
    expenseFeeId: "ef-1",
    coOwnerGroupId: "cg-1",
    vehicleId: "v-1",
    invoiceId: null,
    votingId: null,
    expenseFeeTypeId: "eft-1",
    name: "Phí bảo trì định kỳ 10k km",
    amount: 1500000,
    currency: "VND",
    description: "Thay nhớt hộp số, kiểm tra định kỳ phanh và lốp xe.",
    expenseDate: "2026-06-15T08:00:00Z",
    status: "Paid",
    serviceDates: ["2026-06-15T08:00:00Z"],
    createdDate: "2026-06-14T09:00:00Z",
    updatedDate: "2026-06-15T10:00:00Z",
  },
];

export const mockExpenseFeeDetails: Record<string, ExpenseFeeDetail> = {
  "ef-1": {
    expenseFeeId: "ef-1",
    coOwnerGroupId: "cg-1",
    vehicleId: "v-1",
    invoiceId: null,
    votingId: null,
    expenseFeeTypeId: "eft-1",
    name: "Phí bảo trì định kỳ 10k km",
    amount: 1500000,
    currency: "VND",
    description: "Thay nhớt hộp số, kiểm tra định kỳ phanh và lốp xe.",
    expenseDate: "2026-06-15T08:00:00Z",
    status: "Paid",
    serviceDates: ["2026-06-15T08:00:00Z"],
    createdDate: "2026-06-14T09:00:00Z",
    updatedDate: "2026-06-15T10:00:00Z",
  },
};

export const mockExpenseFeeTypes: ExpenseFeeType[] = [
  {
    expenseFeeTypeId: "eft-1",
    expenseFeeTypeName: "Bảo trì định kỳ",
    expenseFeeTypeDescription: "Các loại phí phát sinh do bảo trì định kỳ của xe theo km sử dụng.",
    createdDate: "2025-01-01T00:00:00Z",
    updatedDate: "2025-01-01T00:00:00Z",
  },
  {
    expenseFeeTypeId: "eft-2",
    expenseFeeTypeName: "Sửa chữa sự cố",
    expenseFeeTypeDescription: "Phí sửa chữa hư hỏng đột xuất hoặc thay thế phụ tùng bị hỏng hóc.",
    createdDate: "2025-01-01T00:00:00Z",
    updatedDate: "2025-01-01T00:00:00Z",
  },
];

export const mockExtraFeeTypes: ExtraFeeType[] = [
  {
    extraFeeTypeId: "xft-1",
    extraFeeTypeName: "Trả xe muộn",
    exptraFeeTypeDescription: "Phí phát sinh khi khách hàng trả xe trễ so với giờ hẹn trong hợp đồng.",
    createdDate: "2025-01-01T00:00:00Z",
    updatedDate: "2025-01-01T00:00:00Z",
  },
  {
    extraFeeTypeId: "xft-2",
    extraFeeTypeName: "Vệ sinh xe",
    exptraFeeTypeDescription: "Phí dọn dẹp vệ sinh nếu xe bị bẩn nhiều ở nội ngoại thất khi bàn giao lại.",
    createdDate: "2025-01-01T00:00:00Z",
    updatedDate: "2025-01-01T00:00:00Z",
  },
];

// ================= INVOICES =================
export const mockInvoices: Invoice[] = [
  {
    invoiceId: "inv-1",
    extraFeeId: null,
    extraFeeTypeId: null,
    extraFeeTypeName: null,
    coOwnerGroupId: "cg-1",
    memberId: "m-1",
    invoiceNumber: "INV-2026-0001",
    description: "Hóa đơn chia sẻ chi phí vận hành nhóm HN EV Lovers - Tháng 06/2026",
    totalAmount: 150000,
    currency: "VND",
    invoiceStatus: "Paid",
    dueDate: "2026-07-05T00:00:00Z",
    paidDate: "2026-06-20T10:00:00Z",
    createdDate: "2026-06-20T08:00:00Z",
    updatedDate: "2026-06-20T10:00:00Z",
    details: [],
  },
];

// ================= WITHDRAWALS =================
export const mockWalletWithdraws: WalletWithdraw[] = [
  {
    walletWithdrawId: "ww-1",
    amount: 10000000,
    currency: "VND",
    bankAccount: "19034567890123",
    bankName: "Techcombank",
    status: "Pending",
    requestDate: "2026-06-21T12:00:00Z",
    processedDate: null,
  },
  {
    walletWithdrawId: "ww-2",
    amount: 5000000,
    currency: "VND",
    bankAccount: "0071001234567",
    bankName: "Vietcombank",
    status: "Completed",
    requestDate: "2026-06-15T09:00:00Z",
    processedDate: "2026-06-16T10:00:00Z",
  },
];
