import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "../layouts/MainLayout";
import path from "../constants/path";
import { PublicLayout } from "../layouts/PublicLayout";
import { ProtectedRoute, RejectedRoute } from "./guards";
import CubeLoader from "@/components/cube-loader/RouteLoader";;


const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home/Home"));
const VehicleBrandPage = lazy(() => import("@/pages/Vehicle-Brand"));
const VehicleModelPage = lazy(() => import("@/pages/Vehicle-Model"));
const ContractPage = lazy(() => import("@/pages/Contract"));
const VehiclePage = lazy(() => import("@/pages/Vehicle"));
const VehicleDetailPage = lazy(() => import(`@/pages/Vehicle/detail/index`))
const StationPage = lazy(() => import("@/pages/Station"));
const OperatorPage = lazy(() => import("@/pages/Operator"));
const CoOwnerGroupPage = lazy(() => import("@/pages/Co-Owner-Group"));
const CoOwnerGroupDetailPage = lazy(() => import("@/pages/Co-Owner-Group/detail/index"));
const BookingPage = lazy(() => import("@/pages/Booking"));
const BookingDetailPage = lazy(() => import("@/pages/Booking/detail/index"));
const ExpenseFeePage = lazy(() => import("@/pages/Expense-Fee"));
const ExpenseFeeDetailPage = lazy(() => import("@/pages/Expense-Fee/detail/index"));
const MemberPage = lazy(() => import("@/pages/Member"));
const InvoicePage = lazy(() => import("@/pages/Invoice"));
// const MainLayout = lazy(() => import("@/layouts/MainLayout"));
// const PublicLayout = lazy(() => import("@/layouts/PublicLayout"));
// const NotFound = lazy(() => import("@/pages/NotFound"));


export default function useRouteElements() {

    const routeElements = useRoutes([
        // Public routes
        {
            path: path.home,
            element: <PublicLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                }
            ]
        },

        // Rejected routers (Nếu login rồi thì ko cho vào lại trang login)
        {
            path: "",
            element: <RejectedRoute />,
            children: [{
                path: path.login,
                element: <Login />
            }]
        },

        // Private Routes (Bắt buộc phải đăng nhập)
        {
            path: "",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <MainLayout />,
                    children: [
                        { path: path.contract, element: <ContractPage /> },
                        { path: path.vehicle, element: <VehiclePage /> },
                        { path: path.vehicleDetail, element: <VehicleDetailPage /> },
                        { path: path.station, element: <StationPage /> },
                        { path: path.vehicleBrand, element: <VehicleBrandPage /> },
                        { path: path.vehicleModel, element: <VehicleModelPage /> },
                        { path: path.operator, element: <OperatorPage /> },
                        { path: path.coOwnerGroup, element: <CoOwnerGroupPage /> },
                        { path: path.coOwnerGroupDetail, element: <CoOwnerGroupDetailPage /> },
                        { path: path.booking, element: <BookingPage /> },
                        { path: path.bookingDetail, element: <BookingDetailPage /> },
                        { path: path.expenseFee, element: <ExpenseFeePage /> },
                        { path: path.expenseFeeDetail, element: <ExpenseFeeDetailPage /> },
                        { path: path.member, element: <MemberPage /> },
                        { path: path.invoice, element: <InvoicePage /> },
                    ]
                }
            ]
        },
    ])
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><CubeLoader /></div>}>
            {routeElements}
        </Suspense>
    )
}