import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "../layouts/MainLayout";
import path from "../constants/path";
import { PublicLayout } from "../layouts/PublicLayout";
import { ProtectedRoute, RejectedRoute } from "./guards";


const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home/Home"));
const VehicleBrandPage = lazy(() => import("@/pages/Vehicle-Brand"));
const VehicleModelPage = lazy(() => import("@/pages/Vehicle-Model"));
const ContractPage = lazy(() => import("@/pages/Contract"));
const VehiclePage = lazy(() => import("@/pages/Vehicle"));
const StationPage = lazy(() => import("@/pages/Station"));
const StaffPage = lazy(() => import("@/pages/Staff"));
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
                        { path: path.station, element: <StationPage /> },
                        { path: path.vehicleBrand, element: <VehicleBrandPage /> },
                        { path: path.vehicleModel, element: <VehicleModelPage /> },
                        { path: path.staff, element: <StaffPage /> },
                    ]
                }
            ]
        },
    ])
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
            {routeElements}
        </Suspense>
    )
}