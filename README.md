<p align="center">
  <img src="./public/cover.png" alt="EVCoDrive Banner" width="100%"/>
</p>

# 🚗 EVCoDrive

Electric Vehicle (EV) Co-ownership & Sharing Management Platform.

## 🎯 Overview

**EVCoDrive** is a modern management system for co-owned Electric Vehicles (EVs). It provides administrators and operators with a powerful dashboard to manage vehicles, charging stations, co-ownership groups, bookings, contracts, and finances. 

The platform focuses on high-performance operations, clear data visualization, and a secure dashboard experience for efficient fleet management.

This project was built as a real-world product, covering UI/UX design, frontend development, deployment, and integration with backend and mobile services.

---

## 🌐 Live Demo

The project has been deployed and is publicly accessible at:

👉 **[https://evcodrive.vercel.app/](https://evcodrive.vercel.app/)**

> [!NOTE]
> This is a **demo deployment** for UI/UX showcase purposes, not a real production environment.
> 
> **🔑 Demo Login:**
> Since this demo uses mock data, you can log in using **any email and password**. The only requirement is that the email must follow a valid email format (e.g., `admin@example.com`).

---

## 📄 Project Documents

Access the official project documents, specifications, and guidelines here:

👉 **Project Documents**  
https://drive.google.com/drive/folders/1xHdGKG8b1f5Oz0iZlVl2BX_Y6QVUnbIu?usp=sharing

---

## 🧩 Key Features

- 📊 **Real-time Analytics Dashboard**: Tracks total revenue, active users, bookings, and vehicle statuses with visual charts.
- 👥 **Co-Owner Group Management**: Manage groups sharing EV ownership, including share unit tracking and status updates.
- 🚗 **Vehicle & Brand Management**: Add and maintain EV models, brands, and detailed technical specifications.
- 🔌 **Station Management**: Manage EV charging stations, locations, and status records.
- 📅 **Booking & Calendar Tracking**: View and filter schedules, handle cancellations, and monitor active booking periods.
- 📝 **Contract & Fee Management**: Automate platform contracts, track periodic expense fees, and manage extra fees.
- 💼 **Financial & Wallets**: Manage billing invoices, co-owner group wallets, and operator withdrawal requests.
- 🔐 **Secure Role-Based Access**: Multi-role support (Admin, Operator, Staff, Co-owner, Member) for system safety.

---

## 🛠️ Tech Stack

- **Framework & Tooling**: Vite (v7)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4 via `@tailwindcss/vite`) & Shadcn UI components
- **Routing**: React Router DOM (v7)
- **Server State Management**: TanStack Query (React Query v5)
- **State Management**: React Context (`app.context.tsx`)
- **Forms & Validation**: React Hook Form + Zod Resolvers
- **Tables & Charts**: TanStack Table (v8) & Recharts
- **API Communication**: Axios
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

---

## 📂 Project Structure

