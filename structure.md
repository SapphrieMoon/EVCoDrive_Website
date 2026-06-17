# File Tree: EVCoDrive_Website

**Generated:** 6/17/2026, 3:15:17 PM
**Root Path:** `d:\FPTU\EVCoDrive\EVCoDrive_Website`

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

---
*Generated by FileTree Pro Extension*