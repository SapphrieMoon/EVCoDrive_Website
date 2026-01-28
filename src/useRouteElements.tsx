import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Login from "@/pages/Login";
import Home from "./pages/Home/Home";
import { MainLayout } from "./layouts/MainLayout";
import path from "./constants/path";
import VehicleBrandPage from "./pages/Vehicle-Brand";
import ContractPage from "./pages/Contract";
import { PublicLayout } from "./layouts/PublicLayout";

export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: path.login,
            element: <Login />
        },
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
        {
            path: path.home,
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense>
                            <Home />
                        </Suspense>
                    )
                },
                {
                    path: path.vehicleBrand,
                    element: (
                        <Suspense>
                            <VehicleBrandPage />
                        </Suspense>
                    )
                },
                {
                    path: path.contract,
                    element: (
                        <Suspense>
                            <ContractPage />
                        </Suspense>
                    )
                }
            ]
        }
    ])
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {routeElements}
        </Suspense>
    )
}