```
├── 📁 public
│   └── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 apis
│   │   ├── 📄 auth.api.ts
│   │   ├── 📄 booking.api.ts
│   │   ├── 📄 co-owner-group.api.ts
│   │   ├── 📄 contract.api.ts
│   │   ├── 📄 dashboard.api.ts
│   │   ├── 📄 expense-fee.api.ts
│   │   ├── 📄 extra-free.api.ts
│   │   ├── 📄 group-wallet.api.ts
│   │   ├── 📄 invoice.api.ts
│   │   ├── 📄 operator.api.ts
│   │   ├── 📄 staff.api.ts
│   │   ├── 📄 station.api.ts
│   │   ├── 📄 user.api.ts
│   │   ├── 📄 vehicle-brand.api.ts
│   │   ├── 📄 vehicle-model.api.ts
│   │   ├── 📄 vehicle.api.ts
│   │   └── 📄 withdraw.api.ts
│   ├── 📁 assets
│   │   └── 🖼️ react.svg
│   ├── 📁 common
│   │   ├── 📁 skeletons
│   │   │   ├── 📄 card-skeleton.tsx
│   │   │   ├── 📄 detail-skeleton.tsx
│   │   │   └── 📄 table-skeleton.tsx
│   │   ├── 📄 data-table.tsx
│   │   ├── 📄 table-action-cell.tsx
│   │   └── 📄 table-delete-action.tsx
│   ├── 📁 components
│   │   ├── 📁 common
│   │   │   └── 📄 model-picker.tsx
│   │   ├── 📁 cube-loader
│   │   │   ├── 📄 RouteLoader.tsx
│   │   │   └── 🎨 route-loader.module.css
│   │   ├── 📁 layout
│   │   │   ├── 📄 Header.tsx
│   │   │   ├── 📄 LandingHeader.tsx
│   │   │   └── 📄 Sidebar.tsx
│   │   ├── 📁 ui
│   │   │   ├── 📄 alert-dialog.tsx
│   │   │   ├── 📄 avatar.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 calendar.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 chart.tsx
│   │   │   ├── 📄 combobox.tsx
│   │   │   ├── 📄 command.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   ├── 📄 field.tsx
│   │   │   ├── 📄 hover-card.tsx
│   │   │   ├── 📄 input-group.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 label.tsx
│   │   │   ├── 📄 pagination.tsx
│   │   │   ├── 📄 popover.tsx
│   │   │   ├── 📄 scroll-area.tsx
│   │   │   ├── 📄 select.tsx
│   │   │   ├── 📄 separator.tsx
│   │   │   ├── 📄 sheet.tsx
│   │   │   ├── 📄 skeleton.tsx
│   │   │   ├── 📄 sonner.tsx
│   │   │   ├── 📄 switch.tsx
│   │   │   ├── 📄 table.tsx
│   │   │   └── 📄 textarea.tsx
│   │   ├── 📄 component-example.tsx
│   │   └── 📄 example.tsx
│   ├── 📁 configs
│   │   └── 📄 sidebar.config.tsx
│   ├── 📁 constants
│   │   ├── 📁 query-keys
│   │   │   ├── 📄 booking.key.ts
│   │   │   ├── 📄 co-owner-group.key.ts
│   │   │   ├── 📄 contract.key.ts
│   │   │   ├── 📄 dashboard.key.ts
│   │   │   ├── 📄 expense-fee.key.ts
│   │   │   ├── 📄 extra-fee.ts
│   │   │   ├── 📄 invoice.key.ts
│   │   │   ├── 📄 operator.key.ts
│   │   │   ├── 📄 staff.key.ts
│   │   │   ├── 📄 station.key.ts
│   │   │   ├── 📄 user.key.ts
│   │   │   ├── 📄 vehicle-brand.key.ts
│   │   │   ├── 📄 vehicle-model.key.ts
│   │   │   ├── 📄 vehicle.key.ts
│   │   │   └── 📄 withdraw.key.ts
│   │   ├── 📁 status
│   │   │   ├── 📁 booking
│   │   │   │   ├── 📄 booking-status.ts
│   │   │   │   └── 📄 segment-status.ts
│   │   │   ├── 📁 co-owner-group
│   │   │   │   └── 📄 co-owner-group-status.ts
│   │   │   ├── 📁 contract
│   │   │   │   └── 📄 contract-status.ts
│   │   │   ├── 📁 expense-fee
│   │   │   │   └── 📄 expense-fee-status.ts
│   │   │   ├── 📁 extra-fee
│   │   │   │   └── 📄 extra-fee-status.ts
│   │   │   ├── 📁 invoice
│   │   │   │   └── 📄 invoice-status.ts
│   │   │   ├── 📁 share-unit
│   │   │   │   └── 📄 share-unit-status.ts
│   │   │   ├── 📁 station
│   │   │   │   └── 📄 station-status.ts
│   │   │   └── 📁 vehicle
│   │   │       ├── 📄 vehicle-action-label.ts
│   │   │       ├── 📄 vehicle-status-action.ts
│   │   │       └── 📄 vehicle-status.ts
│   │   ├── 📁 vehicle-model
│   │   │   └── 📄 gear-shift.ts
│   │   ├── 📄 config.ts
│   │   ├── 📄 httpStatusCode.enum.ts
│   │   └── 📄 path.ts
│   ├── 📁 contexts
│   │   └── 📄 app.context.tsx
│   ├── 📁 layouts
│   │   ├── 📄 AuthLayout.tsx
│   │   ├── 📄 MainLayout.tsx
│   │   └── 📄 PublicLayout.tsx
│   ├── 📁 lib
│   │   └── 📄 utils.ts
│   ├── 📁 pages
│   │   ├── 📁 Booking
│   │   │   ├── 📁 detail
│   │   │   │   ├── 📁 _components
│   │   │   │   │   ├── 📄 booking-cancelation.tsx
│   │   │   │   │   ├── 📄 extra-fee-form.tsx
│   │   │   │   │   ├── 📄 extra-fee-table.tsx
│   │   │   │   │   ├── 📄 period-card.tsx
│   │   │   │   │   ├── 📄 segment-detail.tsx
│   │   │   │   │   ├── 📄 segment-table.tsx
│   │   │   │   │   ├── 📄 user-card.tsx
│   │   │   │   │   └── 📄 vehicle-card.tsx
│   │   │   │   ├── 📄 BookingDetailPage.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📄 BookingPage.tsx
│   │   │   ├── 📄 booking-columns.tsx
│   │   │   ├── 📄 booking-detail.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Co-Owner-Group
│   │   │   ├── 📁 detail
│   │   │   │   ├── 📁 _components
│   │   │   │   │   ├── 📄 share-unit-grid.tsx
│   │   │   │   │   ├── 📄 stats-overview.tsx
│   │   │   │   │   └── 📄 status-actions.tsx
│   │   │   │   ├── 📄 CoOwnerGroupDetailPage.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📄 CoOwnerGroupPage.tsx
│   │   │   ├── 📄 co-owner-group-columns.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Contract
│   │   │   ├── 📄 ContractPage.tsx
│   │   │   ├── 📄 contract-columns.tsx
│   │   │   ├── 📄 contract-detail.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Dashboard
│   │   │   ├── 📁 _components
│   │   │   │   ├── 📁 cards
│   │   │   │   │   ├── 📄 booking-card.tsx
│   │   │   │   │   ├── 📄 revenue-card.tsx
│   │   │   │   │   ├── 📄 user-card.tsx
│   │   │   │   │   └── 📄 vehicle-card.tsx
│   │   │   │   ├── 📁 charts
│   │   │   │   │   ├── 📄 bar-chart.tsx
│   │   │   │   │   └── 📄 line-chart.tsx
│   │   │   │   └── 📄 top-vehicle-list.tsx
│   │   │   ├── 📄 DashboardPage.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Expense-Fee
│   │   │   ├── 📁 detail
│   │   │   │   ├── 📁 _components
│   │   │   │   │   ├── 📄 booking-calendar.tsx
│   │   │   │   │   ├── 📄 expense-fee-type-card.tsx
│   │   │   │   │   └── 📄 group-card.tsx
│   │   │   │   ├── 📄 ExpenseFeeDetailPage.tsx
│   │   │   │   ├── 📄 expense-fee-form.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📄 ExpenseFeePage.tsx
│   │   │   ├── 📄 expense-fee-columns.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 ExpenseFeeType
│   │   │   ├── 📄 ExpenseFeeTypePage.tsx
│   │   │   ├── 📄 expense-fee-type-columns.tsx
│   │   │   ├── 📄 expense-fee-type-detail.tsx
│   │   │   ├── 📄 expense-fee-type-form.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 ExtraFeeType
│   │   │   ├── 📄 ExtraFeeTypePage.tsx
│   │   │   ├── 📄 extra-fee-type-columns.tsx
│   │   │   ├── 📄 extra-fee-type-detail.tsx
│   │   │   ├── 📄 extra-fee-type-form.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Home
│   │   │   ├── 📄 Home.tsx
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 Invoice
│   │   │   ├── 📄 InvoicePage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 invoice-columns.tsx
│   │   │   ├── 📄 invoice-detail-sheet.tsx
│   │   │   └── 📄 invoice-form.tsx
│   │   ├── 📁 Login
│   │   │   ├── 📄 Login.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Member
│   │   │   ├── 📄 MemberPage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   └── 📄 member-columns.tsx
│   │   ├── 📁 Not-Found
│   │   │   ├── 📄 NotFoundPage.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Operator
│   │   │   ├── 📄 OperatorPage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 operator-columns.tsx
│   │   │   ├── 📄 operator-detail.tsx
│   │   │   └── 📄 operator-form.tsx
│   │   ├── 📁 Profile
│   │   │   ├── 📄 ProfilePage.tsx
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 Staff
│   │   │   ├── 📄 StaffPage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 staff-columns.tsx
│   │   │   ├── 📄 staff-detail.tsx
│   │   │   └── 📄 staff-form.tsx
│   │   ├── 📁 Station
│   │   │   ├── 📄 StationPage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 station-columns.tsx
│   │   │   ├── 📄 station-detail.tsx
│   │   │   └── 📄 station-form.tsx
│   │   ├── 📁 Vehicle
│   │   │   ├── 📁 detail
│   │   │   │   ├── 📁 _components
│   │   │   │   │   ├── 📄 co-owner-card.tsx
│   │   │   │   │   ├── 📄 reject-dialog.tsx
│   │   │   │   │   ├── 📄 station-card.tsx
│   │   │   │   │   └── 📄 vehicle-specs.tsx
│   │   │   │   ├── 📄 VehicleDetailPage.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 filters
│   │   │   │   └── 📄 data-table-faceted-filter.tsx
│   │   │   ├── 📄 VehiclePage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 vehicle-columns.tsx
│   │   │   └── 📄 vehicle-filter-sidebar.tsx
│   │   ├── 📁 Vehicle-Brand
│   │   │   ├── 📄 VehicleBrandPage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 vehicle-brand-detail.tsx
│   │   │   ├── 📄 vehicle-brand-form.tsx
│   │   │   └── 📄 vehicle-brand.columns.tsx
│   │   ├── 📁 Vehicle-Model
│   │   │   ├── 📄 VehicleModelPage.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 vehicle-model-columns.tsx
│   │   │   ├── 📄 vehicle-model-detail.tsx
│   │   │   └── 📄 vehicle-model-form.tsx
│   │   └── 📁 Withdraw
│   │       ├── 📄 WithdrawPage.tsx
│   │       ├── 📄 index.ts
│   │       └── 📄 withdraw-columns.tsx
│   ├── 📁 providers
│   │   └── 📄 theme-provider.tsx
│   ├── 📁 queries
│   │   ├── 📄 auth.query.ts
│   │   ├── 📄 booking.query.ts
│   │   ├── 📄 co-owner-group.query.ts
│   │   ├── 📄 contract.query.ts
│   │   ├── 📄 dashboard.query.ts
│   │   ├── 📄 expense-fee.query.ts
│   │   ├── 📄 extra-fee.query.ts
│   │   ├── 📄 group-wallet.query.ts
│   │   ├── 📄 invoice.query.ts
│   │   ├── 📄 operator.query.ts
│   │   ├── 📄 staff.query.ts
│   │   ├── 📄 station.query.ts
│   │   ├── 📄 user.query.ts
│   │   ├── 📄 vehicle-brand.query.ts
│   │   ├── 📄 vehicle-model.query.ts
│   │   ├── 📄 vehicle.query.ts
│   │   └── 📄 withdraw.query.ts
│   ├── 📁 routes
│   │   ├── 📄 guards.tsx
│   │   └── 📄 useRouteElements.tsx
│   ├── 📁 schema
│   │   ├── 📄 auth.schema.ts
│   │   ├── 📄 booking.schema.ts
│   │   ├── 📄 expense-fee-type.schema.ts
│   │   ├── 📄 expense-fee.schema.ts
│   │   ├── 📄 extra-fee-type.schema.ts
│   │   ├── 📄 extra-fee.schema.ts
│   │   ├── 📄 invoice.schema.ts
│   │   ├── 📄 operator.schema.ts
│   │   ├── 📄 staff.schema.ts
│   │   ├── 📄 station.schema.ts
│   │   ├── 📄 vehicle-brand.schema.ts
│   │   └── 📄 vehicle-model.schema.ts
│   ├── 📁 types
│   │   ├── 📁 commons
│   │   │   ├── 📄 app-context.type.ts
│   │   │   ├── 📄 crud-form.type.ts
│   │   │   ├── 📄 dialog.type.ts
│   │   │   ├── 📄 media.type.ts
│   │   │   ├── 📄 pagination.type.ts
│   │   │   ├── 📄 sidebar.type.ts
│   │   │   ├── 📄 skeleton.type.ts
│   │   │   └── 📄 utils.type.ts
│   │   ├── 📄 auth.type.ts
│   │   ├── 📄 booking.type.ts
│   │   ├── 📄 co-owner-group.type.ts
│   │   ├── 📄 contract.type.ts
│   │   ├── 📄 dashboard.type.ts
│   │   ├── 📄 expense-fee.type.ts
│   │   ├── 📄 extra-fee.type.ts
│   │   ├── 📄 group-wallet.type.ts
│   │   ├── 📄 invoice.type.ts
│   │   ├── 📄 operator.ts
│   │   ├── 📄 sell-request.type.ts
│   │   ├── 📄 share-holder.ts
│   │   ├── 📄 share-unit.ts
│   │   ├── 📄 staff.type.ts
│   │   ├── 📄 station.type.ts
│   │   ├── 📄 table.d.ts
│   │   ├── 📄 user.type.ts
│   │   ├── 📄 vehicle-brand.type.ts
│   │   ├── 📄 vehicle-model.type.ts
│   │   ├── 📄 vehicle.type.ts
│   │   └── 📄 withdraw.type.ts
│   ├── 📁 utils
│   │   ├── 📁 axios
│   │   │   └── 📄 axiosError.ts
│   │   ├── 📄 auth.ts
│   │   ├── 📄 date.ts
│   │   ├── 📄 http.ts
│   │   └── 📄 number.ts
│   ├── 📄 App.tsx
│   ├── 🎨 index.css
│   └── 📄 main.tsx
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📝 COMMIT_CONVENTION.md
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
├── ⚙️ vercel.json
└── 📄 vite.config.ts
```

## 🚀 Getting Started

This is a [Vite](https://vite.dev) project bootstrapped with React and TypeScript.

### Prerequisites

- Node.js **v18+**
- pnpm (recommended) / npm / yarn / bun

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/SapphrieMoon/EVCoDrive_Website.git
cd EVCoDrive_Website
pnpm install
```

---

## Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open http://localhost:5173 with your browser to see the result.

---

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_URL=your_backend_api_url
```

Note: The backend service is maintained in a separate repository.

---

## 🔗 Related Repositories

Backend Repository:
👉 https://github.com/p1thong/EVCoDrive

Mobile Repository:
👉 https://github.com/longvo34/EVCoDrive_Mobile

This project follows a frontend–backend separated architecture, where the frontend consumes RESTful APIs provided by the backend service.

---

## 📈 What I Learned

Designing scalable dashboard layouts with Vite & React 19

Structuring large React applications with React Router DOM (v7) and TanStack Query

Implementing complex data tables and filtering systems using TanStack Table (v8)

Handling data visualization using Recharts

Deploying and maintaining production-ready administration interfaces

---

## 👨💻 Author

SapphireMoon

GitHub: https://github.com/SapphrieMoon

Project Repository: https://github.com/SapphrieMoon/EVCoDrive_Website

---

## 📄 License

This project is for educational and portfolio purposes.

<p align="center">Made with ❤️ using React & Vite</p>
